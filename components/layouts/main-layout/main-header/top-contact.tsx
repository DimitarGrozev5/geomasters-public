import { Paper } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useScreenSize } from '../../../../hooks/use-screen-size';
import TopContactsDesktop from './top-contact-desktop';
import TopContactsMobile from './top-contact-mobile';

const TopContacts = () => {
  const screenSize = useScreenSize();

  const logout = () => {
    signOut({ redirect: false });
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          borderTop: (theme) => `5px solid ${theme.palette.primary.A500}`,
          paddingTop: 1,
          paddingBottom: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: { lg: 4, md: 3 },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        {screenSize === 'xs' || screenSize == 'sm' ? (
          <TopContactsMobile logout={logout} />
        ) : (
          <TopContactsDesktop logout={logout} />
        )}
      </Paper>
    </>
  );
};

export default TopContacts;
