import { Masonry } from '@mui/lab';
import { Box } from '@mui/system';
import { useState } from 'react';
import { GETTask } from '../../../pages/api/tasks';
import Modal from '../../layouts/main-layout/modal/modal';
import PartnerTasкCard from './partner-task-card';
import PartnerTaskDetails from './partner-task-details';

type Props = { data: GETTask[] };

const TasksPartnerOverview: React.FC<Props> = ({ data }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<null | number>(null);

  const selectTaskHandler = (id: number) => () => {
    setSelectedTaskId(id);
  };
  return (
    <>
      <Modal
        show={selectedTaskId !== null}
        closeHandler={() => setSelectedTaskId(null)}
        bareBones
      >
        {selectedTaskId !== null && (
          <PartnerTaskDetails taskId={selectedTaskId} />
        )}
      </Modal>
      <Box sx={{ width: '100%' }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
          {data
            .filter((t) => t.status === 'OFFERED')
            .map((task) => (
              <PartnerTasкCard
                key={task.id}
                task={task}
                onSelect={selectTaskHandler(task.id)}
              />
            ))}

          {data
            .filter((t) => t.status === 'ACCEPTED')
            .map((task) => (
              <PartnerTasкCard
                key={task.id}
                task={task}
                onSelect={selectTaskHandler(task.id)}
              />
            ))}

          {data
            .filter((t) => t.status === 'STARTED')
            .map((task) => (
              <PartnerTasкCard
                key={task.id}
                task={task}
                onSelect={selectTaskHandler(task.id)}
              />
            ))}

          {data
            .filter(
              (t) =>
                t.status !== 'OFFERED' &&
                t.status !== 'ACCEPTED' &&
                t.status !== 'STARTED'
            )
            .map((task) => (
              <PartnerTasкCard
                key={task.id}
                task={task}
                onSelect={selectTaskHandler(task.id)}
              />
            ))}
        </Masonry>
      </Box>
    </>
  );
};

export default TasksPartnerOverview;
