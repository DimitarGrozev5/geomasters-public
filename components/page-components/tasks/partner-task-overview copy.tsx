import { useQuery } from 'react-query';
import { ServerError } from '../../../model/server-error';
import { PersonalTask } from '../../../pages/api/tasks/[taskId]';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import PartnerTaskData from './partner-task-data';

type Props = { taskId: number };

const TaskPartnerOverview: React.FC<Props> = ({ taskId }) => {
  const clientCtrl = useQuery(
    ['partner', 'tasks', taskId],
    sendRequest(`/api/tasks/${taskId}`, {
      method: 'GET',
      responseParser: (d: { task: PersonalTask }) => d.task,
    })
  );

  return (
    <>
      <DataDisplay
        control={clientCtrl}
        loadingComponent={<>Loading...</>}
        ErrorComponent={({ error }) => {
          const msg =
            error instanceof ServerError
              ? error.userMessage
              : 'Възникна грешка при зареждане на данните';
          return <>Грешка при зареждане на партньорските данни: {msg}</>;
        }}
        ContentComponent={({ data }) => <PartnerTaskData task={data} />}
      />
    </>
  );
};

export default TaskPartnerOverview;
