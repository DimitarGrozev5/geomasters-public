import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Email, Phone } from '@prisma/client';
import { useMemo, useState } from 'react';
import { ekatte, oblasti } from '../../../../data/ekatte';
import { isEmail } from '../../../../utility/validation/isEmail';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import EditableData from '../../../common/inputs/editable-fields/editable-data';
import EditableSwitch from '../../../common/inputs/editable-fields/editable-switch';
import Modal from '../../../layouts/main-layout/modal/modal';
import PartnersNewEmailForm from '../email-form';
import PartnersNewPhoneForm from '../phone-form';
import EditIcon from '@mui/icons-material/Edit';
import PartnersEkatteForm from '../ekatte-form';

type Props = {
  partnerId: number;
  firmName: string;
  firmEmails: Email[];
  firmPhones: Phone[];
  firmAddress: string;
  firmEKATTE: string;
};

const AdminPartnerData: React.FC<Props> = ({
  partnerId,
  firmName,
  firmEmails,
  firmPhones,
  firmAddress,
  firmEKATTE,
}) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showEkatteForm, setShowEkatteForm] = useState(false);

  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === firmEKATTE),
    [firmEKATTE]
  );
  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  return (
    <>
      <LabelAndData label="Име">
        <EditableData
          data={firmName}
          url={`/api/partners/${partnerId}/firmName`}
          invalidates={['admin', 'partners']}
          successMessage="Успешно променено име"
        />
      </LabelAndData>
      <LabelAndData label="Адрес">
        <EditableData
          data={firmAddress}
          placeholder="Непосочен адрес"
          url={`/api/partners/${partnerId}/firmAddress`}
          invalidates={['admin', 'partners', partnerId]}
          successMessage="Успешно променен адрес"
          inputComponent={<TextField multiline rows={3} />}
        />
      </LabelAndData>

      <LabelAndData label="Офис">
        {settlement?.label}, обл.{oblast?.label}, {firmEKATTE}{' '}
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
          partnerId={partnerId}
          selectedEkatte={firmEKATTE}
          invalidates={['admin', 'partners']}
          onClose={() => setShowEkatteForm(false)}
        />
      </Modal>

      <Typography variant="h6">
        <PrimaryDarkText>Имейли</PrimaryDarkText>
      </Typography>

      <Button onClick={() => setShowEmailForm(true)}>Добавяне на имейл</Button>
      <Modal show={showEmailForm} closeHandler={() => setShowEmailForm(false)}>
        <PartnersNewEmailForm
          partnerId={partnerId}
          invalidates={['admin', 'partners']}
          onClose={() => setShowEmailForm(false)}
        />
      </Modal>

      <Stack>
        {firmEmails.map((email) => (
          <Box
            key={email.id}
            sx={{ border: '1px solid', borderColor: 'divider', p: 1 }}
          >
            <EditableData
              data={email.email}
              url={`/api/emails/${email.id}/email`}
              invalidates={['admin', 'partners']}
              successMessage="Успешно променен Имейл"
              validation={{
                validate: (val) =>
                  isEmail(val) || 'Моля въведете валиден имейл',
              }}
              withDelete={
                firmEmails.length > 1
                  ? {
                      url: `/api/emails/${email.id}`,
                      invalidates: ['admin', 'partners'],
                      successMessage: 'Имейлът е изтрит',
                    }
                  : undefined
              }
            />
          </Box>
        ))}
      </Stack>

      <Typography variant="h6">
        <PrimaryDarkText>Телефони</PrimaryDarkText>
      </Typography>

      <Button onClick={() => setShowPhoneForm(true)}>
        Добавяне на телефон
      </Button>
      <Modal show={showPhoneForm} closeHandler={() => setShowPhoneForm(false)}>
        <PartnersNewPhoneForm
          partnerId={partnerId}
          invalidates={['admin', 'partners']}
          onClose={() => setShowPhoneForm(false)}
        />
      </Modal>

      <Stack spacing={1}>
        {firmPhones.map((phone) => (
          <Box
            key={phone.id}
            sx={{ border: '1px solid', borderColor: 'divider', p: 1 }}
          >
            <EditableData
              data={phone.phone}
              url={`/api/phones/${phone.id}/phone`}
              invalidates={['admin', 'partners']}
              successMessage="Успешно променен Телефон"
              withDelete={
                firmPhones.length > 1
                  ? {
                      url: `/api/phones/${phone.id}`,
                      invalidates: ['admin', 'partners'],
                      successMessage: 'Телефонът е изтрит',
                    }
                  : undefined
              }
            />
            <EditableSwitch
              label={`${phone.hasViber ? 'Има' : 'Няма'} Viber`}
              checked={phone.hasViber}
              url={`/api/phones/${phone.id}/hasViber`}
              invalidates={['admin', 'partners', partnerId]}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default AdminPartnerData;
