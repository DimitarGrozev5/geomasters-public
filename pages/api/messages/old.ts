import superjson from "superjson"
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Client,
  Email,
  Message,
  Phone,
} from '@prisma/client';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../config/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle getting all new messages
  if (req.method === 'GET') {
    // Get Client session
    const session = await getSession({ req });
    if (!session || session.user?.image !== 'admin') {
      return res.status(401).json({
        fullMessage: 'Unauthenticated',
        userMessage: 'Нямате право да разглеждате този ресурс',
      });
    }

    // Get all messages
    let messages: NewMessage[];
    try {
      messages = await prisma.message.findMany({
        include: {
          ownerClient: { include: { Phone: true, Email: true } },
          task: { select: { id: true } },
        },
        where: { administraded: true },
      });
    } catch (error: any) {
      return res.status(500).json({
        fullMessage: error?.message ?? 'Internal Server Error',
        userMessage:
          'Възникна грешка при зареждане на данните. Опитайте отново',
      });
    }

    const json = superjson.stringify({ messages });
    return res.json({ json });
  }
  return;
}

export type NewMessage = Message & {
  task: {
    id: number;
  } | null;
  ownerClient:
    | (Client & {
        Email: Email[];
        Phone: Phone[];
      })
    | null;
};
