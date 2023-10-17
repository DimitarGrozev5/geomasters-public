import superjson from 'superjson';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  MsgUs_FormInputs,
  MsgUs_FormInputs_Schema,
} from '../../../components/common/inputs/message-us-inputs/form-data-type';
import { prisma } from '../../../config/db';
import { Message, ModeOfCommunication } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { nzEmail, nzPhone } from '../../../utility/normalize';
import { sendMail } from '../../../config/mail-trasporter';
import { adminEmailsForNewMsg } from '../../../data/admin-emails';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle posting a new message
  if (req.method === 'POST') {
    // Validate message body
    let msgBody: MsgUs_FormInputs;
    try {
      msgBody = MsgUs_FormInputs_Schema.parse(req.body);
      if (msgBody.ekatte === null || typeof msgBody.ekatte === 'string') {
        throw new ZodError([
          {
            code: 'custom',
            message: 'Моля изберете населено място',
            path: ['ekatte'],
          },
        ]);
      }
    } catch (error: unknown) {
      console.log((error as ZodError).issues);

      res.status(422).json({ userMessage: 'Моля проверете', fullMessage: '' });
      return;
    }

    // Validate recaptcha
    const body = new URLSearchParams();
    body.append('secret', process.env.RECAPTCHA_SECRET_KEY ?? '');
    body.append('response', msgBody.recaptchaToken);

    try {
      const recaptchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
          body,
        }
      );

      if (!recaptchaResponse.ok) {
        throw new Error('Recaptcha fetch error');
      }

      const text = await recaptchaResponse.clone().json();
      // console.log(text);

      const recaptcha = await recaptchaResponse.json();
      if ('success' in recaptcha && !recaptcha.success) {
        throw new Error('Recaptcha success error');
      }

      if ('score' in recaptcha && recaptcha.score < 0.5) {
        throw new Error('Recaptcha score error');
      }
    } catch (error) {
      return res.status(500).json({
        fullMessage: (error as Error)?.message ?? '',
        message:
          'Възникна грешка. Пробвайте да изпратите отново или ни потърсете по телефон.',
      });
    }

    // Create message
    const modeOfCom = (() => {
      switch (msgBody.meansOfContact) {
        case 'email':
          return ModeOfCommunication.EMAIL;
        case 'phone':
          return ModeOfCommunication.PHONE;
        case 'viber':
          return ModeOfCommunication.VIBER;
      }
    })();

    try {
      await prisma.message.create({
        data: {
          createdAt: new Date().getTime(),
          name: msgBody.name,
          email: nzEmail(msgBody.email),
          phone: nzPhone(msgBody.phone),
          hasViber: msgBody.hasViber,
          ekatte: msgBody.ekatte.ekatte,
          problemDescription: msgBody.problemDescription,
          meansOfContact: modeOfCom,
        },
      });
    } catch (error) {
      res.status(500).json({
        fullMessage: (error as Error)?.message ?? '',
        message:
          'Възникна грешка. Пробвайте да изпратите отново или ни потърсете по телефон.',
      });
    }

    res.json({ message: 'Запитването е изпратено!' });

    // Send email
    adminEmailsForNewMsg.forEach((to) =>
      sendMail({
        to,
        subject: 'Запитване на GeoMasters',
        // @ts-ignore
        text: `${msgBody.phone} има запитване: ${msgBody.problemDescription}, за ${msgBody.ekatte.ekatte}`,
      })
        .then((info) => {
          console.log('Email sent: ' + info.response);
        })
        .catch((error) => {
          console.log(error);
        })
    );
    return;
  }

  // Handle getting all messages
  if (req.method === 'GET') {
    // Get Client session
    const session = await getSession({ req });
    if (!session || session.user?.image !== 'admin') {
      return res.status(401).json({
        fullMessage: 'Unauthenticated',
        userMessage: 'Нямате право да разглеждате този ресурс',
      });
    }

    // Get all messages
    let messages: Message[];
    try {
      messages = await prisma.message.findMany({});
    } catch (error: any) {
      return res.status(500).json({
        fullMessage: error?.message ?? 'Internal Server Error',
        userMessage:
          'Възникна грешка при зареждане на данните. Опитайте отново',
      });
    }

    const json = superjson.stringify({ messages });
    return res.json({ json });
  }
  return;
}
