import { Tab, Tabs } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ServerError } from '../../../model/server-error';
import { DetailedPartner } from '../../../pages/api/partners/[partnerId]';
import DataDisplay from '../../data-fetching/data-display';
import { sendRequest } from '../../data-fetching/http-client';
import PartnerAdminControl from './admin/admin-control';
import AdminPartnerData from './admin/admin-data';
import AdminPartnerSettings from './admin/admin-settings';
import AdminPartnerTasks from './admin/admin-tasks';

type Props = { partnerId: number };

const PartnerAdminOverview: React.FC<Props> = ({ partnerId }) => {
  const clientCtrl = useQuery(
    ['admin', 'partners', partnerId],
    sendRequest(`/api/partners/${partnerId}`, {
      method: 'GET',
      responseParser: (d: { partner: DetailedPartner }) => d.partner,
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
              <Tab label="Администриране" />
              <Tab label="Данни" />
              <Tab label="Настройки" />
              <Tab label="Задачи" />
            </Tabs>
            {tabValue === 0 && <PartnerAdminControl partner={data} />}
            {tabValue === 1 && (
              <AdminPartnerData
                partnerId={data.id}
                firmName={data.firmName}
                firmEmails={data.firmEmails}
                firmPhones={data.firmPhones}
                firmAddress={data.firmAddress}
                firmEKATTE={data.firmEKATTE}
              />
            )}
            {tabValue === 2 && <AdminPartnerSettings partner={data} />}
            {tabValue === 3 && <AdminPartnerTasks partner={data} />}
          </Stack>
        )}
      />
    </>
  );
};

export default PartnerAdminOverview;
