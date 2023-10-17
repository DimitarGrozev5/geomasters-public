import {
  Backdrop,
  Divider,
  Fade,
  Paper,
  Portal,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import EmailContact from '../../../common/contacts/email-contact';
import PhoneContact from '../../../common/contacts/phone-contact';
import SendMessage from '../../../common/contacts/send-message';
import { emailContact, phoneContact } from '../../../../data/contacts';

type Props = {
  show: boolean;
  onClose: () => void;
  onShowMessageForm: () => void;
};

const TopContactsOverview: React.FC<Props> = ({
  show,
  onClose,
  onShowMessageForm,
}) => {
  return (
    <Portal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar + 10 }}
        open={show}
        onClick={onClose}
      />
      <Fade in={show}>
        <Paper
          sx={{
            position: 'fixed',
            top: (theme) => theme.spacing(10),
            left: '50%',
            zIndex: (theme) => theme.zIndex.appBar + 10,
            transform: 'translateX(-50%)',
            width: '90vw',
            boxShadow: 24,
            p: 4,
            pl: 7,

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 0.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{ position: 'relative', left: (theme) => theme.spacing(-3) }}
          >
            Нашите контакти:
          </Typography>

          <PhoneContact phone={phoneContact} size="body1" />
          <Divider orientation="vertical" />
          {/* <PhoneContact phone="089 477 8476" size="body1" />
          <Divider orientation="vertical" /> */}
          <EmailContact email={emailContact} size="body1" />
          <Divider orientation="vertical" />
          <Divider orientation="vertical" />

          <Typography
            variant="h6"
            sx={{ position: 'relative', left: (theme) => theme.spacing(-3) }}
          >
            Или изпратете съобщение:
          </Typography>
          <Box sx={{ alignSelf: 'flex-start' }}>
            <SendMessage onClick={onShowMessageForm} label="Съобщение" />
          </Box>
        </Paper>
      </Fade>
    </Portal>
  );
};

export default TopContactsOverview;
