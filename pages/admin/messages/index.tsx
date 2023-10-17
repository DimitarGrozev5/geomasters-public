import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';
import DataDisplay from '../../../components/data-fetching/data-display';
import { sendRequest } from '../../../components/data-fetching/http-client';
import PageCard from '../../../components/layouts/page-card/page-card';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import MessageOverview from '../../../components/page-components/admin-messages/message-overview';
import { prisma } from '../../../config/db';
import { useAdminGuard } from '../../../hooks/useAuth';
import { ServerError } from '../../../model/server-error';
import { bigIntToNum } from '../../../utility/bigIntToNum';
import { NewMessage } from '../../api/messages/new';

type Props = {
  newMessages: NewMessage[];
  oldMessages: NewMessage[];
};

export default function MessagesPage({
  newMessages = [],
  oldMessages = [],
}: Props) {
  useAdminGuard();

  const newMessagesCtrl = useQuery(
    ['admin', 'messages', 'new'],
    sendRequest('/api/messages/new', {
      method: 'GET',
      responseParser: (d: { messages: NewMessage[] }) => d.messages,
    }),
    { initialData: newMessages }
  );
  const { data: newMsg } = newMessagesCtrl;

  const oldMessagesCtrl = useQuery(
    ['admin', 'messages', 'old'],
    sendRequest('/api/messages/old', {
      method: 'GET',
      responseParser: (d: { messages: NewMessage[] }) => d.messages,
    }),
    { initialData: oldMessages }
  );
  const { data: oldMsg } = oldMessagesCtrl;

  // Selected new message
  const [selectedMsgId, setSelectedMsgId] = useState<null | number>(null);
  const selectedMessage =
    newMsg?.find((msg) => msg.id === selectedMsgId) ||
    oldMsg?.find((msg) => msg.id === selectedMsgId);

  const selectMsgHandler = (id: number) => () => {
    setSelectedMsgId(id);
  };

  return (
    <>
      <Head>
        <title>Съобщения</title>
      </Head>
      <PageLayout>
        <Grid
          container
          columnSpacing={2}
          sx={{ flex: 1, alignItems: 'stretch' }}
        >
          <Grid
            item
            lg={5}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <PageCard sx={{ flex: 1, overflow: 'auto' }}>
              <Typography variant="h5">
                <PrimaryDarkText>Нови съобщения</PrimaryDarkText>
              </Typography>
              <DataDisplay
                control={newMessagesCtrl}
                loadingComponent={<>Loading...</>}
                ErrorComponent={({ error }) => {
                  const msg =
                    error instanceof ServerError
                      ? error.userMessage
                      : 'Възникна грешка при зареждане на данните';
                  return <>Грешка при зареждане на съобщенията: {msg}</>;
                }}
                ContentComponent={({ data }) => (
                  <List>
                    {data.map((msg) => (
                      <ListItem key={msg.id}>
                        <ListItemButton
                          onClick={selectMsgHandler(msg.id)}
                          sx={
                            selectedMsgId === msg.id
                              ? {
                                  backgroundColor: (theme) =>
                                    theme.palette.primary.A50,
                                  border: (theme) =>
                                    `1px solid ${theme.palette.primary.A700}`,
                                  borderRadius: (theme) => theme.spacing(1),
                                }
                              : {}
                          }
                        >
                          <ListItemText
                            primary={`${msg.name}, ${msg.email}, ${msg.phone}`}
                            secondary={bigIntToNum(msg.createdAt)}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              />
            </PageCard>
            <PageCard sx={{ flex: 1, overflow: 'auto' }}>
              <Typography variant="h5">
                <PrimaryDarkText>Обработени съобщения</PrimaryDarkText>
              </Typography>
              <DataDisplay
                control={oldMessagesCtrl}
                loadingComponent={<>Loading...</>}
                ErrorComponent={({ error }) => {
                  const msg =
                    error instanceof ServerError
                      ? error.userMessage
                      : 'Възникна грешка при зареждане на данните';
                  return <>Грешка при зареждане на съобщенията: {msg}</>;
                }}
                ContentComponent={({ data }) => (
                  <List>
                    {data.map((msg) => (
                      <ListItem key={msg.id}>
                        <ListItemButton
                          onClick={selectMsgHandler(msg.id)}
                          sx={
                            selectedMsgId === msg.id
                              ? {
                                  backgroundColor: (theme) =>
                                    theme.palette.primary.A50,
                                  border: (theme) =>
                                    `1px solid ${theme.palette.primary.A700}`,
                                  borderRadius: (theme) => theme.spacing(1),
                                }
                              : {}
                          }
                        >
                          <ListItemText
                            primary={`${msg.name}, ${msg.email}, ${msg.phone}`}
                            secondary={bigIntToNum(msg.createdAt)}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              />
            </PageCard>
          </Grid>

          <Grid item lg={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <PageCard sx={{ flex: 1 }}>
              {!!selectedMsgId && selectedMessage ? (
                <MessageOverview msg={selectedMessage} />
              ) : (
                <Typography variant="h5">
                  Изберете съобщение или клиент
                </Typography>
              )}
            </PageCard>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });
//   if (!session || session.user?.image !== 'admin') {
//     return {
//       redirect: {
//         destination: '/partners',
//         permanent: false,
//       },
//     };
//   }

//   // Get All new Messages
//   const newMessagesPromise = prisma.message.findMany({
//     include: { ownerClient: { include: { Email: true, Phone: true } } },
//     where: { administraded: false },
//   });
//   const oldMessagesPromise = prisma.message.findMany({
//     include: { ownerClient: { include: { Email: true, Phone: true } } },
//     where: { administraded: true },
//   });

//   const [newMessages, oldMessages] = await Promise.all([
//     newMessagesPromise,
//     oldMessagesPromise,
//   ]);

//   return {
//     props: { newMessages, oldMessages },
//   };
// };
