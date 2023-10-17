import superjson from 'superjson';
import {
  Admin,
  Client,
  Email,
  Partner,
  Phone,
  Task,
  TaskEvent,
  TaskStatus,
  User,
} from '@prisma/client';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin, reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const GETQuery__Schema = z.object({ taskId: z.coerce.number() });
const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'GET') {
    return next();
  }

  // Parse body and params
  let taskId: number;
  try {
    const query = GETQuery__Schema.parse(req.query);
    taskId = query.taskId;
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

  if (isAdminOrError === true) {
    let task: DetailedTask | null;
    try {
      task = await prisma.task.findFirst({
        where: { id: taskId, deleted: false },
        include: {
          forClient: { include: { Email: true, Phone: true } },
          partner: { include: { firmEmails: true, firmPhones: true } },
          taskEvents: {
            include: {
              adminTriggered: { include: { puserData: true } },
              partnerTriggered: true,
              partnerFrom: true,
              partnerTo: true,
            },
          },
        },
      });

      if (!task) {
        const err = new ServerError(
          404,
          'Не съществува такъв партньор',
          "This partner doesn't exist"
        );
        return next(err);
      }

      const json = superjson.stringify({ task });
      return res.json({ json });
    } catch (error: any) {
      const err = new ServerError(
        500,
        'Сървърна грешка. Опитайте отново.',
        error.message
      );
      return next(err);
    }
  }

  // Check if req is from owner
  const sess = await getSession({ req });
  //@ts-ignore
  const userId: nubmer = sess?.user?.id;

  let task: PersonalTask | null;
  try {
    task = await prisma.task.findFirst({
      where: {
        id: taskId,
        deleted: false,
        partner: { userData: { id: userId } },
      },
      include: {
        forClient: { include: { Email: true, Phone: true } },
      },
    });

    if (!task) {
      const err = new ServerError(
        404,
        'Не съществува такъв партньор',
        "This partner doesn't exist"
      );
      return next(err);
    }

    switch (task.status) {
      case TaskStatus.REGISTERED:
      case TaskStatus.REJECTED:
      case TaskStatus.UNABLE_TO_FINISH:
        const err = new ServerError(
          401,
          'Нямате достъп до тази задача',
          "This partner doesn't have rights to view the task"
        );
        return next(err);

      case TaskStatus.OFFERED:
        task = { ...task, forClient: null };
      default:
        break;
    }

    const json = superjson.stringify({ task });
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

export type PersonalTask = Task & {
  forClient:
    | (Client & {
        Email: Email[];
        Phone: Phone[];
      })
    | null;
};

export type DetailedTask = Task & {
  partner:
    | (Partner & {
        firmEmails: Email[];
        firmPhones: Phone[];
      })
    | null;
  forClient:
    | (Client & {
        Email: Email[];
        Phone: Phone[];
      })
    | null;
  taskEvents: (TaskEvent & {
    adminTriggered:
      | (Admin & {
          puserData: User;
        })
      | null;
    partnerTriggered: Partner | null;
    partnerFrom: Partner | null;
    partnerTo: Partner | null;
  })[];
};

const DELETEHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'DELETE') {
    return next();
  }

  // Parse body and params
  let partnerId: number;
  try {
    const query = GETQuery__Schema.parse(req.query);
    partnerId = query.taskId;
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
