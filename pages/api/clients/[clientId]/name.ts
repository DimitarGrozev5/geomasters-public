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

const PATCHQuery__Schema = z.object({ clientId: z.coerce.number() });
const PATCHBody__Schema = z.object({ data: z.string() });
const PATCHHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'PATCH') {
    return next();
  }

  // Parse body and params
  let clientId: number;
  let name: string;
  try {
    const query = PATCHQuery__Schema.parse(req.query);
    const body = PATCHBody__Schema.parse(req.body);
    clientId = query.clientId;
    name = body.data;
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
        name,
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

export default pipeMiddlewares(isAuth, isAdmin, PATCHHandler);
