import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Partner, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';
import PasswordField from '../../../components/common/inputs/password-field';
import { useConfiguredMutation } from '../../../components/data-fetching/use-mutation';
import PageCard from '../../../components/layouts/page-card/page-card';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import { prisma } from '../../../config/db';

type PassForm = {
  password: string;
  rePassword: string;
};

const passValidator = (val: string) => {
  if (val.length < 6) return 'Въведете поне 6 символа';
  if (val.toLowerCase() === val) return 'Въведете поне една главна буква';

  if (
    ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].some((d) => val.search(d.toString()) > -1)
  )
    return 'Въведете поне една цифра';

  return true;
};

export default function ResetPasswordPage({
  partnerId,
  hash,
}: {
  partnerId: number;
  hash: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<PassForm>({
    mode: 'onChange',
    defaultValues: { password: '', rePassword: '' },
  });

  const { replace } = useRouter();
  const { isLoading, mutate } = useConfiguredMutation(
    `/api/partners/${partnerId}/password`,
    { method: 'PATCH' },
    undefined,
    {
      alertOnSuccess: { message: 'Успешно променена парола' },
      onSuccess: () => {
        replace('/partners');
      },
    }
  );

  return (
    <>
      <Head>
        <title>Нулиране на паролата</title>
      </Head>
      <PageLayout>
        <PageCard>
          <Stack spacing={2} sx={{ maxWidth: (theme) => theme.spacing(50) }}>
            <Typography variant="h6">
              <PrimaryDarkText>Настройване на паролата</PrimaryDarkText>
            </Typography>
            <Typography variant="body1">Въведете нова парола</Typography>
            <PasswordField
              label="Парола"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                validate: passValidator,
              })}
            />
            <PasswordField
              label="Повторете паролата"
              error={!!errors.rePassword}
              helperText={errors.rePassword?.message}
              {...register('rePassword', {
                validate: (val) => {
                  if (val !== '' && val !== getValues('password'))
                    return 'Паролите не съвпадат';

                  return true;
                },
              })}
            />
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmit((data) =>
                mutate({ password: data.password, securityHash: hash })
              )}
            >
              Изпрати
            </LoadingButton>
          </Stack>
        </PageCard>
      </PageLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const ParamsSchema = z.object({
    partnerId: z.coerce.number(),
    c: z.string(),
  });

  let p: z.infer<typeof ParamsSchema>;
  let partner:
    | (Partner & {
        userData: User;
      })
    | null;

  try {
    p = ParamsSchema.parse(query);
    partner = await prisma.partner.findFirst({
      where: { id: p.partnerId },
      include: { userData: true },
    });
  } catch (error) {
    return {
      redirect: {
        destination: '/partners',
        permanent: false,
      },
    };
  }

  if (!partner) {
    return {
      redirect: {
        destination: '/partners',
        permanent: false,
      },
    };
  }

  // Check hash
  const isValid = await compare(
    JSON.stringify({
      firmName: partner.firmName,
      firmEKATTE: partner.firmEKATTE,
      oldPass: partner.userData.passwordHash,
    }),
    p.c
  );

  if (!isValid) {
    return {
      redirect: {
        destination: '/partners',
        permanent: false,
      },
    };
  }

  return { props: { partnerId: p.partnerId, hash: p.c } };
};
