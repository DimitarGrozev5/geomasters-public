import { Box, Paper } from '@mui/material';

type Props = {
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
  width: number;
  children: React.ReactNode;
};

const FloatingContent: React.FC<Props> = ({
  right,
  left,
  top,
  bottom,
  width,
  children,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'absolute',
        top: (theme) => (top ? theme.spacing(top) : undefined),
        bottom: (theme) => (bottom ? theme.spacing(bottom) : undefined),
        left: (theme) => (left ? theme.spacing(left) : undefined),
        right: (theme) => (right ? theme.spacing(right) : undefined),

        width: (theme) => (width ? theme.spacing(width) : undefined),

        border: '1px solid black',
        borderRadius: (theme) => theme.spacing(1),
        borderColor: (theme) => theme.palette.secondary.A500,
        p: 1,
      }}
    >
      {children}
    </Paper>
  );
};

export default FloatingContent;
