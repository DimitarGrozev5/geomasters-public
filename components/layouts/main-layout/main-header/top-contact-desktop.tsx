import { Box, Button, Divider, Paper, Stack } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../../../hooks/useAuth';
import { assertDefined } from '../../../../utility/assertContext';

import EmailContact from '../../../common/contacts/email-contact';
import PhoneContact from '../../../common/contacts/phone-contact';
import SendMessage from '../../../common/contacts/send-message';
import { useGlobalContext } from '../context/global-ctx';
import { emailContact, phoneContact } from '../../../../data/contacts';

const TopContactsDesktop = ({ logout }: { logout: () => void }) => {
  const { loggedIn, isAdmin } = useAuth();

  const { openSendMessage } = useGlobalContext();

  return (
    <>
      <Divider orientation="vertical" />
      <PhoneContact phone={phoneContact} size="caption" />
      <Divider orientation="vertical" />
      {/* <PhoneContact phone="089 477 8476" size="caption" />
      <Divider orientation="vertical" /> */}
      <EmailContact email={emailContact} size="caption" />
      <Divider orientation="vertical" />
      <SendMessage onClick={openSendMessage} label="Направете запитване" />
      <Divider orientation="vertical" />
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

export default TopContactsDesktop;
