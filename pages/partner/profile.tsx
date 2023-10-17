import PageLayout from '../../components/layouts/page-layout/page-layout';
import { useQuery } from 'react-query';
import DataDisplay from '../../components/data-fetching/data-display';
import { ServerError } from '../../model/server-error';
import { sendRequest } from '../../components/data-fetching/http-client';
import { DetailedPartner } from '../api/partners/[partnerId]';
import { useAuth, useLogedInGuard } from '../../hooks/useAuth';
import Profile2 from '../../components/page-components/partners/not-admin-2/profile-2';
import Head from 'next/head';

export default function UserProfilePage() {
  useLogedInGuard();

  const { session } = useAuth();
  //@ts-ignore
  const id = session?.user?.id;
  //@ts-ignore
  const partnerId = session?.user?.partnerId;

  const partnerCtrl = useQuery(
    ['partner', partnerId],
    sendRequest(`/api/partners/${id}`, {
      method: 'GET',
      query: { userId: id },
      responseParser: (d: { partner: DetailedPartner }) => d.partner,
    })
  );

  return (
    <>
      <Head>
        <title>Вашият профил - GeoMasters</title>
      </Head>
      <PageLayout>
        <DataDisplay
          control={partnerCtrl}
          loadingComponent={<>Loading...</>}
          ErrorComponent={({ error }) => {
            const msg =
              error instanceof ServerError
                ? error.userMessage
                : 'Възникна грешка при зареждане на данните';
            return <>Грешка при зареждане на задачите: {msg}</>;
          }}
          ContentComponent={Profile2}
        />
      </PageLayout>
    </>
  );
}
