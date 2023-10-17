import { Card, Grid, Typography } from '@mui/material';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import EditableSwitch from '../../../common/inputs/editable-fields/editable-switch';
import ProfileCard from './profile-card';

import {
  DroneCardSwitch,
  GNSSCardSwitch,
  LevelCardSwitch,
  TSCardSwitch,
} from './instruments/insturment-toggle-card';
import Spacer from '../../../common/data-presentation/spacer';

type Props = { partner: DetailedPartner; flex?: number };

const ProfileInstruments: React.FC<Props> = ({ partner, flex }) => {
  return (
    <ProfileCard flex={flex} border="primary">
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Инструменти</PrimaryDarkText>
      </Typography>

      <Spacer gap={4} />

      <Grid container spacing={2}>
        <Grid item lg={6}>
          <EditableSwitch
            switchComponent={<GNSSCardSwitch />}
            checked={partner.hasGNSS}
            label={`${partner.hasGNSS ? 'Имам' : 'Нямам'} GPS/GNSS`}
            url={`/api/partners/${partner.id}/hasGNSS`}
            invalidates={['partner', partner.id]}
            verticalStack
            labelProps={{
              color: (theme) => theme.palette.primary.A600,
              mb: 0.5,
            }}
          />
        </Grid>

        <Grid item lg={6}>
          <EditableSwitch
            switchComponent={<TSCardSwitch />}
            checked={partner.hasTotalStation}
            label={`${
              partner.hasTotalStation ? 'Имам' : 'Нямам'
            } тотална станция`}
            url={`/api/partners/${partner.id}/hasTotalStation`}
            invalidates={['partner', partner.id]}
            verticalStack
            labelProps={{
              color: (theme) => theme.palette.primary.A600,
              mb: 0.5,
            }}
          />
        </Grid>

        <Grid item lg={6}>
          <EditableSwitch
            switchComponent={<LevelCardSwitch />}
            checked={partner.hasLevel}
            label={`${partner.hasLevel ? 'Имам' : 'Нямам'} нивелир`}
            url={`/api/partners/${partner.id}/hasLevel`}
            invalidates={['partner', partner.id]}
            verticalStack
            labelProps={{
              color: (theme) => theme.palette.primary.A600,
              mb: 0.5,
            }}
          />
        </Grid>

        <Grid item lg={6}>
          <EditableSwitch
            switchComponent={<DroneCardSwitch />}
            checked={partner.hasDrone}
            label={`${partner.hasDrone ? 'Имам' : 'Нямам'} дрон`}
            url={`/api/partners/${partner.id}/hasDrone`}
            invalidates={['partner', partner.id]}
            verticalStack
            labelProps={{
              color: (theme) => theme.palette.primary.A600,
              mb: 0.5,
            }}
          />
        </Grid>
      </Grid>
    </ProfileCard>
  );
};

export default ProfileInstruments;
