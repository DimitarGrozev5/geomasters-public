import React, { useState } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { useIsLandingPage } from '../../../config/landingPages';
import BreakpointView from '../../common/helper/breakpoint-view';
import MainFooter from './main-footer';
import MainHeader from './main-header/main-header';
import InitLoader from '../../common/helper/init-loader';
import SendMessageOverlay from '../send-message-overlay/send-message-overlay';
import { GlobalContext } from './context/global-ctx';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  // If we are on a landing page, make the header transparent
  const isLandingPage = useIsLandingPage();

  const [showMessageForm, setShowMessageForm] = useState(false);
  return (
    <GlobalContext.Provider
      value={{ openSendMessage: () => setShowMessageForm(true) }}
    >
      {/* {process.env.NODE_ENV === 'production' && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10000000,

            textAlign: 'center',
            backgroundColor: 'red',
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant="h6">
            В момента се разработва! За контакт и въпроси:
            geomasters.net@gmail.com
          </Typography>
        </Box>
      )} */}
      {process.env.NODE_ENV === 'development' && <BreakpointView show={true} />}
      <SendMessageOverlay
        show={showMessageForm}
        onClose={() => setShowMessageForm(false)}
      />
      <InitLoader />
      <Stack
        sx={{
          position: 'relative',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
        }}
        alignItems="center"
      >
        <MainHeader transparentHeader={isLandingPage} />

        <Stack
          component="main"
          justifyContent={'flex-start'}
          alignItems={'stretch'}
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: (theme) => ({
              xs: `calc(100vh - ${theme.spacing(15)})`,
              md: `calc(100vh - ${theme.spacing(24)})`,
            }),
          }}
        >
          {children}
        </Stack>

        <MainFooter />
      </Stack>
    </GlobalContext.Provider>
  );
};

export default MainLayout;
