import { Box, Button, Divider, Stack } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import SendMessage from '../../../common/contacts/send-message';
import { useGlobalContext } from '../context/global-ctx';
import TopContactsOverview from './top-contacts-overview';

const TopContactsMobile = ({ logout }: { logout: () => void }) => {
  const [showOverviewModal, setShowOverviewModal] = useState(false);

  const { openSendMessage } = useGlobalContext();

  const showMessageFormHandler = () => {
    setShowOverviewModal(false);
    openSendMessage();
  };

  const { loggedIn } = useAuth();

  return (
    <>
      <TopContactsOverview
        show={showOverviewModal}
        onClose={() => {
          setShowOverviewModal(false);
        }}
        onShowMessageForm={showMessageFormHandler}
      />
      <SendMessage
        onClick={() => setShowOverviewModal(true)}
        label="За контакти"
      />
      <Stack
        direction="row"
        alignItems="stretch"
        justifyContent="space-between"
        sx={{ position: { lg: 'absolute' }, right: 0 }}
      >
        <Box>
          <Divider orientation="vertical" sx={{ height: '100%' }} />
        </Box>
        {loggedIn ? (
          <Button onClick={logout}>Отписване</Button>
        ) : (
          <Button component={Link} href="/partners">
            За геодезисти
          </Button>
        )}
      </Stack>
    </>
  );
};

export default TopContactsMobile;
