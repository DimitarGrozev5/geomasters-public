import { getSession } from 'next-auth/react';
import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const DELETEQuery__Schema = z.object({ emailId: z.coerce.number() });
const DELETEHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'DELETE') {
    return next();
  }

  // Parse body and params
  let emailId: number;
  try {
    const query = DELETEQuery__Schema.parse(req.query);
    emailId = query.emailId;
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
  if (isAdminOrError !== true) {
    const sess = await getSession({ req });
    //@ts-ignore
    const userId = sess?.user?.id;

    // Get Email owner
    let ownerId: number | undefined;
    try {
      const email = await prisma.email.findFirst({
        where: { id: emailId },
        include: { Partner: { include: { userData: true } } },
      });
      ownerId = email?.Partner?.userData.id;
    } catch (error: any) {
      const err = new ServerError(
        500,
        'Сървърна грешка. Опитайте отново.',
        error.message
      );
      return next(err);
    }

    const isOwner = userId === ownerId;

    if (!isOwner) {
      const error = new ServerError(
        401,
        'Нямате право да променяте този ресурс',
        'You are not admin or owner'
      );
      return next(error);
    }
  }

  try {
    await prisma.email.delete({
      where: { id: emailId },
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

export default pipeMiddlewares(isAuth, DELETEHandler);
