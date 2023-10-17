import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ServerError } from '../../../model/server-error';
import { NewMessage } from '../../../pages/api/messages/new';
import { bigIntToNum } from '../../../utility/bigIntToNum';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import PageCard from '../../layouts/page-card/page-card';
import PageLayout from '../../layouts/page-layout/page-layout';

type Props = {
  messages: NewMessage[];
  children: React.ReactNode;
};

const AdminMessagesLayout: React.FC<Props> = ({ messages = [], children }) => {
  const messagesCtrl = useQuery(
    ['admin', 'messages', 'new'],
    sendRequest('/api/messages/new', {
      method: 'GET',
      responseParser: (d: { messages: NewMessage[] }) => d.messages,
    }),
    { initialData: messages }
  );

  return (
    <PageLayout>
      <Grid container columnSpacing={2} sx={{ flex: 1, alignItems: 'stretch' }}>
        <Grid
          item
          lg={5}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <PageCard sx={{ flex: 1, overflow: 'auto' }}>
            <DataDisplay
              control={messagesCtrl}
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
                        component={Link}
                        href={`/admin/messages/${msg.id}`}
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
          {/* <PageCard sx={{ flex: 1 }}>
        {data.map((msg) => (
          <Box key={msg.id}>
            {msg.email}, {msg.phone}, {msg.name}
          </Box>
        ))}
      </PageCard> */}
        </Grid>

        <Grid item lg={7} sx={{ display: 'flex', flexDirection: 'column' }}>
          {children}
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default AdminMessagesLayout;
