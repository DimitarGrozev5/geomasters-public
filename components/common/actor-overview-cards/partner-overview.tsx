import { Box, Paper, Popover, Popper, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { ID } from '../../../model/id.type';
import { ServerError } from '../../../model/server-error';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import PrimaryDarkText from '../display-modifiers/primary-dark-text';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMemo, useState } from 'react';
import { DetailedPartner } from '../../../pages/api/partners/[partnerId]';
import { ekatte, oblasti } from '../../../data/ekatte';

type SelectedPartner = Pick<
  DetailedPartner,
  'id' | 'firmName' | 'firmEmails' | 'firmPhones' | 'firmEKATTE'
>;

type Props =
  | {
      partner?: never;
      partnerId: ID;
    }
  | {
      partner: SelectedPartner;
      partnerId?: never;
    };

const PartnerOverview: React.FC<Props> = ({ partner, partnerId }) => {
  const id = partnerId ?? partner.id;
  const partnerCtrl = useQuery(
    ['partner-overview', id],
    sendRequest(`/api/partners/${id}`, {
      method: 'GET',
      responseParser: (d: { partner: SelectedPartner }) => d.partner,
    }),
    { initialData: partner }
  );

  return (
    <DataDisplay
      control={partnerCtrl}
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

const DisplayComponent = ({ data }: { data: SelectedPartner }) => {
  const [emailRef, setEmailRef] = useState<null | HTMLElement>(null);
  const handleShowEmails = (event: React.MouseEvent<HTMLElement>) => {
    setEmailRef(emailRef ? null : event.currentTarget);
  };
  const [phoneRef, setPhoneRef] = useState<null | HTMLElement>(null);
  const handleShowPhones = (event: React.MouseEvent<HTMLElement>) => {
    setPhoneRef(phoneRef ? null : event.currentTarget);
  };
  const [ekatteRef, setEkatteRef] = useState<null | HTMLElement>(null);
  const handleShowEkatte = (event: React.MouseEvent<HTMLElement>) => {
    setEkatteRef(ekatteRef ? null : event.currentTarget);
  };

  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === data.firmEKATTE),
    [data.firmEKATTE]
  );

  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  return (
    <>
      <Stack>
        <Typography variant="body1">
          <PrimaryDarkText>{data.firmName}</PrimaryDarkText>
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {data.firmEmails[0].email} (+{data.firmEmails.length - 1} други){' '}
          {data.firmEmails.length > 1 && (
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
              {data.firmEmails.slice(1).map((e) => (
                <Typography variant="body2" key={e.id}>
                  {e.email}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Popper>

        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {data.firmPhones[0].phone} (+{data.firmPhones.length - 1} други)
          {data.firmPhones.length > 1 && (
            <Box
              onMouseEnter={handleShowPhones}
              onMouseLeave={() => setPhoneRef(null)}
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
          open={!!phoneRef}
          anchorEl={phoneRef}
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
              {data.firmPhones.slice(1).map((p) => (
                <Typography variant="body2" key={p.id}>
                  {p.phone}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Popper>

        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Намира се в {settlement?.label}{' '}
          <Box
            onMouseEnter={handleShowEkatte}
            onMouseLeave={() => setEkatteRef(null)}
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
        </Typography>
        <Popper
          open={!!ekatteRef}
          anchorEl={ekatteRef}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 60 }}
        >
          <Paper
            sx={{
              p: 1,
              border: `1px solid grey`,
              borderColor: (theme) => theme.palette.primary.A900,
            }}
          >
            <Typography variant="body2">
              {settlement?.label}, обл. {oblast?.label}, {data.firmEKATTE}
            </Typography>
          </Paper>
        </Popper>
      </Stack>
    </>
  );
};

export default PartnerOverview;
