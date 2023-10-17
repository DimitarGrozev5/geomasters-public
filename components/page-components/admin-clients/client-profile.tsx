import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Email, Phone } from '@prisma/client';
import { useState } from 'react';
import { isEmail } from '../../../utility/validation/isEmail';
import LabelAndData from '../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import Confirm from '../../common/inputs/confirm-button';
import EditableData from '../../common/inputs/editable-fields/editable-data';
import EditableSwitch from '../../common/inputs/editable-fields/editable-switch';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import Modal from '../../layouts/main-layout/modal/modal';
import ClientsNewEmailForm from './email-form';
import ClientsNewPhoneForm from './phone-form';

type Props = {
  clientId: number;
  name: string;
  emails: Email[];
  phones: Phone[];
};

const ClientProfile: React.FC<Props> = ({ clientId, name, emails, phones }) => {
  const [showNewEmailModal, setShowNewEmailModal] = useState(false);
  const [showNewPhoneModal, setShowNewPhoneModal] = useState(false);

  const { isLoading, mutate: deleteClient } = useConfiguredMutation(
    `/api/clients/${clientId}`,
    { method: 'DELETE' },
    ['admin', 'clients'],
    {
      alertOnSuccess: {
        message:
          'Клиентът е маркиран за изтриване. За кратко време ще може да бъде възстановен.',
      },
    }
  );

  return (
    <>
      <LabelAndData label="Име">
        <EditableData
          data={name}
          url={`/api/clients/${clientId}/name`}
          invalidates={['admin', 'clients']}
          validation={{
            minLength: { value: 3, message: 'Името е твърде късо' },
          }}
        />
      </LabelAndData>

      <Typography variant="h6">
        <PrimaryDarkText>Имейли</PrimaryDarkText>
      </Typography>

      <Button onClick={() => setShowNewEmailModal(true)}>Добави Имейл</Button>
      <Modal
        show={showNewEmailModal}
        closeHandler={() => setShowNewEmailModal(false)}
      >
        <ClientsNewEmailForm
          clientId={clientId}
          invalidates={['admin', 'clients']}
          onClose={() => setShowNewEmailModal(false)}
        />
      </Modal>

      <List>
        {emails.map((email) => (
          <ListItem key={email.id}>
            <EditableData
              data={email.email}
              url={`/api/emails/${email.id}/email`}
              invalidates={['admin', 'clients']}
              successMessage="Имейлът е променен"
              withDelete={
                emails.length > 1
                  ? {
                      url: `/api/emails/${email.id}`,
                      invalidates: ['admin', 'clients'],
                      successMessage: 'Имейлът е изтрит',
                    }
                  : undefined
              }
              validation={{
                validate: (val) => isEmail(val) || 'Въведете валиден имейл',
              }}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6">
        <PrimaryDarkText>Телефони</PrimaryDarkText>
      </Typography>

      <Button onClick={() => setShowNewPhoneModal(true)}>Добави Телефон</Button>
      <Modal
        show={showNewPhoneModal}
        closeHandler={() => setShowNewPhoneModal(false)}
      >
        <ClientsNewPhoneForm
          clientId={clientId}
          invalidates={['admin', 'clients']}
          onClose={() => setShowNewPhoneModal(false)}
        />
      </Modal>

      <List>
        {phones.map((phone) => (
          <ListItem key={phone.id}>
            <Box>
              <EditableData
                data={phone.phone}
                url={`/api/phones/${phone.id}/phone`}
                invalidates={['admin', 'clients']}
                successMessage="телефонът е променен"
                withDelete={
                  phones.length > 1
                    ? {
                        url: `/api/phones/${phone.id}`,
                        invalidates: ['admin', 'clients'],
                        successMessage: 'Телефонът е изтрит',
                      }
                    : undefined
                }
              />
              <EditableSwitch
                label={`${phone.hasViber ? 'Има' : 'Няма'} Viber`}
                checked={phone.hasViber}
                url={`/api/phones/${phone.id}/hasViber`}
                invalidates={['admin', 'clients']}
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Confirm
        onClick={() => deleteClient(undefined)}
        hardWord={emails[0].email}
        label="изтриване на клиент"
      >
        <Tooltip title="Изисква потвърждение">
          <LoadingButton
            loading={isLoading}
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            Изтрий клиент
          </LoadingButton>
        </Tooltip>
      </Confirm>
    </>
  );
};

export default ClientProfile;
