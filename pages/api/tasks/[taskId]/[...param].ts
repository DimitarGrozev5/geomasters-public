import { Admin, Partner, Task, TaskStatus, UserRole } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { z, ZodTypeAny } from 'zod';
import { TaskBasicCategory__Schema, TaskStatus__Schema } from '..';
import { prisma } from '../../../../config/db';
import { OUR_CUT } from '../../../../config/dinero';
import { EkatteData, EkatteData_Schema } from '../../../../data/ekatte';
import { isAdmin, reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const Query__Schema = z.object({
  taskId: z.coerce.number(),
  param: z.array(z.string()),
});
const StringData_Schema = z.object({
  data: z.string(),
});
const PATCHHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'PATCH') {
    return next();
  }

  // Get Admin Id
  const email = (await getSession({ req }))?.user?.email!;
  let admin: Admin | null;
  try {
    const user = await prisma.user.findFirst({
      where: {
        primaryEmail: email,
      },
    });
    admin = await prisma.admin.findFirst({ where: { userDataId: user?.id } });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  if (!admin) {
    const err = new ServerError(
      401,
      'Нямате право да променяте този ресурс',
      "Couldn't find admin in DB"
    );
    return next(err);
  }

  // Parse body and params
  let taskId: number;
  let param: string[];
  try {
    const query = Query__Schema.parse(req.query);
    taskId = query.taskId;
    param = query.param;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  let DataSchema: ZodTypeAny = z.undefined();
  let Patch = async (data: any): Promise<void> => {};
  switch (param[0]) {
    case 'ekatte':
      DataSchema = z.object({ data: EkatteData_Schema });
      Patch = async (data: EkatteData) => {
        if (data === null || typeof data === 'string') {
          throw new Error(
            'Send a valid EKATTE object and not a oblast string or null.'
          );
        }
        await prisma.task.update({
          where: { id: taskId },
          data: {
            ekatte: data.ekatte,
          },
        });
      };
      break;

    case 'description':
      DataSchema = StringData_Schema;
      Patch = async (data) => {
        await prisma.task.update({
          where: { id: taskId },
          data: {
            description: data,
          },
        });
      };
      break;

    case 'partnerDescription':
      DataSchema = StringData_Schema;
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
          include: { partner: true },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            partnerDescription: data,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.ADMIN,
                adminTriggered: { connect: { id: admin?.id } },
                partnerDescriptionFrom: task?.partnerDescription,
                partnerDescriptionTo: data,
              },
            },
          },
        });
      };
      break;

    case 'forClient':
      DataSchema = z.object({ data: z.coerce.number() });
      Patch = async (data) => {
        await prisma.task.update({
          where: { id: taskId },
          data: {
            forClient: { connect: { id: data } },
          },
        });
      };
      break;

    case 'partner':
      DataSchema = z.object({ data: z.coerce.number() });
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
          include: { partner: true },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            partner: { connect: { id: data } },
            status: TaskStatus.OFFERED,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.ADMIN,
                adminTriggered: { connect: { id: admin?.id } },
                partnerFrom: task?.partner?.id
                  ? { connect: { id: task?.partner?.id } }
                  : undefined,
                partnerTo: { connect: { id: data } },
                statusFrom: task?.status,
                statusTo: TaskStatus.OFFERED,
              },
            },
          },
        });
      };
      break;

    case 'status':
      DataSchema = z.object({ data: TaskStatus__Schema });
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            status: data,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.ADMIN,
                adminTriggered: { connect: { id: admin?.id } },
                statusFrom: task?.status,
                statusTo: data,
              },
            },
          },
        });
      };
      break;

    case 'taskBasicCategory':
      DataSchema = z.object({ data: TaskBasicCategory__Schema });
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            taskBasicCategory: data,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.ADMIN,
                adminTriggered: { connect: { id: admin?.id } },
                taskBasicCategoryFrom: task?.taskBasicCategory,
                taskBasicCategoryTo: data,
              },
            },
          },
        });
      };
      break;

    case 'partnerRequest':
      DataSchema = StringData_Schema;
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
          include: { partner: true },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            partnerRequest: data,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.ADMIN,
                adminTriggered: { connect: { id: admin?.id } },
                partnerRequestFrom: task?.partnerRequest,
                partnerRequestTo: data,
              },
            },
          },
        });
      };
      break;
    default:
  }

  // Parse data
  let data: any;
  try {
    const body = DataSchema.parse(req.body);
    data = body.data;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  // Performe PATCH
  try {
    await Patch(data);
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

const DELETEHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'DELETE') {
    return next();
  }

  // Get Admin Id
  const email = (await getSession({ req }))?.user?.email!;
  let admin: Admin | null;
  try {
    const user = await prisma.user.findFirst({
      where: {
        primaryEmail: email,
      },
    });
    admin = await prisma.admin.findFirst({ where: { userDataId: user?.id } });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  if (!admin) {
    const err = new ServerError(
      401,
      'Нямате право да променяте този ресурс',
      "Couldn't find admin in DB"
    );
    return next(err);
  }

  // Parse body and params
  let taskId: number;
  let param: string[];
  try {
    const query = Query__Schema.parse(req.query);
    taskId = query.taskId;
    param = query.param;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  let Patch = async (): Promise<void> => {};
  switch (param[0]) {
    case 'forClient':
      Patch = async () => {
        await prisma.task.update({
          where: { id: taskId },
          data: {
            forClient: { disconnect: true },
          },
        });
      };
      break;

    case 'partner':
      Patch = async () => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
          include: { partner: true },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            partner: { disconnect: true },
            status: TaskStatus.OFFERED,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.ADMIN,
                adminTriggered: { connect: { id: admin?.id } },
                partnerFrom: task?.partner?.id
                  ? { connect: { id: task?.partner?.id } }
                  : undefined,
                partnerTo: undefined,
                statusFrom: task?.status,
                statusTo: TaskStatus.REGISTERED,
              },
            },
          },
        });
      };
      break;
    default:
  }

  // Performe PATCH
  try {
    await Patch();
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

const PATCHByPartnerHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'PATCH') {
    return next();
  }

  // Check if user is admin and if so exit
  const isAdminOrError = await reqIsAdmin(req);
  if (isAdminOrError === true) {
    return next();
  }

  // Get Partner Id
  // @ts-ignore
  const userId = (await getSession({ req }))?.user?.id;
  let partner: Partner | null;
  try {
    partner = await prisma.partner.findFirst({
      where: { userData: { id: userId } },
    });
  } catch (error: any) {
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  if (!partner) {
    const err = new ServerError(
      401,
      'Нямате право да променяте този ресурс',
      "Couldn't find partner in DB"
    );
    return next(err);
  }

  // Parse body and params
  let taskId: number;
  let param: string[];
  try {
    const query = Query__Schema.parse(req.query);
    taskId = query.taskId;
    param = query.param;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  // Check if partner can change this task
  let task: Task | null;
  try {
    task = await prisma.task.findFirst({
      where: {
        id: taskId,
        partner: { id: partner.id },
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

  let DataSchema: ZodTypeAny = z.undefined();
  let Patch = async (data: any): Promise<void> => {};
  switch (param[0]) {
    case 'status':
      switch (task?.status) {
        case TaskStatus.REGISTERED:
        case TaskStatus.REJECTED:
        case TaskStatus.CLIENT_REJECTED:
        case TaskStatus.FINISHED:
        case TaskStatus.UNABLE_TO_FINISH:
        case TaskStatus.IMPOSSIBLE:
          break;
        case TaskStatus.OFFERED:
          DataSchema = z.object({
            data: z.union([
              z.literal(TaskStatus.ACCEPTED),
              z.literal(TaskStatus.REJECTED),
            ]),
          });
          break;
        case TaskStatus.ACCEPTED:
          DataSchema = z.object({
            data: z.union([
              z.literal(TaskStatus.CLIENT_REJECTED),
              z.literal(TaskStatus.STARTED),
            ]),
          });
          break;
        case TaskStatus.STARTED:
          DataSchema = z.object({
            data: z.union([
              z.literal(TaskStatus.UNABLE_TO_FINISH),
              z.literal(TaskStatus.FINISHED),
              z.literal(TaskStatus.IMPOSSIBLE),
            ]),
          });
          break;
        default:
      }
      Patch = async (data) => {
        await prisma.$transaction(async (tr) => {
          await tr.task.update({
            where: { id: taskId },
            data: {
              status: data,
              taskEvents: {
                create: {
                  createdAt: new Date().getTime(),
                  whoTriggeredIt: UserRole.PARTNER,
                  partnerTriggered: { connect: { id: partner?.id } },
                  statusFrom: task?.status,
                  statusTo: data,
                },
              },
            },
          });
          if (data === TaskStatus.ACCEPTED) {
            if (!partner?.creditBalance || partner?.creditBalance < OUR_CUT) {
              throw new ServerError(
                422,
                'Нямате достатъчно средства по акаунт!',
                'Not enough money in account'
              );
            }
            await tr.partner.update({
              where: { id: partner.id },
              data: {
                creditBalance: { decrement: OUR_CUT },
                creditMovement: {
                  create: {
                    amount: -1 * OUR_CUT,
                    reason: 'PARTNER_SPEND_ON_TASK',
                    whoChanged: 'PARTNER',
                    createdAt: new Date().getTime(),
                  },
                },
              },
            });
          }
        });
      };
      break;

    case 'partnerDescription':
      DataSchema = StringData_Schema;
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
          include: { partner: true },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            partnerDescription: data,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.PARTNER,
                partnerTriggered: { connect: { id: partner?.id } },
                partnerDescriptionFrom: task?.partnerDescription,
                partnerDescriptionTo: data,
              },
            },
          },
        });
      };
      break;

    case 'partnerRequest':
      DataSchema = StringData_Schema;
      Patch = async (data) => {
        const task = await prisma.task.findFirst({
          where: { id: taskId },
          include: { partner: true },
        });
        await prisma.task.update({
          where: { id: taskId },
          data: {
            partnerRequest: data,
            taskEvents: {
              create: {
                createdAt: new Date().getTime(),
                whoTriggeredIt: UserRole.PARTNER,
                partnerTriggered: { connect: { id: partner?.id } },
                partnerRequestFrom: task?.partnerRequest,
                partnerRequestTo: data,
              },
            },
          },
        });
      };
      break;

    default:
  }

  // Parse data
  let data: any;
  try {
    const body = DataSchema.parse(req.body);
    data = body.data;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  // Performe PATCH
  try {
    await Patch(data);
  } catch (error: any) {
    if ('userMessage' in error) {
      return next(error);
    }
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  res.json({ message: 'Success' });
};

export default pipeMiddlewares(
  isAuth,
  PATCHByPartnerHandler,
  isAdmin,
  PATCHHandler,
  DELETEHandler
);
