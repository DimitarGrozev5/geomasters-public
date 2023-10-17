import { Backdrop, Fade, Paper, Portal, Stack } from '@mui/material';

type Props = {
  show: boolean;
  closeHandler: () => void;
  bareBones?: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  show,
  closeHandler,
  children,
  bareBones = false,
}) => {
  return (
    <Portal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.appBar + 10 }}
        open={show}
        onClick={closeHandler}
      />
      <Fade in={show}>
        <Paper
          sx={{
            display: 'flex',

            flexDirection: 'column',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: (theme) => theme.zIndex.appBar + 10,
            transform: 'translate(-50%, -50%)',

            width: {
              xl: '50vw',
              lg: '70vw',
              md: '80vw',
              sm: '95vw',
              xs: '100vw',
            },

            boxShadow: 24,
            p: bareBones ? 0 : 4,
            overflow: 'hidden',
          }}
        >
          {children}
        </Paper>
      </Fade>
    </Portal>
  );
};

export default Modal;
