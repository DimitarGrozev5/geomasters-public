import { Box, Typography } from '@mui/material';
import { useDeferredValue, useState } from 'react';
import { useQuery } from 'react-query';
import PrimaryDarkText from '../../components/common/display-modifiers/primary-dark-text';
import DataDisplay from '../../components/data-fetching/data-display';
import { sendRequest } from '../../components/data-fetching/http-client';
import PageCard from '../../components/layouts/page-card/page-card';
import PageLayout from '../../components/layouts/page-layout/page-layout';
import { ServerError } from '../../model/server-error';
import { GETTask } from '../api/tasks';
import { useLogedInGuard } from '../../hooks/useAuth';
import TasksPartnerOverview from '../../components/page-components/tasks/partner-tasks-overview';
import PartnerTasksSearchField_2 from '../../components/common/inputs/search_field_2/partner-tasks-search-field-2';
import { Chips } from '../../components/common/inputs/search_field_2/sub-comp/attr-chips-display';
import Head from 'next/head';

type Props = {
  // clients: GETClient[];
};

export default function TasksPage({}: Props) {
  useLogedInGuard();

  // The entered values
  const [chips, setChips] = useState<Chips>({
    status: null,
    category: null,
    dateFrom: null,
    dateTo: null,
    location: null,
    rnd: [],
  });

  const defQuery = useDeferredValue(chips);

  const partnersCtrl = useQuery(
    ['partner', 'tasks', defQuery],
    sendRequest('/api/tasks', {
      method: 'GET',
      query: {
        status: defQuery.status?.raw || undefined,
        category: defQuery.category?.raw || undefined,
        dateFrom: defQuery.dateFrom?.raw || undefined,
        dateTo: defQuery.dateTo?.raw || undefined,
        ekatte: defQuery.location?.raw || undefined,
        rnd: defQuery.rnd?.map((r) => r.raw).join('^.%$') || undefined,

        onlyMine: 'true',
      },
      responseParser: (d: { tasks: GETTask[] }) => d.tasks,
    })
    // { initialData: clients }
  );

  return (
    <>
      <Head>
        <title>Вашите задачи - GeoMasters</title>
      </Head>
      <PageLayout>
        <PageCard sx={{ flex: 1, overflow: 'auto', gap: 2 }}>
          <Typography variant="h5">
            <PrimaryDarkText>Задачи</PrimaryDarkText>
          </Typography>

          <Box sx={{ width: { xs: '100%', md: '80%' }, alignSelf: 'center' }}>
            <PartnerTasksSearchField_2 chips={chips} setChips={setChips} />
            {/* <PartnerTasksSearchField /> */}
          </Box>

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
            ContentComponent={TasksPartnerOverview}
          />
        </PageCard>
      </PageLayout>
    </>
  );
}
