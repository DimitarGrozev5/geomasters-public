import { Partner, Task, TaskBasicCategory, TaskStatus } from '@prisma/client';
import superjson from 'superjson';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import { EkatteFormType_Schema } from '../../../components/common/inputs/message-us-inputs/form-data-type';
import { prisma } from '../../../config/db';
import { EkatteData } from '../../../data/ekatte';
import { isAdmin, reqIsAdmin } from '../../../model/middlewares/is-admin';
import { isAuth } from '../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../model/server-error';

export const TaskBasicCategory__Schema = z.union([
  z.literal(TaskBasicCategory.TRASIRANE),
  z.literal(TaskBasicCategory.ZASNEMANE),
  z.literal(TaskBasicCategory.TARPIMOST),
  z.literal(TaskBasicCategory.IZMENENIE_KKKR),
  z.literal(TaskBasicCategory.POPALVANE_STROEJ),
  z.literal(TaskBasicCategory.DELBA_OBEDINENIE),
  z.literal(TaskBasicCategory.KKKR_DRUGI),
  z.literal(TaskBasicCategory.VP),
  z.literal(TaskBasicCategory.STROITELNA_LINIA),
  z.literal(TaskBasicCategory.STROITELSTVO),
  z.literal(TaskBasicCategory.PUP),
  z.literal(TaskBasicCategory.INJENERSTVO),
  z.literal(TaskBasicCategory.OCENKA_SO),
  z.literal(TaskBasicCategory.OCENKA_PI),
  z.literal(TaskBasicCategory.UNSET),
  z.literal(TaskBasicCategory.UNKNOWN),
]);

export const TaskStatus__Schema = z.union([
  z.literal(TaskStatus.REGISTERED),
  z.literal(TaskStatus.OFFERED),
  z.literal(TaskStatus.REJECTED),
  z.literal(TaskStatus.ACCEPTED),
  z.literal(TaskStatus.CLIENT_REJECTED),
  z.literal(TaskStatus.STARTED),
  z.literal(TaskStatus.FINISHED),
  z.literal(TaskStatus.UNABLE_TO_FINISH),
  z.literal(TaskStatus.IMPOSSIBLE),
]);

const NewTask__Schema = z.object({
  description: z.string(),
  ekatte: EkatteFormType_Schema,
  forClientId: z.optional(z.number()),
  category: TaskBasicCategory__Schema,
  messageId: z.optional(z.number()),
});

type NewTaskBody = z.infer<typeof NewTask__Schema>;

const POSTHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'POST') {
    return next();
  }

  // Parse input data
  let body: NewTaskBody;
  try {
    body = NewTask__Schema.parse(req.body);
  } catch (err: any) {
    const error = new ServerError(422, 'Невалидни данни', err?.message);
    return next(error);
  }

  // Validate that client exists
  if (body.forClientId !== undefined) {
    const client = prisma.client.findFirst({ where: { id: body.forClientId } });
    if (!client) {
      const error = new ServerError(
        422,
        'Посоченият клиент не съществува',
        "ClientId doesn't exist in db"
      );
      return next(error);
    }
  }

  // Validate that message exists
  if (body.messageId !== undefined) {
    const message = prisma.message.findFirst({ where: { id: body.messageId } });
    if (!message) {
      const error = new ServerError(
        422,
        'Посоченото съобщение не същесвтвува',
        "MessageId doesn't exist in db"
      );
      return next(error);
    }
  }

  // Validate ekatte
  if (body.ekatte === null || typeof body.ekatte === 'string') {
    const error = new ServerError(
      422,
      'Моля посочете населено място',
      'Ekatte is not selected'
    );
    return next(error);
  }

  // Validate categories
  if (!(body.category in TaskBasicCategory)) {
    const error = new ServerError(
      422,
      'Избраната категория не съществува. Свържете се с администратор',
      "Provided category doesn't exist in db"
    );
    return next(error);
  }

  // Make changes in DB
  try {
    await prisma.task.create({
      data: {
        createdAt: new Date().getTime(),
        description: body.description,
        // This is safe because I checked that ekatte is not null or string above, but ts is not picking it up
        ekatte: (body.ekatte as EkatteData).ekatte,
        forClientId: body.forClientId,
        taskBasicCategory: body.category,
        Message: body.messageId
          ? { connect: { id: body.messageId } }
          : undefined,
        CommunicationEvent: body.forClientId
          ? {
              create: {
                client: { connect: { id: body.forClientId } },
                createdAt: new Date().getTime(),
                initialMessage: { connect: { id: body.messageId } },
              },
            }
          : undefined,
      },
    });

    return res.json({ message: 'Success' });
  } catch (err: any) {
    console.log(err);

    const error = new ServerError(
      500,
      'Грешка на сървъра, оптиайте отново',
      err?.message
    );
    return next(error);
  }
};

const GETSchema = z.object({
  onlyMine: z.coerce.boolean(),

  status: z.optional(TaskStatus__Schema),
  category: z.optional(TaskBasicCategory__Schema),
  dateFrom: z.optional(z.coerce.number()),
  dateTo: z.optional(z.coerce.number()),
  ekatte: z.optional(z.string()),
  rnd: z.optional(z.string()),
});
const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'GET') {
    return next();
  }

  // Parse input data
  let onlyMine: boolean;
  let searchQuery: z.infer<typeof GETSchema>;
  try {
    searchQuery = GETSchema.parse(req.query);
    onlyMine = searchQuery.onlyMine;
  } catch (err: any) {
    const error = new ServerError(422, 'Невалидни данни', err?.message);
    return next(error);
  }

  // Check if user is admin or owner
  const isAdminOrError = await reqIsAdmin(req);

  const sess = await getSession({ req });
  //@ts-ignore
  const userId: number = sess?.user?.id;

  const rnd = searchQuery.rnd?.split('^.%$');

  // Get Tasks from DB
  try {
    if (isAdminOrError === true) {
      const tasks = await prisma.task.findMany({
        where: {
          partner: onlyMine ? { userData: { id: userId } } : undefined,
          status: searchQuery.status,
        },
        include: { partner: true },
      });

      const json = superjson.stringify({ tasks });
      return res.json({ json });
    } else if (userId! !== undefined) {
      const tasks = await prisma.task.findMany({
        where: {
          partner: { userData: { id: userId } },

          status: searchQuery.status,
          taskBasicCategory: searchQuery.category,
          createdAt: { lte: searchQuery.dateTo, gte: searchQuery.dateFrom },
          ekatte: searchQuery.ekatte,
          AND: [
            {
              OR: [
                { status: TaskStatus.OFFERED },
                { status: TaskStatus.ACCEPTED },
                { status: TaskStatus.CLIENT_REJECTED },
                { status: TaskStatus.STARTED },
                { status: TaskStatus.IMPOSSIBLE },
                { status: TaskStatus.FINISHED },
              ],
            },
            {
              OR: rnd?.map((r) => ({
                OR: [
                  { description: { contains: r } },
                  { partnerDescription: { contains: r } },
                  {
                    AND: [
                      {
                        OR: [
                          { status: TaskStatus.ACCEPTED },
                          { status: TaskStatus.CLIENT_REJECTED },
                          { status: TaskStatus.STARTED },
                          { status: TaskStatus.IMPOSSIBLE },
                          { status: TaskStatus.FINISHED },
                        ],
                      },
                      { forClient: { name: { contains: r } } },
                    ],
                  },
                  {
                    AND: [
                      {
                        OR: [
                          { status: TaskStatus.ACCEPTED },
                          { status: TaskStatus.CLIENT_REJECTED },
                          { status: TaskStatus.STARTED },
                          { status: TaskStatus.IMPOSSIBLE },
                          { status: TaskStatus.FINISHED },
                        ],
                      },
                      {
                        forClient: {
                          Email: { some: { email: { contains: r } } },
                        },
                      },
                    ],
                  },
                ],
              })),
            },
          ],
        },
        include: { partner: true },
      });
      const json = superjson.stringify({ tasks });
      return res.json({ json });
    }
  } catch (err: any) {
    const error = new ServerError(
      500,
      'Грешка на сървъра, оптиайте отново',
      err?.message
    );
    return next(error);
  }

  res.end();
};

export type GETTask = Task & {
  partner: Partner | null;
};

export default pipeMiddlewares(isAuth, GETHandler, isAdmin, POSTHandler);
