import { LoadingButton } from '@mui/lab';
import { Box, Button, Fab, TextField, Typography } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';

import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { useConfiguredMutation } from '../../components/data-fetching/use-mutation';
import PageCard from '../../components/layouts/page-card/page-card';
import PageLayout from '../../components/layouts/page-layout/page-layout';
import Modal from '../../components/layouts/main-layout/modal/modal';
import Spacer from '../../components/common/data-presentation/spacer';
import PrimaryDarkText from '../../components/common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../components/common/display-modifiers/secondary-dark-text';
import PartnersChapter1 from '../../components/page-components/partners-sales-pitch/chapter-1';
import PartnersChapter2 from '../../components/page-components/partners-sales-pitch/chapter-2';
import PartnersChapter3 from '../../components/page-components/partners-sales-pitch/chapter-3';
import PartnersChapter4 from '../../components/page-components/partners-sales-pitch/chapter-4';
import PartnersChapter5 from '../../components/page-components/partners-sales-pitch/chapter-5';
import PartnersChapter6 from '../../components/page-components/partners-sales-pitch/chapter-6';

export default function UserProfilePage() {
  const [showLogin, setShowLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchFunction = useCallback(async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result?.ok) {
      throw new Error(result?.error);
    }
  }, [email, password]);

  const { isLoading, mutate: sendRequest } = useConfiguredMutation(
    fetchFunction,
    { method: 'POST' },
    undefined,
    { alertOnSuccess: { message: 'Успешно се вписахте' } }
  );

  return (
    <>
      <Head>
        <title>Партньори на GeoMasters - защо да стана партньор?</title>
        <meta
          name="description"
          content="Вие сте геодезист, който иска да започне частна дейност, но се притеснявате, че нямате достатъчно клиенти? Свържете се с нас и ще получите достъп до силно перспективният онлайн пазар."
        />
      </Head>
      <>
        <Fab
          variant="extended"
          color="secondary"
          onClick={() => setShowLogin(true)}
          sx={{
            position: 'fixed',
            right: (theme) => theme.spacing(4),
            bottom: (theme) => theme.spacing(4),
            zIndex: (theme) => theme.zIndex.fab,
          }}
        >
          <LoginIcon sx={{ mr: 1 }} />
          Вписване
        </Fab>
        <Modal show={showLogin} closeHandler={() => setShowLogin(false)}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            <PrimaryDarkText>Вписване в профила Ви</PrimaryDarkText>
          </Typography>

          <Spacer gap={1} />
          <Typography sx={{ textAlign: 'center' }}>
            <SecondaryDarkText>
              Нямате профил? Свържете се с нас, за да се запознаем и да Ви
              направим.
            </SecondaryDarkText>
          </Typography>

          <Spacer gap={4} />
          <TextField
            label="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer gap={2} />
          <TextField
            label="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography>
            <PrimaryDarkText>
              Ако сте си забравили паролата, свържете се администратор
            </PrimaryDarkText>
          </Typography>
          <Spacer gap={2} />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={() => setShowLogin(false)}>Отказ</Button>
            <LoadingButton loading={isLoading} onClick={sendRequest}>
              Вписване
            </LoadingButton>
          </Box>
        </Modal>

        <PageCard>
          За повече информация за партньорство се свържете с нас
        </PageCard>

        {/* <PartnersChapter1 />
        <PartnersChapter2 />
        <PartnersChapter3 />
        <PartnersChapter4 />
        <PartnersChapter5 />
        <PartnersChapter6 /> */}
      </>
    </>
  );
}
