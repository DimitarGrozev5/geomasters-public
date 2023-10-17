import { Box } from '@mui/material';
import { height } from '@mui/system';

type Props = {
  gap?: number;
};

const Spacer: React.FC<Props> = ({ gap = 1 }) => {
  return <Box sx={{ height: (theme) => theme.spacing(gap) }}></Box>;
};

export default Spacer;
