import Image from 'next/image';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { EkatteFormType } from '../../common/inputs/message-us-inputs/form-data-type';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import AutocompleteElements from '../../common/inputs/message-us-inputs/select-location/autocpmplete-elements';
import { useImageUrl } from '../../common/inputs/message-us-inputs/useImageUrl';
import { height } from '../../../utility/image-util';
import { ekatte } from '../../../data/ekatte';

type Props = {
  taskId: number;
  selectedEkatte: string;
  invalidates: QueryKey | undefined;
  onClose: () => void;
};

type EmailForm = {
  data: EkatteFormType;
};

export const TaskEkatteForm: React.FC<Props> = ({
  taskId: partnerId,
  selectedEkatte,
  invalidates,
  onClose,
}) => {
  const { control, handleSubmit, watch } = useForm<EmailForm>({
    mode: 'onChange',
    defaultValues: {
      data: ekatte.find((e) => e.ekatte === selectedEkatte) || null,
    },
  });

  const selectedEkatteVal = watch('data');
  const bulgariaUrl = useImageUrl(selectedEkatteVal);

  const { isLoading, mutate: addEmail } = useConfiguredMutation(
    `/api/tasks/${partnerId}/ekatte`,
    { method: 'PATCH' },
    invalidates,
    {
      alertOnSuccess: { message: 'Успешно променена локация' },
      onSuccess: onClose,
    }
  );

  return (
    <Stack spacing={2} sx={{ textAlign: 'center' }}>
      <Typography variant="h5">Изберете населено място</Typography>
      <Controller
        name="data"
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
            oblastLabel={'Област'}
            oblastErrorMsg={'Моля изберете област'}
            settlementLabel={'Населено място'}
            settlementErrorMsg={'Моля изберете населено място'}
          />
        )}
      />
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          height: { md: 180, xl: 250 },
          textAlign: 'center',
          mb: 1,
        }}
      >
        <Image
          src={`/images/oblasti/${bulgariaUrl}.png`}
          alt=""
          width={500}
          height={height(1600, 1280, 600)}
          style={{ width: 'auto', height: '100%' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={onClose}>Отказ</Button>
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit((data) => addEmail(data))}
        >
          Промяна
        </LoadingButton>
      </Box>
    </Stack>
  );
};

export default TaskEkatteForm;
