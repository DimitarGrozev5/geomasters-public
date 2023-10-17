import { getSession } from 'next-auth/react';
import { z, ZodTypeAny } from 'zod';
import { prisma } from '../../../../config/db';
import { EkatteData, EkatteData_Schema } from '../../../../data/ekatte';
import { reqIsAdmin } from '../../../../model/middlewares/is-admin';
import { isAuth } from '../../../../model/middlewares/is-auth';
import {
  MiddlewareHandler,
  pipeMiddlewares,
} from '../../../../model/middlewares/middleware-pipe';
import { ServerError } from '../../../../model/server-error';

const Query__Schema = z.object({
  partnerId: z.coerce.number(),
  param: z.array(z.string()),
});
const StringData_Schema = z.object({
  data: z.string(),
});
const CreditMovementReason_Schema = z.union([
  z.literal('PARTNER_INPUT'),
  z.literal('PARTNER_SPEND_ON_TASK'),
  z.literal('PARTNER_WITHDRAW'),
  z.literal('ADMIN_REFUND_TASK'),
  z.literal('ADMIN_CORRECT_ERROR'),
]);

const PATCHHandler: MiddlewareHandler = async (req, res, next) => {
  // Handle Post new Client
  if (req.method !== 'PATCH') {
    return next();
  }

  // Parse body and params
  let partnerId: number;
  let param: string[];
  try {
    const query = Query__Schema.parse(req.query);
    partnerId = query.partnerId;
    param = query.param;
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
  if (isAdminOrError !== true) {
    const sess = await getSession({ req });

    // @ts-ignore
    const isOwner = partnerId === sess?.user?.partnerId;

    if (!isOwner) {
      const error = new ServerError(
        401,
        'Нямате право да променяте този ресурс',
        'You are not admin or owner'
      );
      return next(error);
    }
  }

  let DataSchema: ZodTypeAny = z.undefined();
  let Patch = async (data: any): Promise<void> => {};
  switch (param[0]) {
    case 'creditBalance':
      DataSchema = z.object({
        data: z.object({
          amount: z.coerce.number(),
          reason: CreditMovementReason_Schema,
        }),
      });
      Patch = async (data) => {
        await prisma.$transaction(async (tr) => {
          let dir = 1;
          switch (data.reason) {
            case 'PARTNER_SPEND_ON_TASK':
            case 'PARTNER_WITHDRAW':
              dir = -1;
              break;
            default:
              break;
          }
          const ch = dir * data.amount;

          const partner = await tr.partner.update({
            where: { id: partnerId },
            data: { creditBalance: { increment: ch } },
          });

          if (partner.creditBalance < 0) {
            throw new Error(`${partner.id} doesn't have enough money`);
          }

          const p = await tr.partner.update({
            where: { id: partnerId },
            data: {
              creditMovement: {
                create: {
                  amount: ch,
                  reason: data.reason,
                  whoChanged: isAdminOrError !== true ? 'PARTNER' : 'ADMIN',
                  createdAt: new Date().getTime(),
                },
              },
            },
          });

          return p;
        });
      };
      break;

    case 'firmName':
      if (isAdminOrError === true) {
        DataSchema = StringData_Schema;
        Patch = async (data) => {
          await prisma.partner.update({
            where: { id: partnerId },
            data: {
              firmName: data,
            },
          });
        };
      }
      break;

    case 'firmAddress':
      DataSchema = StringData_Schema;
      Patch = async (data) => {
        await prisma.partner.update({
          where: { id: partnerId },
          data: {
            firmAddress: data,
          },
        });
      };
      break;

    case 'firmEKATTE':
      DataSchema = z.object({ data: EkatteData_Schema });
      Patch = async (data: EkatteData) => {
        if (data === null || typeof data === 'string') {
          throw new Error(
            'Send a valid EKATTE object and not a oblast string or null.'
          );
        }
        await prisma.partner.update({
          where: { id: partnerId },
          data: {
            firmEKATTE: data.ekatte,
          },
        });
      };
      break;

    case 'hasTotalStation':
    case 'hasGNSS':
    case 'hasLevel':
    case 'hasDrone':
    case 'willingToTakeLongTermProjects':
      DataSchema = z.object({ data: z.boolean() });
      Patch = async (data: boolean) => {
        await prisma.partner.update({
          where: { id: partnerId },
          data: {
            [param[0]]: data,
          },
        });
      };
      break;

    case 'willingToTravelUpTo':
    case 'willingToRegularlyTravelUpTo':
      DataSchema = z.object({ data: z.coerce.number() });
      Patch = async (data: number) => {
        await prisma.partner.update({
          where: { id: partnerId },
          data: {
            [param[0]]: data,
          },
        });
      };
      break;

    case 'competentInSurvey':
    case 'competentInLayout':
    case 'competentInCadastre':
    case 'competentInExpertise':
    case 'competentInPUP':
    case 'competentInGrading':
    case 'competentInConstructionLayout':
    case 'competentInGeneralEngineering':
    case 'competentInEvaluations':
      DataSchema = z.object({
        data: z.union([
          z.literal('UNABLE'),
          z.literal('ABLE'),
          z.literal('WILLING'),
        ]),
      });
      Patch = async (data) => {
        await prisma.partner.update({
          where: { id: partnerId },
          data: {
            [param[0]]: data,
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

export default pipeMiddlewares(isAuth, PATCHHandler);
