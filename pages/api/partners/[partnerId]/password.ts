import { Client, Message } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const PATCHQuery__Schema = z.object({ partnerId: z.coerce.number() });
const PATCHBody__Schema = z.object({
  password: z.string(),
  securityHash: z.string(),
});
const PATCHHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'PATCH') {
    return next();
  }

  // Parse body and params
  let partnerId: number;
  let password: string;
  let securityHash: string;
  try {
    const query = PATCHQuery__Schema.parse(req.query);
    const body = PATCHBody__Schema.parse(req.body);

    partnerId = query.partnerId;
    password = body.password;
    securityHash = body.securityHash;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  const validPass = (() => {
    if (password.length < 6) return 'Въведете поне 6 символа';
    if (password.toLowerCase() === password)
      return 'Въведете поне една главна буква';

    if (
      ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].some(
        (d) => password.search(d.toString()) > -1
      )
    )
      return 'Въведете поне една цифра';

    return null;
  })();

  if (validPass !== null) {
    const error = new ServerError(422, validPass, 'Invalid Password');
    return next(error);
  }

  // Get partner to compare security hash
  try {
    const partner = await prisma.partner.findFirst({
      where: { id: partnerId },
      include: { userData: true },
    });
    if (!partner) {
      throw new Error('Partner not found');
    }
    const data = JSON.stringify({
      firmName: partner.firmName,
      firmEKATTE: partner.firmEKATTE,
      oldPass: partner.userData.passwordHash,
    });

    const securityHashIsValid = await compare(data, securityHash);
    if (!securityHashIsValid) {
      const err = new ServerError(
        401,
        'Нямате право да променяте този ресурс',
        'Security Hash is invalid'
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

  try {
    const passHash = await hash(password, 12);
    await prisma.partner.update({
      where: { id: partnerId },
      data: {
        userData: {
          update: {
            passwordHash: passHash,
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

export default pipeMiddlewares(PATCHHandler);
