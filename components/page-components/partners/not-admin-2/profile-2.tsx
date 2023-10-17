import { Stack, useMediaQuery } from '@mui/material';

import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import VerticalContainer from './vertical-container';
import ProfileInstruments from './instruments';
import BaseProfileData from './base-profile';
import ProfileContacts from './profile-contacts';
import ProfileCredit from './profile-credit';
import ProfileCompetency from './competency';

type Props = {
  data: DetailedPartner;
};

const Profile2: React.FC<Props> = ({ data: partner }) => {
  const threeCols = useMediaQuery('(min-width:1600px)');
  const twoColsSpread = useMediaQuery(
    '(min-width:1100px) and (max-width:1599px)'
  );
  const twoColsWide = useMediaQuery('(min-width:900px) and (max-width:1099px)');
  const oneCol = useMediaQuery('(max-width:899px)');
  return (
    <>
      {threeCols && (
        <Stack
          direction="row"
          alignItems="stretch"
          spacing={4}
          sx={{ minHeight: '100vh' }}
        >
          <VerticalContainer flex={3}>
            <ProfileContacts partner={partner} />
            <ProfileCredit partner={partner} flex={1} />
          </VerticalContainer>

          <VerticalContainer flex={3}>
            <BaseProfileData partner={partner} />
            <ProfileInstruments partner={partner} flex={1} />
          </VerticalContainer>

          <VerticalContainer flex={3}>
            <ProfileCompetency partner={partner} flex={1} />
          </VerticalContainer>
        </Stack>
      )}

      {twoColsSpread && (
        <Stack
          direction="row"
          alignItems="stretch"
          spacing={4}
          sx={{ minHeight: '100vh' }}
        >
          <VerticalContainer flex={3}>
            <BaseProfileData partner={partner} />
            <ProfileCredit partner={partner} />
            <ProfileContacts partner={partner} flex={1} />
          </VerticalContainer>

          <VerticalContainer flex={3}>
            <ProfileInstruments partner={partner} />
            <ProfileCompetency partner={partner} />
          </VerticalContainer>
        </Stack>
      )}

      {twoColsWide && (
        <>
          <Stack
            direction="row"
            alignItems="stretch"
            spacing={4}
            sx={{ minHeight: '100vh' }}
          >
            <VerticalContainer flex={3}>
              <BaseProfileData partner={partner} />
              <ProfileContacts partner={partner} flex={1} />
            </VerticalContainer>

            <VerticalContainer flex={3}>
              <ProfileCredit partner={partner} />
              <ProfileInstruments partner={partner} />
            </VerticalContainer>
          </Stack>
          <ProfileCompetency partner={partner} />
        </>
      )}

      {oneCol && (
        <VerticalContainer flex={3}>
          <BaseProfileData partner={partner} />
          <ProfileContacts partner={partner} />
          <ProfileCredit partner={partner} />
          <ProfileInstruments partner={partner} />
          <ProfileCompetency partner={partner} />
        </VerticalContainer>
      )}
    </>
  );
};

export default Profile2;
