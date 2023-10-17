import superjson from 'superjson';
import { z } from 'zod';

import { getSession } from 'next-auth/react';
import { prisma } from '../../../../config/db';
import { reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const Query__Schema = z.object({
  limit: z.coerce.number(),
  partnerId: z.coerce.number(),
});

const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'GET') {
    return next();
  }

  // Parse body and params
  let partnerId: number;
  let limit: number;
  try {
    const query = Query__Schema.parse(req.query);
    partnerId = query.partnerId;
    limit = query.limit;
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

    // @ts-ignore
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

  // Performe GET
  try {
    const results = await prisma.partner.findFirst({
      where: { id: partnerId },
      include: {
        creditMovement: {
          orderBy: {
            createdAt: 'desc',
          },
          take: limit,
        },
      },
    });

    if (!results) {
      const error = new ServerError(
        401,
        'Правите заявка за несъществуващ партньор',
        'Partner does not exist'
      );
      return next(error);
    }

    const json = superjson.stringify({ movements: results.creditMovement });
    return res.json({ json });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }
};

export default pipeMiddlewares(isAuth, GETHandler);
