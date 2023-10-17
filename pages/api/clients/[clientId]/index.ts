import superjson from 'superjson';
import {
  Client,
  CommunicationEvent,
  Email,
  Message,
  Phone,
  Task,
  TaskStatus,
} from '@prisma/client';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin, reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const GETQuery__Schema = z.object({ clientId: z.coerce.number() });
const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'GET') {
    return next();
  }

  // Parse body and params
  let clientId: number;
  try {
    const query = GETQuery__Schema.parse(req.query);
    clientId = query.clientId;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  // Check if user is admin or owner
  const isAdminOrError = await reqIsAdmin(req);

  if (isAdminOrError === true) {
    let client: DetailedClient | null;
    try {
      client = await prisma.client.findFirst({
        where: { id: clientId, deleted: false },
        include: {
          Email: true,
          Phone: true,
          CommunicationEvent: {
            include: {
              initialMessage: true,
              task: true,
            },
          },
        },
      });

      if (!client) {
        const err = new ServerError(
          404,
          'Не съществува такъв клиент',
          "This client doesn't exist"
        );
        return next(err);
      }
      
      const json = superjson.stringify({ client });
      return res.json({ json });
    } catch (error: any) {
      const err = new ServerError(
        500,
        'Сървърна грешка. Опитайте отново.',
        error.message
      );
      return next(err);
    }
  }

  // Check if req is from someone, who has a task
  const sess = await getSession({ req });
  //@ts-ignore
  const userId: nubmer = sess?.user?.id;

  let client: PartnerClient | null;
  try {
    client = await prisma.client.findFirst({
      where: {
        id: clientId,
        deleted: false,
        Task: {
          some: {
            AND: [
              { partner: { userData: { id: userId } } },
              { status: { not: TaskStatus.REGISTERED } },
              { status: { not: TaskStatus.OFFERED } },
              { status: { not: TaskStatus.REJECTED } },
            ],
          },
        },
      },
      include: {
        Email: true,
        Phone: true,
      },
    });

    if (!client) {
      const err = new ServerError(
        404,
        'Не съществува такъв клиент',
        "This client doesn't exist"
      );
      return next(err);
    }
    res.json({ client });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  res.end();
};

export type ClientMessageType = CommunicationEvent & {
  task: Task | null;
  initialMessage: Message | null;
};

export type DetailedClient = Client & {
  CommunicationEvent: ClientMessageType[];
  Email: Email[];
  Phone: Phone[];
};

export type PartnerClient = Client & {
  Email: Email[];
  Phone: Phone[];
};

const DELETEHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'DELETE') {
    return next();
  }

  // Parse body and params
  let clientId: number;
  try {
    const query = GETQuery__Schema.parse(req.query);
    clientId = query.clientId;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  try {
    await prisma.client.update({
      where: { id: clientId },
      data: {
        deleted: true,
      },
    });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  res.json({ message: 'Success' });
};

export default pipeMiddlewares(isAuth, GETHandler, isAdmin, DELETEHandler);
