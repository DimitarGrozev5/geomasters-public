import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import TaskOverview from '../../../common/actor-overview-cards/task-overview';
import OutlinedCard from '../../../common/cards/outline-card';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';

type Props = {
  partner: DetailedPartner;
};

const AdminPartnerTasks: React.FC<Props> = ({ partner: { Task: tasks } }) => {
  return (
    <>
      <Typography variant="h6">
        <PrimaryDarkText>Задачи</PrimaryDarkText>
      </Typography>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <OutlinedCard key={task.id}>
            <TaskOverview task={task} />
          </OutlinedCard>
        ))}
      </Stack>
    </>
  );
};

export default AdminPartnerTasks;
