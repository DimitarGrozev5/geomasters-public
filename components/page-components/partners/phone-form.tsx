import { LoadingButton } from '@mui/lab';
import {
  alpha,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { isEmail } from '../../../utility/validation/isEmail';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = {
  partnerId: number;
  invalidates: QueryKey | undefined;
  onClose: () => void;
};

type EmailForm = {
  phone: string;
  hasViber: boolean;
};

export const PartnersNewPhoneForm: React.FC<Props> = ({
  partnerId,
  invalidates,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    mode: 'onChange',
    defaultValues: { phone: '', hasViber: false },
  });

  const { isLoading, mutate: addEmail } = useConfiguredMutation(
    `/api/partners/${partnerId}/firmPhones`,
    { method: 'POST' },
    invalidates,
    {
      alertOnSuccess: { message: 'Успешно добавен телефон' },
      onSuccess: onClose,
    }
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h6">Добавяне на нов телефон</Typography>
      <TextField
        label="Телефон"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register('phone')}
      />
      <FormControlLabel
        control={
          <Switch
            sx={{
              '&.checked': {
                color: (theme) => theme.palette.viber.main,
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: (theme) => theme.palette.viber.main,
                '&:hover': {
                  backgroundColor: (theme) =>
                    alpha(
                      theme.palette.viber.main,
                      theme.palette.action.hoverOpacity
                    ),
                },
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: (theme) => theme.palette.viber.main,
              },
            }}
          />
        }
        label={'Има Viber'}
        {...register('hasViber')}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={onClose}>Отказ</Button>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit((data) => addEmail(data))}
        >
          Добавяне
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default PartnersNewPhoneForm;
