import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const PATCHQuery__Schema = z.object({ msgId: z.coerce.number() });
const PATCHBody__Schema = z.object({ data: z.boolean() });
const PATCHHandler: MiddlewareHandler = async (req, res, next) => {
  if (req.method !== 'PATCH') {
    return next();
  }

  // Parse body and params
  let msgId: number;
  let data: boolean;
  try {
    const query = PATCHQuery__Schema.parse(req.query);
    const body = PATCHBody__Schema.parse(req.body);
    msgId = query.msgId;
    data = body.data;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  // Update message
  try {
    await prisma.message.update({
      where: { id: msgId },
      data: { administraded: data },
    });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  res.json({ result: 'Success' });
};

export default pipeMiddlewares(isAuth, isAdmin, PATCHHandler);
