import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { NewMessage } from '../../../../pages/api/messages/new';
import LabelAndData from '../../../common/data-presentation/label-and-data';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../../common/display-modifiers/secondary-dark-text';
import ConfirmModal from '../../../common/inputs/confirm-modal';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';
import SimilarClients from './similar-clients';

type Props = { msg: NewMessage };

const AttachedClient: React.FC<Props> = ({ msg }) => {
  const [showConfirmDetach, setShowConfirmDetach] = useState(false);

  const { isLoading, mutate } = useConfiguredMutation(
    `/api/messages/${msg.id}/ownerClient`,
    {
      method: 'DELETE',
    },
    ['admin', 'messages', 'new'],
    {}
  );

  const { isLoading: addEmailLoading, mutate: addEmail } =
    useConfiguredMutation(
      `/api/clients/${msg.ownerClient!.id}/emails`,
      {
        method: 'POST',
        body: { email: msg.email },
      },
      ['admin', 'messages', 'new'],
      {}
    );

  const { isLoading: addPhoneLoading, mutate: addPhone } =
    useConfiguredMutation(
      `/api/clients/${msg.ownerClient!.id}/phones`,
      {
        method: 'POST',
        body: { phone: msg.phone, hasViber: msg.hasViber },
      },
      ['admin', 'messages', 'new'],
      {}
    );

  if (!msg.ownerClient) {
    return <SimilarClients msg={msg} />;
  }

  return (
    <>
      <Typography variant="h6">
        <PrimaryDarkText>От Клиент</PrimaryDarkText>
        <LabelAndData label="Име">{msg.ownerClient.name}</LabelAndData>
        <LabelAndData label="Имейли" alignTop>
          <Stack>
            {msg.ownerClient.Email.map((e) => (
              <Typography variant="subtitle1" key={e.id}>
                {e.email}
              </Typography>
            ))}
          </Stack>
          {!msg.ownerClient.Email.find((e) => e.email === msg.email) && (
            <LoadingButton
              loading={addEmailLoading}
              onClick={() => addEmail(undefined)}
            >
              Добави {msg.email}
            </LoadingButton>
          )}
        </LabelAndData>
        <LabelAndData label="Телефони" alignTop>
          <Stack>
            {msg.ownerClient.Phone.map((p) => (
              <Typography variant="subtitle1" key={p.id}>
                {p.phone}
                {p.hasViber && '(има Viber)'}
              </Typography>
            ))}
          </Stack>
          {!msg.ownerClient.Phone.find((p) => p.phone === msg.phone) && (
            <LoadingButton
              loading={addPhoneLoading}
              onClick={() => addPhone(undefined)}
            >
              Добави {msg.phone}
            </LoadingButton>
          )}
        </LabelAndData>
      </Typography>

      {!!msg.task ? (
        <Typography variant="subtitle2">
          <SecondaryDarkText>
            {msg.administraded
              ? ''
              : 'Не можете да откачите клиента, когато има създадена задача'}
          </SecondaryDarkText>
        </Typography>
      ) : (
        <LoadingButton
          loading={isLoading}
          onClick={() => setShowConfirmDetach(true)}
        >
          Откачи от съобщението
        </LoadingButton>
      )}
      <ConfirmModal
        show={showConfirmDetach}
        label="Сигурни ли сте, че искате да откачите потребителя от това съобщение?"
        onClose={() => setShowConfirmDetach(false)}
        onConfirm={() => mutate(undefined)}
      />
    </>
  );
};

export default AttachedClient;
