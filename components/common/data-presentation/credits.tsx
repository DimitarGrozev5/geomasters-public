import { alpha, Typography } from '@mui/material';

type Props = {
  children: string;
  opacity?: number;
};

const Credits: React.FC<Props> = ({ children, opacity = 0.3 }) => {
  return (
    <Typography
      sx={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        color: alpha('#000000', opacity),
      }}
    >
      {children}
    </Typography>
  );
};

export default Credits;
