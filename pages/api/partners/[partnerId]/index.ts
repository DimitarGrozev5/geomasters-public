import superjson from 'superjson';
import {
  CreditMovement,
  Email,
  Partner,
  Phone,
  Task,
  User,
} from '@prisma/client';
import { hash } from 'bcryptjs';
import { getSession } from 'next-auth/react';
import { number, z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin, reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const GETQuery__Schema = z.object({
  partnerId: z.coerce.number(),
  userId: z.union([z.undefined(), z.coerce.number()]),
});
const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'GET') {
    return next();
  }

  // Parse body and params
  let partnerId: number | undefined;
  let userId: number | undefined;
  try {
    const query = GETQuery__Schema.parse(req.query);
    partnerId = query.partnerId;
    userId = query.userId;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  let partner: Omit<DetailedPartner, 'resetHash'> | null;
  try {
    partner = await prisma.partner.findFirst({
      where:
        userId !== undefined
          ? { userData: { id: userId }, deleted: false }
          : { id: partnerId, deleted: false },
      include: {
        userData: true,
        firmEmails: true,
        firmPhones: true,
        creditMovement: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
        Task: true,
      },
    });

    if (!partner) {
      const err = new ServerError(
        404,
        'Не съществува такъв партньор',
        "This partner doesn't exist"
      );
      return next(err);
    }
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  // Check if request is from admin
  const reqFromAdmin = await reqIsAdmin(req);

  // If not check if it's from the profile owner
  if (reqFromAdmin !== true) {
    const session = await getSession({ req });
    // @ts-ignore
    const reqIsFromOwner = partner.userData.id === session?.user?.id;

    if (!reqIsFromOwner) {
      const err = new ServerError(
        401,
        'Нямате право да гледате този ресурс',
        'You must be admin or owner'
      );
      return next(err);
    }
  }

  const resetHash = await hash(
    JSON.stringify({
      firmName: partner.firmName,
      firmEKATTE: partner.firmEKATTE,
      oldPass: partner.userData.passwordHash,
    }),
    12
  );

  const json = superjson.stringify({ partner: { ...partner, resetHash } });
  return res.json({ json });
};

export type DetailedPartner = Partner & {
  Task: Task[];
  creditMovement: CreditMovement[];
  userData: User;
  firmEmails: Email[];
  firmPhones: Phone[];
  resetHash: string;
};

const DELETEQuery__Schema = z.object({
  partnerId: z.coerce.number(),
});
const DELETEHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'DELETE') {
    return next();
  }

  // Parse body and params
  let partnerId: number;
  try {
    const query = DELETEQuery__Schema.parse(req.query);
    partnerId = query.partnerId;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  try {
    await prisma.partner.update({
      where: { id: partnerId },
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
