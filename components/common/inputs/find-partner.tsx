import { Divider, InputAdornment, Stack, TextField } from '@mui/material';
import { ChangeEvent, useDeferredValue, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ID } from '../../../model/id.type';
import { GETClient } from '../../../pages/api/clients';
import { sendRequest } from '../../data-fetching/http-client';
import SearchIcon from '@mui/icons-material/Search';
import DataDisplay from '../../data-fetching/data-display';
import { ServerError } from '../../../model/server-error';
import ClientOverview from '../actor-overview-cards/client-overview';
import FilledCard from '../cards/filled-card';
import { ekatte } from '../../../data/ekatte';
import { GETPartner } from '../../../pages/api/partners';
import PartnerOverview from '../actor-overview-cards/partner-overview';

type Props = {
  value: ID | null;
  onChange: (id: ID | null) => void;
};

const FindPartner: React.FC<Props> = ({ value, onChange }) => {
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
    ['search-partners', defQuery],
    sendRequest('/api/partners', {
      method: 'GET',
      query: { search: defQuery, settlement: settlement?.ekatte || '' },
      responseParser: (d: { partners: GETPartner[] }) => d.partners,
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
        control={partnersCtrl}
        loadingComponent={<>Loading...</>}
        ErrorComponent={({ error }) => {
          const msg =
            error instanceof ServerError
              ? error.userMessage
              : 'Възникна грешка при зареждане на данните';
          return <>Грешка при зареждане на партньорите: {msg}</>;
        }}
        ContentComponent={({ data }) => {
          return (
            <>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {data.map((partner) => (
                  <FilledCard
                    key={partner.id}
                    onClick={() => onChange(partner.id)}
                  >
                    <PartnerOverview partner={partner} />
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

export default FindPartner;
