import { Box, Stack } from '@mui/material';
import BgImage from '../../common/helper/background-image';
import bg2 from '../../../public/images/bg2.jpg';

const PageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <BgImage
          srcImg={bg2}
          sizes={{
            xs: '100vw',
            sm: '100vw',
            md: '100vw',
            lg: '100vw',
            xl: '100vw',
          }}
        />
      </Box>

      <Stack sx={{ p: { sm: 4, xs: 2 }, flex: 1 }} gap={2} alignItems="stretch">
        {children}
      </Stack>
    </Box>
  );
};

export default PageLayout;
