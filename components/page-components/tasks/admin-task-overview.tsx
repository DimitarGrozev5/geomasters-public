import { Tab, Tabs } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ServerError } from '../../../model/server-error';
import { DetailedTask } from '../../../pages/api/tasks/[taskId]';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import AdminTaskData from './admin-task-data';
import AdminTaskEvents from './admin-task-events';

type Props = { taskId: number };

const TaskAdminOverview: React.FC<Props> = ({ taskId }) => {
  const clientCtrl = useQuery(
    ['admin', 'tasks', taskId],
    sendRequest(`/api/tasks/${taskId}`, {
      method: 'GET',
      responseParser: (d: { task: DetailedTask }) => d.task,
    })
  );

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
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
        ContentComponent={({ data }) => (
          <Stack
            sx={{
              width: '100%',
              flex: 1,
              alignItems: 'flex-start',
            }}
          >
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Данни" />
              <Tab label="Събития" />
            </Tabs>
            {tabValue === 0 && <AdminTaskData task={data} />}
            {tabValue === 1 && <AdminTaskEvents events={data.taskEvents} />}
          </Stack>
        )}
      />
    </>
  );
};

export default TaskAdminOverview;
