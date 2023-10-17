import { Typography } from '@mui/material';
import { NewMessage } from '../../../../pages/api/messages/new';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';

type Props = { msg: NewMessage };

const ClientData: React.FC<Props> = ({ msg }) => {
  return (
    <>
      <Typography variant="h6">
        <PrimaryDarkText>Лични данни:</PrimaryDarkText>
      </Typography>

      <LabelAndData label="Име">{msg.name || 'Не е въведено име'}</LabelAndData>
      <LabelAndData label="Имейл">
        {msg.email || 'Не е въведен имейл'}
      </LabelAndData>
      <LabelAndData label="Телефон">{msg.phone}</LabelAndData>
      <LabelAndData label="Вайбър">
        {msg.hasViber ? 'Има' : 'Няма'}
      </LabelAndData>
    </>
  );
};

export default ClientData;
