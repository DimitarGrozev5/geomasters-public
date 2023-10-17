// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { pipeMiddlewares } from '../../model/middlewares/middleware-pipe';
import { ServerError } from '../../model/server-error';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const password = await hash('asdasd', 12);
//   res.json({ hash: password });
//   return;
//   setTimeout(() => {
//     // res.status(400).json({ message: 'error message' });
//     res.status(200).json({ name: 'John Doe' });
//   }, 5000);
// }

export default pipeMiddlewares(
  async (req, res, next) => {
    // const err = new ServerError(401, 'user', 'full');
    next();
  },
  async (req, res, next) => {
    const password = await hash('asdasd', 12);
    res.json({ hash: password });
    return;
    setTimeout(() => {
      // res.status(400).json({ message: 'error message' });
      res.status(200).json({ name: 'John Doe' });
    }, 5000);
  }
);
