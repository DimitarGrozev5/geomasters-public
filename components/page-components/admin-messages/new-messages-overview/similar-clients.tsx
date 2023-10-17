import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { GETClient } from '../../../../pages/api/clients';
import { NewMessage } from '../../../../pages/api/messages/new';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import DataDisplay from '../../../data-fetching/data-display';
import { sendRequest } from '../../../data-fetching/http-client';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import NewClientModal from '../modal-new-client';
import SimilarClientCard from './similar-clients-card';

type Props = { msg: NewMessage };

const SimilarClients: React.FC<Props> = ({ msg }) => {
  const similarCtrl = useQuery(
    ['admin', 'messages', 'new', msg.id, 'similar'],
    sendRequest('/api/clients', {
      method: 'GET',
      query: {
        email: msg.email,
        phone: msg.phone,
      },
      responseParser: (d: { clients: GETClient[] }) => d.clients,
    })
  );

  const [showModal__NewClient, setShowModal__NewClient] = useState(false);

  const [selectedClient, setSelectedClient] = useState<null | number>(null);

  const { mutate } = useConfiguredMutation(
    `/api/messages/${msg.id}/ownerClient`,
    { method: 'POST' },
    ['admin', 'messages', 'new'],
    {}
  );
  return (
    <>
      <Typography variant="h6">Клиенти със съвпадащи данни:</Typography>
      <DataDisplay
        control={similarCtrl}
        loadingComponent={<CircularProgress />}
        ErrorComponent={({ error }) => (
          <>
            <Typography variant="body1">
              <PrimaryDarkText>
                Грешка при зареждане на данните:
              </PrimaryDarkText>{' '}
              {(error as any).userMessage ?? ''}
            </Typography>
          </>
        )}
        ContentComponent={({ data }) => (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {data.map((client) => (
              <SimilarClientCard
                key={client.id}
                client={client}
                selectedClient={selectedClient}
                onSelect={() => setSelectedClient(client.id)}
                onClose={() => setSelectedClient(null)}
                onConfirmSelection={() => mutate({ id: client.id })}
              />
            ))}
            {data.length === 0 && (
              <Typography variant="subtitle1">Не са намерени</Typography>
            )}
          </Stack>
        )}
      />
      <Box>
        <Button onClick={() => setShowModal__NewClient(true)}>
          Създай нов клиент
        </Button>
        <NewClientModal
          show={showModal__NewClient}
          onClose={() => setShowModal__NewClient(false)}
          invalidates={['admin', 'messages', 'new', msg.id, 'similar']}
          name={msg.name}
          email={msg.email}
          phone={msg.phone}
          hasViber={msg.hasViber}
        />
      </Box>
    </>
  );
};

export default SimilarClients;
