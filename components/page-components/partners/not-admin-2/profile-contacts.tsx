import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';

import LocalPhoneIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';

import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import Modal from '../../../layouts/main-layout/modal/modal';
import PartnersNewEmailForm from '../email-form';
import ProfileCard from './profile-card';
import Span from '../../../common/data-presentation/span';
import ProfileEmailCard from './profile-conacts/email-card';
import PartnersNewPhoneForm from '../phone-form';
import Spacer from '../../../common/data-presentation/spacer';
import AddButton from './profile-conacts/add-button';
import ProfilePhoneCard from './profile-conacts/phone-card';

type Props = { partner: DetailedPartner; flex?: number };

export type Selected = { type: '' | 'email' | 'phone'; id: number };

const ProfileContacts: React.FC<Props> = ({ partner, flex }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  const [selected, setSelected] = useState<Selected>({ type: '', id: 0 });

  return (
    <>
      <ProfileCard border="secondary" flex={flex}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Span sx={{ flex: 1 }}>
            <PrimaryDarkText>Данни за контакт</PrimaryDarkText>
          </Span>

          <AddButton
            tooltip="Добави Имейл"
            onClick={() => setShowEmailForm(true)}
            icon={<EmailIcon />}
          />

          <AddButton
            tooltip="Добави Телефон"
            onClick={() => setShowPhoneForm(true)}
            icon={<LocalPhoneIcon />}
          />
        </Typography>

        <Spacer gap={2} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {partner.firmEmails.map((email) => (
            <ProfileEmailCard
              key={email.id}
              email={email}
              selected={selected}
              setSelected={setSelected}
              partnerId={partner.id}
              emailsLen={partner.firmEmails.length}
            />
          ))}

          {partner.firmPhones.map((phone) => (
            <ProfilePhoneCard
              key={phone.id}
              phone={phone}
              partnerId={partner.id}
              phonesLen={partner.firmPhones.length}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Box>
      </ProfileCard>

      <Modal show={showEmailForm} closeHandler={() => setShowEmailForm(false)}>
        <PartnersNewEmailForm
          partnerId={partner.id}
          invalidates={['partner', partner.id]}
          onClose={() => setShowEmailForm(false)}
        />
      </Modal>
      <Modal show={showPhoneForm} closeHandler={() => setShowPhoneForm(false)}>
        <PartnersNewPhoneForm
          partnerId={partner.id}
          invalidates={['partner', partner.id]}
          onClose={() => setShowPhoneForm(false)}
        />
      </Modal>
    </>
  );
};

export default ProfileContacts;
