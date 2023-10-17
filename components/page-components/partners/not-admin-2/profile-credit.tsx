import { useState } from 'react';

import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  Box,
  Stack,
  ClickAwayListener,
  lighten,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import PaymentsIcon from '@mui/icons-material/Payments';

import { creditMovementReasonValues } from '../../../../data/money-movement-reasons';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import { bigIntToNum } from '../../../../utility/bigIntToNum';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import ProfileCard from './profile-card';
import SecondaryDarkText from '../../../common/display-modifiers/secondary-dark-text';
import { useQuery } from 'react-query';
import { sendRequest } from '../../../data-fetching/http-client';
import DataDisplay from '../../../data-fetching/data-display';
import { ServerError } from '../../../../model/server-error';

type Props = { partner: DetailedPartner; flex?: number };

const bg = new Intl.DateTimeFormat('bg');

const txtFromNum = (num: number) => {
  switch (num) {
    case 5:
      return 'пет';
    case 10:
      return 'десет';
    case 25:
      return 'двадесет и пет';
    case 50:
      return 'петдесет';

    default:
      return '';
  }
};

const ProfileCredit: React.FC<Props> = ({ partner, flex }) => {
  const [limit, setLimit] = useState<5 | 10 | 25 | 50>(5);
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(
      Number((event.target as HTMLInputElement).value) as 5 | 10 | 25 | 50
    );
    setShowFilter(false);
  };

  const ctrl = useQuery(
    ['partner', partner.id, 'credit-movement', limit],
    sendRequest(`/api/partners/${partner.id}/creditMovement`, {
      method: 'GET',
      query: { limit: limit.toString(), partnerId: partner.id.toString() },
      responseParser: (d: { movements: DetailedPartner['creditMovement'] }) =>
        d.movements,
    }),
    { initialData: partner.creditMovement }
  );

  return (
    <ProfileCard flex={flex} border="secondary">
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
        <PrimaryDarkText>Движения по сметка</PrimaryDarkText>
      </Typography>

      <Stack sx={{ alignSelf: 'center' }} alignItems="center">
        <LabelAndData
          label={
            <PaymentsIcon
              sx={{
                color: (theme) => theme.palette.secondary.A800,
                fontSize: '3.5rem',
              }}
            />
          }
        >
          <Tooltip title="Наличност">
            <Typography variant="h3">
              <SecondaryDarkText>
                {partner.creditBalance.toFixed(2)}лв.
              </SecondaryDarkText>
            </Typography>
          </Tooltip>
        </LabelAndData>
      </Stack>

      <Button onClick={() => setShowFilter(true)}>
        <SecondaryDarkText>Последните {txtFromNum(limit)}</SecondaryDarkText>
      </Button>
      {showFilter && (
        <ClickAwayListener onClickAway={() => setShowFilter(false)}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: (theme) => theme.zIndex.modal - 1,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: (theme) => theme.zIndex.modal - 1,

                backgroundColor: '#00000044',
                backdropFilter: 'blur(2px)',
              }}
              onClick={() => setShowFilter(false)}
            />
            <Box
              sx={{
                backgroundColor: (theme) =>
                  lighten(theme.palette.secondary.A50!, 0.6),
                p: 3,
                borderRadius: (theme) => theme.spacing(1),
                zIndex: (theme) => theme.zIndex.modal - 1,
              }}
            >
              <RadioGroup
                aria-labelledby="select-limit"
                defaultValue="5"
                name="limit-radio-group"
                value={limit}
                onChange={handleChange}
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value={5}
                  control={<Radio />}
                  label="Последните 5"
                />
                <FormControlLabel
                  value={10}
                  control={<Radio />}
                  label="Последните 10"
                />
                <FormControlLabel
                  value={25}
                  control={<Radio />}
                  label="Последните 25"
                />
                <FormControlLabel
                  value={50}
                  control={<Radio />}
                  label="Последните 50"
                />
              </RadioGroup>
            </Box>
          </Box>
        </ClickAwayListener>
      )}

      <DataDisplay
        control={ctrl}
        loadingComponent={<>Loading...</>}
        ErrorComponent={({ error }) => {
          const msg =
            error instanceof ServerError
              ? error.userMessage
              : 'Възникна грешка при зареждане на данните';
          return <>Грешка при зареждане на задачите: {msg}</>;
        }}
        ContentComponent={CreditList}
      />
    </ProfileCard>
  );
};

function CreditList({ data }: { data: DetailedPartner['creditMovement'] }) {
  return (
    <List
      sx={{
        overflow: 'auto',
        width: '100%',
        // border: 1,
        // borderColor: (theme) => theme.palette.primary.A600,
        // m: 1,
        flex: 1,
      }}
    >
      {data.map((m, i) => {
        const amount = Number(m.amount);
        return (
          <ListItem key={i}>
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                width: (theme) => theme.spacing(8),
                height: (theme) => theme.spacing(8),
                borderRadius: 1000,

                fontWeight: 800,
                color: (theme) =>
                  amount > 0
                    ? theme.palette.secondary.A800
                    : theme.palette.primary.A800,
                backgroundColor: (theme) =>
                  amount > 0
                    ? theme.palette.secondary.A100
                    : theme.palette.primary.A100,
              }}
            >{`${amount}лв`}</ListItemIcon>
            <ListItemText
              sx={{
                pl: 3,
              }}
              primary={
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: (theme) =>
                      amount > 0
                        ? theme.palette.secondary.A800
                        : theme.palette.primary.A800,
                  }}
                >
                  {
                    creditMovementReasonValues.find((c) => c.value === m.reason)
                      ?.partnerCaption
                  }
                </Typography>
              }
              secondary={
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 400,
                    color: (theme) =>
                      amount > 0
                        ? theme.palette.secondary.A500
                        : theme.palette.primary.A500,
                  }}
                >
                  {bg.format(new Date(bigIntToNum(m.createdAt)))}
                </Typography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default ProfileCredit;
