import { Box, Stack, useMediaQuery } from '@mui/material';

import { StaticImageData } from 'next/image';
import BgImage from '../../common/helper/background-image';

import PageCard from '../page-card/page-card';

type Props = {
  sideImage: StaticImageData;
  children: React.ReactNode;
};

const ServicePage: React.FC<Props> = ({ sideImage, children }) => {
  const showSideImage = useMediaQuery('(min-width:1400px)');
  const bigPadding = useMediaQuery('(min-width:600px)');

  return (
    <PageCard sx={{ flexDirection: 'row', gap: 8, p: bigPadding ? 6 : 2 }}>
      {showSideImage && (
        <Box
          sx={{
            flex: 1,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: (theme) => theme.spacing(-6),
              right: 0,
              top: (theme) => theme.spacing(-6),
              bottom: (theme) => theme.spacing(-6),
            }}
          >
            <BgImage
              srcImg={sideImage}
              sizes={{
                xs: '100%',
                sm: '100%',
                md: '100%',
                lg: '100%',
                xl: '100%',
              }}
            />
          </Box>
        </Box>
      )}
      <Stack sx={{ flex: 2 }}>{children}</Stack>
    </PageCard>
  );
};

export default ServicePage;
