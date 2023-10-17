// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client, Email, Phone } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import { prisma } from '../../../config/db';
import { isAdmin } from '../../../model/middlewares/is-admin';
import { isAuth } from '../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../model/middlewares/middleware-pipe';
import {
  POSTNewClient__Data,
  POSTNewClient__Schema,
} from '../../../model/data-transfer/client';
import { ServerError } from '../../../model/server-error';

const Query_Schema = z.union([
  z.undefined(),
  z.object({
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    search: z.optional(z.string()),
  }),
]);

const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Get All users with query
  if (req.method !== 'GET') {
    return next();
  }
  let query: z.infer<typeof Query_Schema>;
  try {
    query = Query_Schema.parse(req.query);
  } catch (error) {}

  let clients: GETClient[];

  if (query && query.email) {
    /**
     * TODO: Imporve quereing to catch different variations of the same email or phone
     * e.g.: +359 881 11 11 11 = 0881111111
     */
    try {
      clients = await prisma.client.findMany({
        include: { Email: true, Phone: true },
        where: {
          AND: [
            { deleted: false },
            {
              OR: [
                { Email: { some: { email: query.email } } },
                { Phone: { some: { phone: query.phone } } },
              ],
            },
          ],
        },
      });
    } catch (err: any) {
      const error = new ServerError(
        500,
        'Сървърна грешка. Опитайте отново',
        err?.message
      );
      return next(error);
    }
  } else if (query && query.search) {
    /**
     * TODO: Imporve quereing to catch different variations of the same email or phone
     * e.g.: +359 881 11 11 11 = 0881111111
     */
    try {
      clients = await prisma.client.findMany({
        include: { Email: true, Phone: true },
        where: {
          AND: [
            { deleted: false },
            {
              OR: [
                { name: { contains: query.search } },
                { Email: { some: { email: { contains: query.search } } } },
                { Phone: { some: { phone: { contains: query.search } } } },
              ],
            },
          ],
        },
      });
    } catch (err: any) {
      const error = new ServerError(
        500,
        'Сървърна грешка. Опитайте отново',
        err?.message
      );
      return next(error);
    }
  } else {
    clients = await prisma.client.findMany({
      include: { Email: true, Phone: true },
      where: { deleted: false },
    });
  }

  res.json({ clients: clients! });
};

export type GETClient = Client & {
  Email: Email[];
  Phone: Phone[];
};

const POSTHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'POST') {
    return next();
  }

  // Get post data
  let body: POSTNewClient__Data;
  try {
    body = POSTNewClient__Schema.parse(req.body);
  } catch (err: any) {
    const error = new ServerError(422, 'Невалидни данни', err?.message);
    return next(error);
  }

  // Insert new client in DB
  try {
    const email = !!body.email ? { create: { email: body.email } } : undefined;

    const client = await prisma.client.create({
      data: {
        name: body.name,
        Email: email,
        Phone: { create: { phone: body.phone, hasViber: body.hasViber } },
      },
    });

    res.json({ message: 'Success' });
  } catch (err: any) {
    const error = new ServerError(
      500,
      'Грешка на сървъра, оптиайте отново',
      err?.message
    );
    return next(error);
  }
};

export default pipeMiddlewares(isAuth, GETHandler, isAdmin, POSTHandler);
