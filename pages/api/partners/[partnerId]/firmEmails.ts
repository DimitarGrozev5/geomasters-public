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

const POSTQuery__Schema = z.object({ partnerId: z.coerce.number() });
const POSTBody__Schema = z.object({ email: z.string().email() });
const POSTHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'POST') {
    return next();
  }

  // Parse body and params
  let partnerId: number;
  let email: string;
  try {
    const query = POSTQuery__Schema.parse(req.query);
    const body = POSTBody__Schema.parse(req.body);

    partnerId = query.partnerId;
    email = body.email;
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
    const isOwner = partnerId === sess?.user?.partnerId;
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
    await prisma.partner.update({
      where: { id: partnerId },
      data: {
        firmEmails: {
          create: {
            email,
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

export default pipeMiddlewares(isAuth, POSTHandler);
