import { Box, Paper } from '@mui/material';

type Props = {
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
  length: number;
};

const FloatingHorizontalLine: React.FC<Props> = ({
  right,
  left,
  top,
  bottom,
  length,
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

        width: (theme) => theme.spacing(length),
        height: (theme) => theme.spacing(0.3),
        backgroundColor: (theme) => theme.palette.secondary.A500,
      }}
    />
  );
};

export default FloatingHorizontalLine;
