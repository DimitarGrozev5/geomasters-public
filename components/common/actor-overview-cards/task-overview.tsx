import { Box, Paper, Popover, Popper, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { ID } from '../../../model/id.type';
import { ServerError } from '../../../model/server-error';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import PrimaryDarkText from '../display-modifiers/primary-dark-text';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMemo, useState } from 'react';
import { DetailedPartner } from '../../../pages/api/partners/[partnerId]';
import { ekatte, oblasti } from '../../../data/ekatte';
import { DetailedTask } from '../../../pages/api/tasks/[taskId]';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import { taskStatus } from '../../../data/task-status';
import ErrorText from '../display-modifiers/error-text';

type SelectedTask = Pick<
  DetailedTask,
  'id' | 'taskBasicCategory' | 'status' | 'ekatte' | 'partnerId'
>;

type Props =
  | {
      task?: never;
      taskId: ID;
    }
  | {
      task: SelectedTask;
      taskId?: never;
    };

const TaskOverview: React.FC<Props> = ({ task, taskId }) => {
  const id = taskId ?? task.id;
  const partnerCtrl = useQuery(
    ['task-overview', id],
    sendRequest(`/api/tasks/${id}`, {
      method: 'GET',
      responseParser: (d: { task: SelectedTask }) => d.task,
    }),
    { initialData: task }
  );

  return (
    <DataDisplay
      control={partnerCtrl}
      loadingComponent={<>Loading...</>}
      ErrorComponent={({ error }) => {
        const msg =
          error instanceof ServerError
            ? error.userMessage
            : 'Възникна грешка при зареждане на данните';
        return <>Грешка при зареждане на данните: {msg}</>;
      }}
      ContentComponent={DisplayComponent}
    />
  );
};

const DisplayComponent = ({ data }: { data: SelectedTask }) => {
  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === data.ekatte),
    [data.ekatte]
  );

  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  const category = useMemo(
    () =>
      taskBasicCategoryValues.find((c) => c.value === data.taskBasicCategory),
    [data.taskBasicCategory]
  );

  const status = useMemo(
    () => taskStatus.find((s) => s.value === data.status),
    [data.status]
  );

  return (
    <>
      <Stack>
        <Typography variant="body1">
          <PrimaryDarkText>
            {category?.caption || 'Неуточнено'},{' '}
            {!!settlement && !!oblast
              ? `${settlement?.label}, обл. ${oblast?.label}, ${data.ekatte}`
              : data.ekatte}
          </PrimaryDarkText>
        </Typography>

        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {status?.caption || 'Неясен статус'}
        </Typography>

        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {data.partnerId !== null ? (
            'Разпределена'
          ) : (
            <ErrorText>Неразпределена</ErrorText>
          )}
        </Typography>
      </Stack>
    </>
  );
};

export default TaskOverview;
