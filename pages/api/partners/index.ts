// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client, Email, Partner, Phone } from '@prisma/client';
import { z } from 'zod';
import { EkatteFormType_Schema } from '../../../components/common/inputs/message-us-inputs/form-data-type';
import { prisma } from '../../../config/db';
import { isAdmin } from '../../../model/middlewares/is-admin';
import { isAuth } from '../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../model/server-error';

const Query_Schema = z.union([
  z.undefined(),
  z.object({
    search: z.string(),
    oblast: z.union([z.undefined(), z.string()]),
    settlement: z.union([z.undefined(), z.string()]),
  }),
]);

const GETHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Get All users with query
  if (req.method !== 'GET') {
    return next();
  }

  let query: z.infer<typeof Query_Schema>;
  try {
    query = Query_Schema.parse(req.query);
  } catch (error) {}

  let partners: GETPartner[];

  try {
    partners = await prisma.partner.findMany({
      include: {
        firmEmails: true,
        firmPhones: true,
      },
      where: {
        AND: [
          { deleted: false },
          {
            OR: [
              { firmName: { contains: query?.search } },
              { firmEmails: { some: { email: { contains: query?.search } } } },
              { firmPhones: { some: { phone: { contains: query?.search } } } },
              { firmAddress: { contains: query?.search } },
              { firmEKATTE: query?.settlement },
            ],
          },
        ],
      },
    });
  } catch (err: any) {
    const error = new ServerError(
      500,
      'Сървърна грешка. Опитайте отново',
      err?.message
    );
    return next(error);
  }

  res.json({ partners });
};

export type GETPartner = Partner & {
  firmEmails: Email[];
  firmPhones: Phone[];
};

const POSTNewPartner__Schema = z.object({
  email: z.string().email(),
  phone: z.string(),
  hasViber: z.boolean(),

  firmName: z.string(),
  firmAdress: z.string(),
  firmEkatte: EkatteFormType_Schema,
});
export type POSTNewPartner = z.infer<typeof POSTNewPartner__Schema>;
const POSTHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'POST') {
    return next();
  }

  // Get post data
  let body: z.infer<typeof POSTNewPartner__Schema>;
  try {
    body = POSTNewPartner__Schema.parse(req.body);
  } catch (err: any) {
    const error = new ServerError(422, 'Невалидни данни', err?.message);
    return next(error);
  }

  // Validate ekatte
  if (body.firmEkatte === null || typeof body.firmEkatte === 'string') {
    const error = new ServerError(
      422,
      'Моля посочете населено място',
      'Ekatte is not selected'
    );
    return next(error);
  }

  // Insert new client in DB
  try {
    const partner = await prisma.partner.create({
      data: {
        userData: {
          connectOrCreate: {
            where: { primaryEmail: body.email },
            create: {
              passwordHash: '',
              name: body.firmName,
              primaryEmail: body.email,
              primaryPhone: body.phone,
            },
          },
        },
        firmName: body.firmName,
        firmEmails: {
          create: {
            email: body.email,
          },
        },
        firmPhones: {
          create: {
            phone: body.phone,
            hasViber: body.hasViber,
          },
        },
        firmAddress: body.firmAdress,
        firmEKATTE: body.firmEkatte.ekatte,
      },
    });

    res.json({ message: 'Success' });
  } catch (err: any) {
    const error = new ServerError(
      500,
      'Грешка на сървъра, оптиайте отново',
      err?.message
    );
    return next(error);
  }
};

export default pipeMiddlewares(isAuth, isAdmin, POSTHandler, GETHandler);
