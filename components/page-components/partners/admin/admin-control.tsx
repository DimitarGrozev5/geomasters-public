import { LoadingButton } from '@mui/lab';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { creditMovementReasonValues } from '../../../../data/money-movement-reasons';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import { bigIntToNum } from '../../../../utility/bigIntToNum';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import Confirm from '../../../common/inputs/confirm-button';
import EditableData from '../../../common/inputs/editable-fields/editable-data';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import AdminMoneyInput from './admin-money-input';

type Props = {
  partner: DetailedPartner;
};

const bg = new Intl.DateTimeFormat('bg');

const PartnerAdminControl: React.FC<Props> = ({ partner }) => {
  const { id, firmName, creditBalance, creditMovement, resetHash } = partner;

  // Delete partner
  const { isLoading, mutate: deleteClient } = useConfiguredMutation(
    `/api/partners/${id}`,
    { method: 'DELETE' },
    ['admin', 'partners'],
    {
      alertOnSuccess: {
        message:
          'Партньорът е маркиран за изтриване. За кратко време ще може да бъде възстановен.',
      },
    }
  );

  return (
    <>
      <Typography variant="h6">
        <PrimaryDarkText>Движения по сметка</PrimaryDarkText>
      </Typography>

      <LabelAndData label="Текущ баланс">
        {creditBalance.toString()}
        {/* <EditableData
          data={creditBalance.toString()}
          url={`/api/partners/${id}/creditBalance`}
          invalidates={['admin', 'partners', id]}
          successMessage="Парите по сметка са променени"
          validation={{
            validate: (val) => !Number.isNaN(val) || 'Моля въведете число',
          }}
        /> */}
      </LabelAndData>

      <AdminMoneyInput
        partner={partner}
        invalidates={['admin', 'partners', id]}
      />

      <List
        sx={{
          maxHeight: '30vh',
          overflow: 'auto',
          width: '100%',
          border: 1,
          borderColor: (theme) => theme.palette.primary.A600,
          m: 1,
        }}
      >
        {creditMovement.map((m, i) => (
          <ListItem key={i}>
            <ListItemIcon>{`${m.amount}лв`}</ListItemIcon>
            <ListItemText
              primary={
                creditMovementReasonValues.find((c) => c.value === m.reason)
                  ?.caption
              }
              secondary={`${bg.format(
                new Date(bigIntToNum(m.createdAt))
              )}, от ${
                m.whoChanged === 'ADMIN' ? 'администратор' : 'партньор'
              }`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="body1">
        <PrimaryDarkText>Линк за нулиране на парола</PrimaryDarkText>
      </Typography>
      <Typography variant="body2">
        /partners/{id}/resetPassword?c={encodeURIComponent(resetHash)}
      </Typography>

      <Confirm
        onClick={() => deleteClient(undefined)}
        hardWord={firmName}
        label="изтриване на патньор"
      >
        <Tooltip title="Изисква потвърждение">
          <LoadingButton
            loading={isLoading}
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            Изтрий партньор
          </LoadingButton>
        </Tooltip>
      </Confirm>
    </>
  );
};

export default PartnerAdminControl;
