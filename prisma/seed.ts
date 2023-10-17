import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create new user who is both ADMIN and PARTNER
  const pass = 'asdasd';
  const passHash = await hash(pass, 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Mitko',
      passwordHash: passHash,
      primaryEmail: 'dim5@mail.bg',
      primaryPhone: '0885131313',
      Admin: {
        create: {
          authorityLevel: 'FULL_CONTROL',
        },
      },
      Partner: {
        create: {
          firmName: 'DIG',
          firmEmails: { create: { email: 'dim5@mail.bg' } },
          firmPhones: { create: { phone: '0885131313', hasViber: true } },
          firmEKATTE: '10135',
        },
      },
    },
  });

  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Гофи ЕТ',
  //     passwordHash: passHash,
  //     primaryEmail: 'gof@abv.bg',
  //     primaryPhone: '0885151548',
  //     Partner: {
  //       create: {
  //         firmName: 'Гофи ЕТ',
  //         firmEmails: { create: { email: 'gof@abv.bg' } },
  //         firmPhones: { create: { phone: '0885151548', hasViber: true } },
  //         firmEKATTE: '10135',
  //       },
  //     },
  //   },
  // });

  // const client = await prisma.client.create({
  //   data: {
  //     name: 'Client 1111',
  //     Email: { create: { email: 'dim1@mail.bg' } },
  //     Phone: { create: { phone: '0881111111', hasViber: true } },
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
