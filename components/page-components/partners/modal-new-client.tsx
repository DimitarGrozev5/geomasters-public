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
import { Controller, useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { POSTNewPartner } from '../../../pages/api/partners';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import AutocompleteElements from '../../common/inputs/message-us-inputs/select-location/autocpmplete-elements';
import { Stack } from '@mui/system';

type Props = {
  show: boolean;
  onClose: () => void;
  invalidates?: QueryKey;
};

type NewPartnerForm = POSTNewPartner;

const NewPartnerModal: React.FC<Props> = ({ show, onClose, invalidates }) => {
  const { register, handleSubmit, control } = useForm<NewPartnerForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      phone: '',
      hasViber: false,
      firmName: '',
      firmAdress: '',
      firmEkatte: null,
    },
  });

  const { isLoading, mutate: createNewUser } = useConfiguredMutation(
    '/api/partners',
    { method: 'POST' },
    invalidates,
    {
      onSuccess: onClose,
      alertOnSuccess: { message: 'Създаден е нов партньорски профил' },
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
          <FormGroup sx={{ gap: 4 }}>
            <Typography variant="h5">Добавяне на Партньор</Typography>

            <TextField label="Име на Фирма" {...register('firmName')} />
            <TextField label="Адрес" {...register('firmAdress')} />
            <Stack
              sx={{ p: 1, border: '1px solid black', borderColor: 'divider' }}
              spacing={2}
            >
              <Controller
                name="firmEkatte"
                control={control}
                rules={{
                  validate: (value) => {
                    if (value === null) return 'Моля изберете област';
                    if (typeof value === 'string')
                      return 'Моля изберете населено място';
                    return true;
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <AutocompleteElements
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error}
                    oblastLabel="Област"
                    oblastErrorMsg="Моля изберете област"
                    settlementLabel="Населено място"
                    settlementErrorMsg="Моля изберете населено място"
                  />
                )}
              />
            </Stack>

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

export default NewPartnerModal;
