import { Box, Paper, Popper, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { ID } from '../../../model/id.type';
import { ServerError } from '../../../model/server-error';
import { GETClient } from '../../../pages/api/clients';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import PrimaryDarkText from '../display-modifiers/primary-dark-text';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';

type Props =
  | {
      client?: never;
      clientId: ID;
    }
  | {
      client: GETClient;
      clientId?: never;
    };

const ClientOverview: React.FC<Props> = ({ client, clientId }) => {
  const id = clientId ?? client.id;
  const clientCtrl = useQuery(
    ['client-overview', id],
    sendRequest(`/api/clients/${id}`, {
      method: 'GET',
      responseParser: (d: { client: GETClient }) => d.client,
    }),
    { initialData: client }
  );

  return (
    <DataDisplay
      control={clientCtrl}
      loadingComponent={<>Loading...</>}
      ErrorComponent={({ error }) => {
        const msg =
          error instanceof ServerError
            ? error.userMessage
            : 'Възникна грешка при зареждане на данните';
        return <>Грешка при зареждане на данните: {msg}</>;
      }}
      ContentComponent={DisplayComponent}
    />
  );
};

const DisplayComponent = ({ data }: { data: GETClient }) => {
  const [emailRef, setEmailRef] = useState<null | HTMLElement>(null);
  const handleShowEmails = (event: React.MouseEvent<HTMLElement>) => {
    setEmailRef(emailRef ? null : event.currentTarget);
  };
  const [phoneRef, setPhoneRef] = useState<null | HTMLElement>(null);
  const handleShowPhones = (event: React.MouseEvent<HTMLElement>) => {
    setPhoneRef(phoneRef ? null : event.currentTarget);
  };

  return (
    <>
      <Stack>
        <Typography variant="body1">
          <PrimaryDarkText>{data.name}</PrimaryDarkText>
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {data.Email.length > 0 ? data.Email[0].email : 'Няма имейл'} (+
          {data.Email.length - 1} други){' '}
          {data.Email.length > 1 && (
            <Box
              onMouseEnter={handleShowEmails}
              onMouseLeave={() => setEmailRef(null)}
              component="span"
              sx={{ display: 'inline-flex' }}
            >
              <InfoOutlinedIcon
                sx={{
                  fontSize: (theme) =>
                    `calc(${theme.typography.body2.fontSize} * 1.2)`,
                  color: (theme) => theme.palette.primary.A500,
                }}
              />
            </Box>
          )}
        </Typography>
        <Popper
          open={!!emailRef}
          anchorEl={emailRef}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 60 }}
        >
          <Paper
            sx={{
              p: 1,
              border: `1px solid grey`,
              borderColor: (theme) => theme.palette.primary.A900,
            }}
          >
            <Stack>
              {data.Email.slice(1).map((e) => (
                <Typography variant="body2" key={e.id}>
                  {e.email}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Popper>
        <Typography variant="body2">
          {data.Phone[0].phone} (+{data.Phone.length - 1} други)
          {data.Phone.length > 1 && (
            <Box
              onMouseEnter={handleShowPhones}
              onMouseLeave={() => setPhoneRef(null)}
              component="span"
              sx={{ display: 'inline-flex' }}
            >
              <InfoOutlinedIcon
                sx={{
                  fontSize: (theme) => theme.typography.body2.fontSize,
                  color: (theme) => theme.palette.primary.A500,
                }}
              />
            </Box>
          )}
        </Typography>
        <Popper open={!!phoneRef} anchorEl={phoneRef}>
          <Paper
            sx={{
              p: 1,
              border: `1px solid grey`,
              borderColor: (theme) => theme.palette.primary.A900,
            }}
          >
            <Stack>
              {data.Phone.slice(1).map((p) => (
                <Typography variant="body2" key={p.id}>
                  {p.phone}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Popper>
      </Stack>
    </>
  );
};

export default ClientOverview;
