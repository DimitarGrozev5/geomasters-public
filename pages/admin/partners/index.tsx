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
import { ChangeEvent, useDeferredValue, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';
import DataDisplay from '../../../components/data-fetching/data-display';
import { sendRequest } from '../../../components/data-fetching/http-client';
import PageCard from '../../../components/layouts/page-card/page-card';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import { ServerError } from '../../../model/server-error';
import NewPartnerModal from '../../../components/page-components/partners/modal-new-client';
import { ekatte } from '../../../data/ekatte';
import { GETPartner } from '../../api/partners';
import PartnerAdminOverview from '../../../components/page-components/partners/partner-overview';
import { useAdminGuard } from '../../../hooks/useAuth';
import Head from 'next/head';

type Props = {
  // clients: GETClient[];
};

export default function PartnersPage({}: Props) {
  useAdminGuard();

  const [searchQuery, setSearchQuery] = useState('');
  const defQuery = useDeferredValue(searchQuery);
  const changeSearchHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const settlement = useMemo(
    () =>
      ekatte.find(
        (e) =>
          !!defQuery &&
          e.label.toLowerCase().search(defQuery.toLowerCase()) >= 0
      ),
    [defQuery]
  );

  const partnersCtrl = useQuery(
    ['admin', 'partners', defQuery],
    sendRequest('/api/partners', {
      method: 'GET',
      query: { search: defQuery, settlement: settlement?.ekatte || '' },
      responseParser: (d: { partners: GETPartner[] }) => d.partners,
    })
    // { initialData: clients }
  );

  const [selectedPartnerId, setSelectedPartnerId] = useState<null | number>(
    null
  );
  // const selectedMessage =
  //   newMsg?.find((msg) => msg.id === selectedClientId) ||
  //   oldMsg?.find((msg) => msg.id === selectedClientId);

  const selectPartnerHandler = (id: number) => () => {
    setSelectedPartnerId(id);
  };

  const [showModal__NewPartner, setShowModal__NewPartner] = useState(false);

  return (
    <>
      <Head>
        <title>Партньори</title>
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
                <PrimaryDarkText>Партньори</PrimaryDarkText>
              </Typography>

              <Box>
                <Button onClick={() => setShowModal__NewPartner(true)}>
                  Създай нов партньор
                </Button>
                <NewPartnerModal
                  show={showModal__NewPartner}
                  onClose={() => setShowModal__NewPartner(false)}
                  invalidates={['admin', 'partners']}
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
                control={partnersCtrl}
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
                        {data.map((partner) => (
                          <ListItem key={partner.id}>
                            <ListItemButton
                              onClick={selectPartnerHandler(partner.id)}
                              sx={
                                selectedPartnerId === partner.id
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
                                primary={`${partner.firmName}`}
                                secondary={
                                  <>
                                    {partner.firmEmails[0].email} (+
                                    {partner.firmEmails.length - 1} други)
                                    <br />
                                    {partner.firmPhones[0].phone} (+
                                    {partner.firmPhones.length - 1} други)
                                    <br />
                                    Намира се в{' '}
                                    {
                                      ekatte.find(
                                        (e) => e.ekatte === partner.firmEKATTE
                                      )?.label
                                    }
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
              {selectedPartnerId === null ? (
                <Typography variant="h5">Изберете партньор</Typography>
              ) : (
                <PartnerAdminOverview partnerId={selectedPartnerId} />
              )}
            </PageCard>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
