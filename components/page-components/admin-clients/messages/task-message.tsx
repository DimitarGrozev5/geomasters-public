import { Alert, Box, Typography } from '@mui/material';
import { ekatte, oblasti } from '../../../../data/ekatte';
import { taskBasicCategoryValues } from '../../../../data/task-basic-category';
import { taskStatus } from '../../../../data/task-status';
import { ClientMessageType } from '../../../../pages/api/clients/[clientId]';
import { bigIntToNum } from '../../../../utility/bigIntToNum';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';

type Props = {
  task: NonNullable<ClientMessageType['task']>;
};

const TaskMessage: React.FC<Props> = ({ task }) => {
  const date = new Intl.DateTimeFormat('bg').format(new Date(bigIntToNum(task.createdAt)));
  const settlement = ekatte.find((e) => e.ekatte === task.ekatte);
  const oblast = oblasti.find((ob) => ob.id === settlement?.oblast);
  return (
    <>
      {/**
       * TODO: Move date and source to separate component
       */}
      <Typography variant="caption">Започната задача</Typography>
      <Typography sx={{ mb: 1 }} variant="caption">
        {date}
      </Typography>
      {task.partnerId === null && (
        <Alert variant="filled" severity="warning" sx={{ p: 0.3 }}>
          Не е Разпределена
        </Alert>
      )}

      <Box>
        {task.partnerId !== null && (
          <Typography variant="subtitle2">Разпределена</Typography>
        )}
      </Box>
      <Typography variant="body2">
        За {settlement?.label}, обл.{oblast?.label}, {task.ekatte}
      </Typography>
      <Box>{task.description}</Box>

      <Typography variant="subtitle2">
        <PrimaryDarkText>Тип задача:</PrimaryDarkText>{' '}
        {
          taskBasicCategoryValues.find(
            (ts) => ts.value === task.taskBasicCategory
          )?.caption
        }
      </Typography>
      <Typography variant="subtitle2">
        <PrimaryDarkText>Статус:</PrimaryDarkText>{' '}
        {taskStatus.find((ts) => ts.value === task.status)?.caption}
      </Typography>
    </>
  );
};

export default TaskMessage;
