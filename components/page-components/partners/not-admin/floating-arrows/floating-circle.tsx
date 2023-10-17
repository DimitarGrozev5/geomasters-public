import { Box, Paper } from '@mui/material';

type Props = { right?: number; left?: number; top?: number; bottom?: number };

const FloatingCircle: React.FC<Props> = ({ right, left, top, bottom }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'absolute',
        top: (theme) => (top ? theme.spacing(top) : undefined),
        bottom: (theme) => (bottom ? theme.spacing(bottom) : undefined),
        left: (theme) => (left ? theme.spacing(left) : undefined),
        right: (theme) => (right ? theme.spacing(right) : undefined),

        width: (theme) => theme.spacing(1),
        height: (theme) => theme.spacing(1),
        borderRadius: 100000,
        backgroundColor: (theme) => theme.palette.secondary.A500,
      }}
    />
  );
};

export default FloatingCircle;
