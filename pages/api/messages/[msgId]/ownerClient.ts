import { Client, Message } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../../../config/db';
import { isAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const getMessage = async (id: number) => {
  try {
    const msg = await prisma.message.findUniqueOrThrow({
      include: { ownerClient: true },
      where: { id },
    });
    if (!msg) {
      throw new Error("Message doesn't exist");
    }

    return msg;
  } catch (err: any) {
    throw new ServerError(500, 'Съобщението не съществува', err.message);
  }
};
type GetMsg = Message & {
  ownerClient: Client | null;
};

const POSTQuery__Schema = z.object({ msgId: z.coerce.number() });
const POSTBody__Schema = z.object({ id: z.coerce.number() });
const POSTHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'POST') {
    return next();
  }

  // Parse body and params
  let msgId: number;
  let clientId: number;
  try {
    const query = POSTQuery__Schema.parse(req.query);
    const body = POSTBody__Schema.parse(req.body);
    msgId = query.msgId;
    clientId = body.id;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  // Get message
  let msg: GetMsg;
  try {
    msg = await getMessage(msgId);
  } catch (err) {
    return next(err as ServerError);
  }

  // Message must not have an owner, to post an owner
  if (!!msg.ownerClient) {
    const err = new ServerError(
      422,
      'Съобщението вече принадлежи на потребител.',
      'Message already has an ownerClent prop'
    );
    return next(err);
  }

  try {
    await prisma.$transaction(async (tr) => {
      await tr.client.update({
        where: { id: clientId },
        data: {
          CommunicationEvent: {
            create: {
              createdAt: new Date().getTime(),
              initialMessageId: msgId,
            },
          },
        },
      });
      await tr.message.update({
        where: { id: msgId },
        data: {
          ownerClientId: clientId,
        },
      });
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

const DELETEHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'DELETE') {
    return next();
  }

  // Parse body and params
  let msgId: number;
  try {
    const query = POSTQuery__Schema.parse(req.query);
    msgId = query.msgId;
  } catch (err: any) {
    const error = new ServerError(
      422,
      'Зле форматирана заявка. Свържете се с администратор.',
      err.message
    );
    return next(error);
  }

  try {
    await prisma.$transaction(async (tr) => {
      const msg = await tr.message.findUnique({
        where: { id: msgId },
        include: { task: true },
      });

      if (!!msg?.task) {
        throw new Error(
          "You can't remove client if there is a registered task!"
        );
      }
      await tr.message.update({
        where: { id: msgId },
        data: {
          ownerClientId: null,
          CommunicationEvent: { deleteMany: {} },
        },
      });
    });
  } catch (error: any) {
    console.log(error);
    const err = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново.',
      error.message
    );
    return next(err);
  }

  res.json({ msg: 'Success' });
};

export default pipeMiddlewares(isAuth, isAdmin, POSTHandler, DELETEHandler);
