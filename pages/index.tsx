import { Box, useMediaQuery, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AboutUsLanding from '../components/page-components/index/about-us-landing';
import LandingDetail from '../components/page-components/index/landing-details';
import MainLanding from '../components/page-components/index/main-landing';
import SalesPitch from '../components/page-components/index/sales-pitch';
import Head from 'next/head';

const HomePage = () => {
  const indexMiddleRef = useRef<HTMLElement>(null);

  const { scrollYProgress: indexMiddle } = useScroll({
    target: indexMiddleRef,
    offset: ['start end', 'end start'],
  });
  // const indexMiddleTop = useTransform(indexMiddle, [0, 1], ['50vh', '-50vh']);
  const indexMiddleTop = useTransform(indexMiddle, [0, 1], ['20vh', '-20vh']);

  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Геодезически услуги в цялата страна. Обеденили сме специалисти от цялата страна, за да решим вашия проблем."
        />
      </Head>
      <MainLanding />
      <Box
        sx={{
          width: '0.1%',
          height: '120vh',
          backgroundColor: 'transparent',
        }}
        ref={indexMiddleRef}
      ></Box>
      <Box
        sx={{
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.spacing(10)})`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',

          backgroundColor: (theme) => theme.palette.background.paper,

          position: 'fixed',
          left: 0,
          right: 0,
          top: (theme) => theme.spacing(7),
          bottom: 0,
          zIndex: 0,
        }}
      >
        <motion.div
          style={{
            position: 'relative',
            // top: indexMiddleTop,
            y: indexMiddleTop,
            flexGrow: 1,
            display: 'flex',
            flexDirection: mdAndUp ? 'row' : 'column',
            alignItems: 'stretch',
          }}
        >
          <SalesPitch />
          <AboutUsLanding />
        </motion.div>
      </Box>
      <LandingDetail />
    </>
  );
};

export default HomePage;
