import { LoadingButton } from '@mui/lab';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useState } from 'react';
import { NewMessage } from '../../../pages/api/messages/new';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import ConfirmModal from '../../common/inputs/confirm-modal';
import { useConfiguredMutation } from '../../data-fetching/use-mutation';
import AttachedClient from './new-messages-overview/attached-client';
import ClientData from './new-messages-overview/client-data';
import ClientDescription from './new-messages-overview/client-description';
import SimilarClients from './new-messages-overview/similar-clients';
import MessageTaskOverview from './new-messages-overview/task-overview';

type Props = { msg: NewMessage };

const MessageOverview: React.FC<Props> = ({ msg }) => {
  const [showAdministrateConfirmModal, setShowAdministrateConfirmModal] =
    useState(false);

  const { isLoading, mutate: administrate } = useConfiguredMutation(
    `/api/messages/${msg.id}/administraded`,
    {
      method: 'PATCH',
    },
    ['admin', 'messages'],
    {
      alertOnSuccess: { message: 'Съобщението е администрирано' },
    }
  );

  return (
    <>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>
          {msg.administraded
            ? 'Преглед на съобщение'
            : 'Администриране на ново съобщение'}
        </PrimaryDarkText>
      </Typography>

      <ClientData msg={msg} />

      {!msg.ownerClient && <SimilarClients msg={msg} />}
      {msg.ownerClient && <AttachedClient msg={msg} />}

      <ClientDescription msg={msg} />

      {msg.ownerClient && <MessageTaskOverview msg={msg} />}

      {msg.ownerClient && msg.task && !msg.administraded && (
        <Box>
          <LoadingButton
            loading={isLoading}
            onClick={() => setShowAdministrateConfirmModal(true)}
          >
            Приключи администрирането
          </LoadingButton>
          <ConfirmModal
            show={showAdministrateConfirmModal}
            onClose={() => setShowAdministrateConfirmModal(false)}
            onConfirm={() => administrate({ data: true })}
            label="Искате ли да затворите съобщението?"
          />
        </Box>
      )}
    </>
  );
};

export default MessageOverview;
