import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { isEmail } from '../../../utility/validation/isEmail';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = {
  clientId: number;
  invalidates: QueryKey | undefined;
  onClose: () => void;
};

type EmailForm = {
  email: string;
};

export const ClientsNewEmailForm: React.FC<Props> = ({
  clientId,
  invalidates,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  const { isLoading, mutate: addEmail } = useConfiguredMutation(
    `/api/clients/${clientId}/emails`,
    { method: 'POST' },
    invalidates,
    {
      alertOnSuccess: { message: 'Успешно добавен имейл' },
      onSuccess: onClose,
    }
  );

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">Добавяне на нов имейл</Typography>
      <TextField
        label="Имейл"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email', {
          validate: (val) => isEmail(val) || 'Въведете валиен Имейл',
        })}
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

export default ClientsNewEmailForm;
