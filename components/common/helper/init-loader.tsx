import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

const InitLoader = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 200);
  }, []);

  return (
    <>
      {show && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.appBar + 1000,

            backgroundColor: (theme) => theme.palette.background.paper,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default InitLoader;
