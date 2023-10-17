import { Box } from '@mui/material';
import { useScreenSize } from '../../../hooks/use-screen-size';

const BreakpointView = ({ show }: { show: boolean }) => {
  const size = useScreenSize();
  return (
    <>
      {show && (
        <Box
          sx={{
            position: 'fixed',
            top: 1,
            left: 1,
            zIndex: 100000,
          }}
        >
          {size.toUpperCase()}
        </Box>
      )}
    </>
  );
};

export default BreakpointView;
