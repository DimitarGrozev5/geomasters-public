import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { ServerError } from '../server-error';
import { MiddlewareHandler } from './middleware-pipe';

export const reqIsAdmin = async (req: NextApiRequest) => {
  // Get Client session
  const session = await getSession({ req });
  // @ts-ignore
  if (!session || !session.user?.isAdmin) {
    const error = new ServerError(
      401,
      'Нямате право да разглеждате този ресурс',
      'Unauthenticated'
    );
    return error;
  }
  return true;
};

export const isAdmin: MiddlewareHandler = async (req, res, next) => {
  const trueOrError = await reqIsAdmin(req);
  if (trueOrError !== true) {
    return next(trueOrError);
  }
  return next();
};
