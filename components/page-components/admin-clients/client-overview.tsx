import { Box, Tab, Tabs } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ServerError } from '../../../model/server-error';
import { DetailedClient } from '../../../pages/api/clients/[clientId]';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import ClientMessages from './client-messages';
import ClientProfile from './client-profile';

type Props = { clientId: number };

const ClientOverview: React.FC<Props> = ({ clientId }) => {
  const clientCtrl = useQuery(
    ['admin', 'clients', clientId],
    sendRequest(`/api/clients/${clientId}`, {
      method: 'GET',
      responseParser: (d: { client: DetailedClient }) => d.client,
    })
  );

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <DataDisplay
        control={clientCtrl}
        loadingComponent={<>Loading...</>}
        ErrorComponent={({ error }) => {
          const msg =
            error instanceof ServerError
              ? error.userMessage
              : 'Възникна грешка при зареждане на данните';
          return <>Грешка при зареждане на клиентските данни: {msg}</>;
        }}
        ContentComponent={({ data }) => (
          <Stack
            sx={{
              width: '100%',
              flex: 1,
              alignItems: 'flex-start',
            }}
          >
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Профил" />
              <Tab label="Съобщения" />
            </Tabs>
            {tabValue === 0 && (
              <ClientProfile
                clientId={data.id}
                name={data.name}
                emails={data.Email}
                phones={data.Phone}
              />
            )}
            {tabValue === 1 && (
              <ClientMessages
                clientId={data.id}
                name={data.name}
                messages={data.CommunicationEvent}
              />
            )}
          </Stack>
        )}
      />
    </>
  );
};

export default ClientOverview;
