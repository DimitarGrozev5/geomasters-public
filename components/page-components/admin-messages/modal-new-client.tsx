import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Fade,
  FormControlLabel,
  FormGroup,
  Paper,
  Portal,
  Switch,
  TextField,
  Typography,
  alpha,
  Button,
  Box,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = {
  show: boolean;
  onClose: () => void;
  invalidates?: QueryKey;
  name?: string;
  email?: string;
  phone?: string;
  hasViber?: boolean;
};

type NewClientForm = {
  name: string;
  email: string;
  phone: string;
  hasViber: boolean;
};

const NewClientModal: React.FC<Props> = ({
  show,
  onClose,
  invalidates,
  name = '',
  email = '',
  phone = '',
  hasViber = false,
}) => {
  const { register, handleSubmit, reset } = useForm<NewClientForm>({
    mode: 'onChange',
    defaultValues: {
      name,
      email,
      phone,
      hasViber,
    },
  });
  useEffect(() => {
    reset({ name, email, phone, hasViber });
  }, [email, hasViber, name, phone, reset, show]);

  const { isLoading, mutate: createNewUser } = useConfiguredMutation(
    '/api/clients',
    { method: 'POST' },
    invalidates,
    {
      onSuccess: onClose,
      alertOnSuccess: { message: 'Създаден е нов клиентски профил' },
    }
  );

  return (
    <Portal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar + 10 }}
        open={show}
        onClick={onClose}
      />
      <Fade in={show}>
        <Paper
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: (theme) => theme.zIndex.appBar + 10,
            transform: 'translate(-50%, -50%)',
            width: { lg: '70vw', xl: '50vw' },
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormGroup /* onSubmit={handleSubmit(onSubmit)} */ sx={{ gap: 4 }}>
            <Typography variant="h5">Добавяне на клиент</Typography>

            <TextField label="Име" {...register('name')} />
            <TextField label="Имейл" {...register('email')} />
            <TextField label="Телефон" {...register('phone')} />

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
                onClick={handleSubmit((data) => createNewUser(data))}
              >
                Добави
              </LoadingButton>
            </Box>
          </FormGroup>
        </Paper>
      </Fade>
    </Portal>
  );
};

export default NewClientModal;
