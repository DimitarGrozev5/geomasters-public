import { NextApiRequest, NextApiResponse } from 'next';
import { IServerError } from '../server-error';

type NextMiddleware<E extends Error = Error> = (err?: E) => void;

export type MiddlewareHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextMiddleware
) => Promise<void>;

export const pipeMiddlewares =
  (...m: MiddlewareHandler[]) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const middlewares = [...m];

    const next: NextMiddleware = (err = undefined) => {
      // err !== undefined && console.log(err);
      // If an error is passed return error to client
      if (err !== undefined) {
        if (res.headersSent) {
          return;
        }
        const code = 'code' in err ? (err.code as number) : 500;
        const fullMessage =
          'fullMessage' in err ? (err.fullMessage as string) : err.message;
        const userMessage =
          'userMessage' in err
            ? (err.userMessage as string)
            : 'Възникна грешка';

        return res.status(code).json({ code, fullMessage, userMessage });
      }

      // If to error is passed start next middleware
      const nextMiddleware = middlewares.shift();
      if (!nextMiddleware) {
        if (!res.headersSent) {
          return res.end();
        }
        return;
      }
      return nextMiddleware(req, res, next);
    };

    return next();
  };
