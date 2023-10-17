import { Button, Stack, Typography } from '@mui/material';
import Span from '../../../data-presentation/span';
import EmailInput from '../email-input/email-input';
import NameInput from '../name-input/name-input';
import PhoneInput from '../phone-input.tsx/phone-input';

type Props = {};

const MobileFirstStep: React.FC<Props> = () => {
  return (
    <Stack gap={1}>
      <Typography variant="body1">
        Моля попълнете вашите данни, за да можем да се свържем, след като
        разгледаме проблема Ви
      </Typography>

      <NameInput label="Име" />

      <EmailInput label="Имейл" invalidErrMsg="Моля въведете валиден Имейл" />

      <PhoneInput
        phonelabel="Телефон"
        viberlabel={
          <>
            Имам{' '}
            <Span sx={{ color: (theme) => theme.palette.viber.main }}>
              Viber
            </Span>{' '}
            на този телефон
          </>
        }
        invalidWarningMsg="Проверете дали телефонът Ви е верен"
        emptyErrorMessage="Моля въведете телефон за контакт"
      />
    </Stack>
  );
};

export default MobileFirstStep;
