import { Typography } from '@mui/material';
import { ekatte, oblasti } from '../../../../data/ekatte';
import { NewMessage } from '../../../../pages/api/messages/new';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';

type Props = { msg: NewMessage };

const ClientDescription: React.FC<Props> = ({ msg }) => {
  const settlement = ekatte.find((e) => e.ekatte === msg.ekatte);
  const oblast = oblasti.find((o) => o.id === settlement?.oblast);
  return (
    <>
      <Typography variant="h6">
        <PrimaryDarkText>Данни от съобщението:</PrimaryDarkText>
      </Typography>
      <LabelAndData label="Населено място" labelWidth={20}>
        {settlement?.label}, обл. {oblast?.label}, {msg.ekatte}
      </LabelAndData>
      <LabelAndData label="Обяснения" labelWidth={20}>
        {msg.problemDescription}
      </LabelAndData>
    </>
  );
};

export default ClientDescription;
