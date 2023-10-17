import { Divider, InputAdornment, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { ID } from '../../../model/id.type';
import { GETClient } from '../../../pages/api/clients';
import { sendRequest } from '../../data-fetching/http-client';
import SearchIcon from '@mui/icons-material/Search';
import DataDisplay from '../../data-fetching/data-display';
import { ServerError } from '../../../model/server-error';
import ClientOverview from '../actor-overview-cards/client-overview';
import FilledCard from '../cards/filled-card';

type Props = {
  value: ID | null;
  onChange: (id: ID | null) => void;
};

const FindClient: React.FC<Props> = ({ value, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const changeSearchHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const clientsCtrl = useQuery(
    ['search-clients', searchQuery],
    sendRequest('/api/clients', {
      method: 'GET',
      query: { search: searchQuery },
      responseParser: (d: { clients: GETClient[] }) => d.clients,
    })
  );
  return (
    <>
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
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {data.map((client) => (
                  <FilledCard
                    key={client.id}
                    onClick={() => onChange(client.id)}
                  >
                    <ClientOverview client={client} />
                  </FilledCard>
                ))}
              </Stack>
            </>
          );
        }}
      />
    </>
  );
};

export default FindClient;
