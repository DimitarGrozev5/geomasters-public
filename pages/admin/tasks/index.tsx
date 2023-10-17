import {
  Box,
  Button,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useDeferredValue, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';
import DataDisplay from '../../../components/data-fetching/data-display';
import { sendRequest } from '../../../components/data-fetching/http-client';
import PageCard from '../../../components/layouts/page-card/page-card';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import { ServerError } from '../../../model/server-error';
import { ekatte } from '../../../data/ekatte';
import { GETTask } from '../../api/tasks';
import { taskBasicCategoryValues } from '../../../data/task-basic-category';
import { taskStatus } from '../../../data/task-status';
import NewTaskModal from '../../../components/page-components/admin-messages/modal-new-task';
import TaskAdminOverview from '../../../components/page-components/tasks/admin-task-overview';
import { useAdminGuard } from '../../../hooks/useAuth';
import Head from 'next/head';

type Props = {
  // clients: GETClient[];
};

export default function TasksPage({}: Props) {
  useAdminGuard();

  const [searchQuery, setSearchQuery] = useState('');
  const defQuery = useDeferredValue(searchQuery);
  const changeSearchHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const settlement = useMemo(
    () =>
      ekatte.find(
        (e) =>
          !!defQuery &&
          e.label.toLowerCase().search(defQuery.toLowerCase()) >= 0
      ),
    [defQuery]
  );

  const partnersCtrl = useQuery(
    ['admin', 'tasks', defQuery],
    sendRequest('/api/tasks', {
      method: 'GET',
      query: { search: defQuery, settlement: settlement?.ekatte || '' },
      responseParser: (d: { tasks: GETTask[] }) => d.tasks,
    })
    // { initialData: clients }
  );

  const [selectedTaskId, setSelectedTaskId] = useState<null | number>(null);
  // const selectedMessage =
  //   newMsg?.find((msg) => msg.id === selectedClientId) ||
  //   oldMsg?.find((msg) => msg.id === selectedClientId);

  const selectTaskHandler = (id: number) => () => {
    setSelectedTaskId(id);
  };

  const [showModal__NewPartner, setShowModal__NewPartner] = useState(false);

  return (
    <>
      <Head>
        <title>Задачи</title>
      </Head>
      <PageLayout>
        <Grid
          container
          columnSpacing={2}
          sx={{ flex: 1, alignItems: 'stretch' }}
        >
          <Grid
            item
            lg={5}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <PageCard sx={{ flex: 1, overflow: 'auto' }}>
              <Typography variant="h5">
                <PrimaryDarkText>Задачи</PrimaryDarkText>
              </Typography>

              <Box>
                <Button onClick={() => setShowModal__NewPartner(true)}>
                  Създай нова задача
                </Button>
                <NewTaskModal
                  show={showModal__NewPartner}
                  onClose={() => setShowModal__NewPartner(false)}
                  invalidates={['admin', 'tasks']}
                />
              </Box>

              <TextField
                value={searchQuery}
                onChange={changeSearchHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <DataDisplay
                control={partnersCtrl}
                loadingComponent={<>Loading...</>}
                ErrorComponent={({ error }) => {
                  const msg =
                    error instanceof ServerError
                      ? error.userMessage
                      : 'Възникна грешка при зареждане на данните';
                  return <>Грешка при зареждане на задачите: {msg}</>;
                }}
                ContentComponent={({ data }) => {
                  return (
                    <>
                      <List>
                        {data.map((task) => (
                          <ListItem key={task.id}>
                            <ListItemButton
                              onClick={selectTaskHandler(task.id)}
                              sx={
                                selectedTaskId === task.id
                                  ? {
                                      backgroundColor: (theme) =>
                                        theme.palette.primary.A50,
                                      border: (theme) =>
                                        `1px solid ${theme.palette.primary.A700}`,
                                      borderRadius: (theme) => theme.spacing(1),
                                    }
                                  : {}
                              }
                            >
                              <ListItemText
                                primary={`
                                ${
                                  taskBasicCategoryValues.find(
                                    (t) => t.value === task.taskBasicCategory
                                  )?.caption
                                }, ${
                                  ekatte.find((e) => e.ekatte === task.ekatte)
                                    ?.label
                                }`}
                                secondary={
                                  <>
                                    {
                                      taskStatus.find(
                                        (t) => t.value === task.status
                                      )?.caption
                                    }
                                    <br />
                                    {!!task.partner
                                      ? 'Разпределена'
                                      : 'Неразпределена'}
                                  </>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </>
                  );
                }}
              />
            </PageCard>
          </Grid>

          <Grid item lg={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <PageCard sx={{ flex: 1 }}>
              {selectedTaskId === null ? (
                <Typography variant="h5">Изберете задача</Typography>
              ) : (
                <TaskAdminOverview taskId={selectedTaskId} />
              )}
            </PageCard>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
