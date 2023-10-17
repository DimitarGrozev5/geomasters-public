import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';
import Spacer from '../components/common/data-presentation/spacer';
import PrimaryDarkText from '../components/common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../components/common/display-modifiers/secondary-dark-text';
import PageCard from '../components/layouts/page-card/page-card';
import PageLayout from '../components/layouts/page-layout/page-layout';

export default function Missing404() {
  return (
    <>
      <Head>
        <title>Страницата не е намерена</title>
      </Head>
      <PageLayout>
        <PageCard sx={{ alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 800 }}>
            <SecondaryDarkText>404</SecondaryDarkText>
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            <SecondaryDarkText>Страницата не е намерена</SecondaryDarkText>
          </Typography>

          <Spacer gap={4} />

          <Typography variant="h4">
            <PrimaryDarkText>Какво търсите?</PrimaryDarkText>
          </Typography>
          <Stack direction="row" sx={{ alignSelf: 'stretch' }}>
            <Stack flex={1} alignItems="center">
              <Typography variant="h5">
                <PrimaryDarkText>За клиенти</PrimaryDarkText>
              </Typography>
              <List sx={{ gap: 1 }}>
                <ListItem>
                  <ListItemButton component={Link} href="/">
                    <ListItemText
                      primary="Начална страница"
                      secondary="Към началната страница"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} href="/services">
                    <ListItemText
                      primary="Услуги"
                      secondary="Обща информация за предлаганите услуги"
                    />
                  </ListItemButton>
                </ListItem>
                <List sx={{ pl: 3 }}>
                  <ListItem>
                    <ListItemButton component={Link} href="/services/trasirane">
                      <ListItemText
                        primary="Трасиране"
                        secondary="Информация за трасиране на имотни граници"
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton component={Link} href="/services/zasnemane">
                      <ListItemText
                        primary="Геодезическо заснемане"
                        secondary="Информация за геодезически заснемания и определяне на размери"
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      href="/services/stroitelstvo"
                    >
                      <ListItemText
                        primary="Строителство"
                        secondary="Обща информация за строителния процес"
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      href="/services/stroitelstvo/proektirane"
                    >
                      <ListItemText
                        primary="Проектиране на сгради"
                        secondary="Информация за пизготвяне на прокети по част Геодезия"
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      component={Link}
                      href="/services/stroitelstvo/podrujka"
                    >
                      <ListItemText
                        primary="Подръжка по време на строителство"
                        secondary="Информация за геодезическа подръжка на строитлени обекти"
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </List>
            </Stack>

            <Stack flex={1} alignItems="center">
              <Typography variant="h5">
                <PrimaryDarkText>За партньори</PrimaryDarkText>
              </Typography>
              <List>
                <ListItem>
                  <ListItemButton component={Link} href="/partners">
                    <ListItemText
                      primary="Обща информация"
                      secondary="Информация за партньорската ни програма"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} href="/partners">
                    <ListItemText
                      primary="Вписване в профила"
                      secondary="Вход към партньорския Ви профил"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} href="/partners/tasks">
                    <ListItemText
                      primary="Вашите задачи"
                      secondary="Към списък на всичките Ви задачи"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component={Link} href="/partners/profile">
                    <ListItemText
                      primary="Вашият профил"
                      secondary="Към настройки на потребителския Ви профил"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </PageCard>
      </PageLayout>
    </>
  );
}
