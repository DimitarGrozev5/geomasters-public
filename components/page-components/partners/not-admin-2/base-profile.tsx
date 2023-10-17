import { useState } from 'react';

import {
  Box,
  Card,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import EditableData from '../../../common/inputs/editable-fields/editable-data';
import ProfileCard from './profile-card';
import { useLocationLabel } from '../../../../hooks/useLocationLabel';
import Modal from '../../../layouts/main-layout/modal/modal';
import PartnersEkatteForm from '../ekatte-form';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import Spacer from '../../../common/data-presentation/spacer';
import EditableSwitch from '../../../common/inputs/editable-fields/editable-switch';
import DistancesSliders from '../not-admin/distances-sliders';

type Props = { partner: DetailedPartner; flex?: number };

const h = 20;

const BaseProfileData: React.FC<Props> = ({ partner, flex }) => {
  const [showEkatteForm, setShowEkatteForm] = useState(false);

  const ekatteLabel = useLocationLabel(partner.firmEKATTE);
  return (
    <ProfileCard border="primary" flex={flex}>
      <Card
        variant="outlined"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: (theme) => theme.spacing(h),

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          border: 'none',
          borderRadius: '0 0 50% 50% / 0 0 10% 10%',
          backgroundColor: (theme) => theme.palette.primary.A50,
        }}
      >
        <Typography variant="h4">
          <PrimaryDarkText>{partner.firmName}</PrimaryDarkText>
        </Typography>
      </Card>

      <Spacer gap={h} />

      <LabelAndData label="Адрес">
        <EditableData
          data={partner.firmAddress}
          placeholder="Непосочен адрес"
          url={`/api/partners/${partner.id}/firmAddress`}
          invalidates={['partner', partner.id]}
          successMessage="Успешно променен адрес"
          inputComponent={<TextField multiline rows={3} />}
        />
      </LabelAndData>
      <LabelAndData label="Офис">
        {ekatteLabel}{' '}
        <Tooltip title="Редактирай">
          <IconButton onClick={() => setShowEkatteForm(true)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </LabelAndData>
      <Modal
        show={showEkatteForm}
        closeHandler={() => setShowEkatteForm(false)}
      >
        <PartnersEkatteForm
          partnerId={partner.id}
          selectedEkatte={partner.firmEKATTE}
          invalidates={['partner', partner.id]}
          onClose={() => setShowEkatteForm(false)}
        />
      </Modal>

      <EditableSwitch
        checked={partner.willingToTakeLongTermProjects}
        label={`${
          partner.willingToTakeLongTermProjects ? 'Бих' : 'Не бих'
        } приел дългосрочни задачи`}
        url={`/api/partners/${partner.id}/willingToTakeLongTermProjects`}
        invalidates={['partner', partner.id]}
      />

      <DistancesSliders partner={partner} />
    </ProfileCard>
  );
};

export default BaseProfileData;
