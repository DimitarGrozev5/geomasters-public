import { Client, Message } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const POSTQuery__Schema = z.object({ clientId: z.coerce.number() });
const POSTBody__Schema = z.object({ phone: z.string(), hasViber: z.boolean() });
const POSTHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'POST') {
    return next();
  }

  // Parse body and params
  let clientId: number;
  let phone: string;
  let hasViber: boolean;
  try {
    const query = POSTQuery__Schema.parse(req.query);
    const body = POSTBody__Schema.parse(req.body);
    clientId = query.clientId;
    phone = body.phone;
    hasViber = body.hasViber;
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
        Phone: {
          create: {
            phone,
            hasViber,
          },
        },
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

  res.json({ msg: 'Success' });
};

export default pipeMiddlewares(isAuth, isAdmin, POSTHandler);
