import {
  Box,
  Button,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';
import DataDisplay from '../../../components/data-fetching/data-display';
import { sendRequest } from '../../../components/data-fetching/http-client';
import PageCard from '../../../components/layouts/page-card/page-card';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import ClientOverview from '../../../components/page-components/admin-clients/client-overview';
import { ServerError } from '../../../model/server-error';
import { GETClient } from '../../api/clients';
import NewClientModal from '../../../components/page-components/admin-messages/modal-new-client';
import { useAdminGuard } from '../../../hooks/useAuth';
import Head from 'next/head';

type Props = {
  clients: GETClient[];
};

export default function ClientsPage({ clients = [] }: Props) {
  useAdminGuard();

  const [searchQuery, setSearchQuery] = useState('');
  const changeSearchHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const clientsCtrl = useQuery(
    ['admin', 'clients', searchQuery],
    sendRequest('/api/clients', {
      method: 'GET',
      query: { search: searchQuery },
      responseParser: (d: { clients: GETClient[] }) => d.clients,
    }),
    { initialData: clients }
  );

  const [selectedClientId, setSelectedClientId] = useState<null | number>(null);
  // const selectedMessage =
  //   newMsg?.find((msg) => msg.id === selectedClientId) ||
  //   oldMsg?.find((msg) => msg.id === selectedClientId);

  const selectClientHandler = (id: number) => () => {
    setSelectedClientId(id);
  };

  const [showModal__NewClient, setShowModal__NewClient] = useState(false);

  return (
    <>
      <Head>
        <title>Клиенти</title>
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
                <PrimaryDarkText>Клиенти</PrimaryDarkText>
              </Typography>

              <Box>
                <Button onClick={() => setShowModal__NewClient(true)}>
                  Създай нов клиент
                </Button>
                <NewClientModal
                  show={showModal__NewClient}
                  onClose={() => setShowModal__NewClient(false)}
                  invalidates={['admin', 'clients']}
                />
              </Box>

              <TextField
                value={searchQuery}
                onChange={changeSearchHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <DataDisplay
                control={clientsCtrl}
                loadingComponent={<>Loading...</>}
                ErrorComponent={({ error }) => {
                  const msg =
                    error instanceof ServerError
                      ? error.userMessage
                      : 'Възникна грешка при зареждане на данните';
                  return <>Грешка при зареждане на клиентите: {msg}</>;
                }}
                ContentComponent={({ data }) => {
                  return (
                    <>
                      <List>
                        {data.map((client) => (
                          <ListItem key={client.id}>
                            <ListItemButton
                              onClick={selectClientHandler(client.id)}
                              sx={
                                selectedClientId === client.id
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
                                primary={`${client.name}`}
                                secondary={
                                  <>
                                    {client.Email && client.Email.length > 0
                                      ? `${client.Email[0].email} (+
                                    ${client.Email.length - 1} други)`
                                      : 'Не са въведени имейли'}
                                    <br />
                                    {client.Phone[0].phone} (+
                                    {client.Phone.length - 1} други)
                                  </>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </>
                  );
                }}
              />
            </PageCard>
          </Grid>

          <Grid item lg={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <PageCard sx={{ flex: 1 }}>
              {selectedClientId === null ? (
                <Typography variant="h5">Изберете клиент</Typography>
              ) : (
                <ClientOverview clientId={selectedClientId} />
              )}
            </PageCard>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
