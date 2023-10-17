import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { ServerError } from '../server-error';
import { MiddlewareHandler } from './middleware-pipe';

export const reqIsAuth = async (req: NextApiRequest) => {
  // Get Client session
  const session = await getSession({ req });
  if (!session) {
    const error = new ServerError(
      401,
      'Нямате право да разглеждате този ресурс',
      'Unauthenticated'
    );
    return error;
  }
  return true;
};

export const isAuth: MiddlewareHandler = async (req, res, next) => {
  const trueOrError = await reqIsAuth(req);
  if (trueOrError !== true) {
    return next(trueOrError);
  }
  return next();
};
//|| session.user?.image !== 'admin'
