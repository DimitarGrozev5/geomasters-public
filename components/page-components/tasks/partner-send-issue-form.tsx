import { LoadingButton } from '@mui/lab';
import { Button, TextField, Typography as Ty } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import { PersonalTask } from '../../../pages/api/tasks/[taskId]';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';

type Props = { task: PersonalTask; closeHandler: () => void };

type FormData = {
  data: string;
};

const PartnerSendIssueForm: React.FC<Props> = ({ task, closeHandler }) => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { data: task.partnerRequest },
  });

  const { register, reset: resetForm, handleSubmit } = methods;

  const cancelEditHandler = () => {
    resetForm();
    closeHandler();
  };

  // Handle data submition
  const { isLoading, mutate: updateData } = useConfiguredMutation(
    `/api/tasks/${task.id}/partnerRequest`,
    { method: 'PATCH' },
    ['partner', 'tasks'],
    {
      onSuccess: () => cancelEditHandler,
      alertOnSuccess: { message: 'Изпратихте съобщение' },
    }
  );

  const saveHandler = (data: FormData) => {
    updateData(data);
    closeHandler();
  };

  return (
    <Stack spacing={2}>
      <Box>
        <Ty variant="h6">Проблем със задачата</Ty>
        <Ty variant="subtitle1">
          Ще се свържим с вас, за да доуточним какво може да се направи
        </Ty>
      </Box>

      <TextField
        {...register('data')}
        multiline
        rows={10}
        label="Опишете какъв с какъв проблем се сблъсквате"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={cancelEditHandler}>Отказ</Button>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleSubmit(saveHandler)}
        >
          Изпрати
        </LoadingButton>
      </Box>
    </Stack>
  );
};

export default PartnerSendIssueForm;
