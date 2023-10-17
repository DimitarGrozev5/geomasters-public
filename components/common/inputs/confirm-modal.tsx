import {
  Backdrop,
  Box,
  Button,
  Fade,
  Paper,
  Portal,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
  show: boolean;
  onClose: () => void;
  label?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  hardWord?: string;
};

const ConfirmModal: React.FC<Props> = ({
  show,
  onClose,
  label = 'Сигурни ли сте?',
  onConfirm,
  onCancel = () => {},
  hardWord,
}) => {
  const [word, setWord] = useState('');
  const wordHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setWord(e.target.value);
  };

  const okButtonHandler = () => {
    if (hardWord !== undefined && word !== hardWord) {
      return;
    }
    onConfirm();
    onClose();
  };

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
            top: '50%',
            left: '50%',
            zIndex: (theme) => theme.zIndex.appBar + 10,
            transform: 'translate(-50%, -50%)',
            width: { lg: '30vw', xl: '30vw' },
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5">Моля потвърдете</Typography>
          <Typography variant="body1">{label}</Typography>
          {hardWord !== undefined && (
            <>
              <Typography variant="body1">
                Въведете следният текст, за да потвърдите действието:{' '}
                <Box
                  component="span"
                  sx={{ color: (theme) => theme.palette.error.main }}
                >
                  {hardWord}
                </Box>
              </Typography>
              <TextField value={word} onChange={wordHandler} />
            </>
          )}
          <Stack direction="row" justifyContent="space-around">
            <Button
              onClick={() => {
                onCancel();
                onClose();
              }}
            >
              Откажи
            </Button>
            <Button
              disabled={hardWord !== undefined && word !== hardWord}
              onClick={okButtonHandler}
            >
              Приеми
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Portal>
  );
};

export default ConfirmModal;
