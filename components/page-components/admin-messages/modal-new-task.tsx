import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Fade,
  FormGroup,
  Paper,
  Portal,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { TaskBasicCategory } from '@prisma/client';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { ekatte } from '../../../data/ekatte';
import { NewMessage } from '../../../pages/api/messages/new';
import LabelAndData from '../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import { EkatteFormType } from '../../common/inputs/message-us-inputs/form-data-type';
import SelectLocation from '../../common/inputs/message-us-inputs/select-location/select-location';
import TaskBasicCategorySelect from '../../common/inputs/task-basic-category-select';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = {
  show: boolean;
  onClose: () => void;
  invalidates: QueryKey | undefined;
  messageId?: number;
  client?: NonNullable<NewMessage['ownerClient']>;
  ekatteString?: string;
  userDescription?: string;
};

type NewTaskForm = {
  description: string;
  ekatte: EkatteFormType;
  forClientId?: number;
  messageId?: number;
  category: TaskBasicCategory;
};

const NewTaskModal: React.FC<Props> = ({
  show,
  onClose,
  invalidates,
  messageId,
  client,
  ekatteString = '',
  userDescription = '',
}) => {
  const methods = useForm<NewTaskForm>({
    mode: 'onChange',
    defaultValues: {
      description: userDescription,
      ekatte: ekatteString
        ? ekatte.find((e) => e.ekatte === ekatteString)!
        : null,
      forClientId: client?.id,
      messageId,
      category: TaskBasicCategory.UNSET,
    },
  });
  const { register, handleSubmit, reset, control } = methods;
  useEffect(() => {
    reset({
      description: userDescription,
      ekatte: ekatteString
        ? ekatte.find((e) => e.ekatte === ekatteString)!
        : null,
      forClientId: client?.id,
      messageId,
      category: TaskBasicCategory.UNSET,
    });
  }, [client?.id, ekatteString, messageId, reset, userDescription]);

  const { isLoading, mutate: createNewTask } = useConfiguredMutation(
    '/api/tasks',
    { method: 'POST' },
    invalidates,
    {
      onSuccess: onClose,
      alertOnSuccess: { message: 'Създадена е нова задача' },
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
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormProvider {...methods}>
            <FormGroup sx={{ gap: 4 }}>
              <Typography variant="h5">Добавяне на задача</Typography>

              <TextField
                label="Описание"
                multiline
                rows={8}
                {...register('description')}
              />

              <SelectLocation
                oblastLabel="Област"
                settlementLabel="Населено място"
                oblastErrorMsg="Моля изберете област"
                settlementErrorMsg="Моля изберете населено място"
              />

              <Controller
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TaskBasicCategorySelect value={value} onChange={onChange} />
                )}
                name={'category'}
              />

              {client && (
                <>
                  <Typography variant="h6">
                    <PrimaryDarkText>От Клиент</PrimaryDarkText>
                  </Typography>
                  <LabelAndData label="Име">{client.name}</LabelAndData>
                  <LabelAndData label="Имейли">
                    <Stack>
                      {client.Email.map((e) => (
                        <Typography variant="subtitle1" key={e.id}>
                          {e.email}
                        </Typography>
                      ))}
                    </Stack>
                  </LabelAndData>
                  <LabelAndData label="Телефони">
                    <Stack>
                      {client.Phone.map((p) => (
                        <Typography variant="subtitle1" key={p.id}>
                          {p.phone}
                          {p.hasViber && '(има Viber)'}
                        </Typography>
                      ))}
                    </Stack>
                  </LabelAndData>
                </>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={onClose}>Отказ</Button>
                <LoadingButton
                  loading={isLoading}
                  onClick={handleSubmit((data) => createNewTask(data))}
                >
                  Създай
                </LoadingButton>
              </Box>
            </FormGroup>
          </FormProvider>
        </Paper>
      </Fade>
    </Portal>
  );
};

export default NewTaskModal;
