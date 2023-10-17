import { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutUsLanding from '../components/page-components/index/about-us-landing';
import LandingDetail from '../components/page-components/index/landing-details';
import MainLanding from '../components/page-components/index/main-landing';
import SalesPitch from '../components/page-components/index/sales-pitch';
import { ekatte, oblasti } from '../data/ekatte';
import { z } from 'zod';
import Head from 'next/head';

type CityPageProps = {
  city: string;
};

const CityPage: React.FC<CityPageProps> = ({ city }) => {
  // console.log(
  //   ekatte.map((ek) => ({
  //     ...ek,
  //     pathCaption: ek.label
  //       .replace('с. ', '')
  //       .replace('гр. ', '')
  //       .toLocaleLowerCase()
  //       .replaceAll(' ', '-')
  //       .replaceAll('йо', 'io')
  //       .replaceAll('ьо', 'io')
  //       .replaceAll('а', 'a')
  //       .replaceAll('б', 'b')
  //       .replaceAll('в', 'v')
  //       .replaceAll('в', 'v')
  //       .replaceAll('г', 'g')
  //       .replaceAll('д', 'd')
  //       .replaceAll('е', 'e')
  //       .replaceAll('ж', 'j')
  //       .replaceAll('з', 'z')
  //       .replaceAll('и', 'i')
  //       .replaceAll('и', 'i')
  //       .replaceAll('й', 'i')
  //       .replaceAll('к', 'k')
  //       .replaceAll('л', 'l')
  //       .replaceAll('м', 'm')
  //       .replaceAll('н', 'n')
  //       .replaceAll('о', 'o')
  //       .replaceAll('п', 'p')
  //       .replaceAll('р', 'r')
  //       .replaceAll('с', 's')
  //       .replaceAll('т', 't')
  //       .replaceAll('у', 'u')
  //       .replaceAll('ф', 'f')
  //       .replaceAll('х', 'h')
  //       .replaceAll('ц', 'ts')
  //       .replaceAll('ч', 'ch')
  //       .replaceAll('ш', 'sh')
  //       .replaceAll('щ', 'sht')
  //       .replaceAll('ъ', 'u')
  //       .replaceAll('ю', 'yu')
  //       .replaceAll('я', 'ya'),
  //   }))
  // );

  // console.log('а'.charCodeAt(0));
  // console.log('я'.charCodeAt(0));

  // const odd = ekatte.map((ek) =>
  //   ek.label
  //     .replace('с. ', '')
  //     .replace('гр. ', '')
  //     .toLowerCase()
  //     .split('')
  //     .filter((le) => le.charCodeAt(0) < 1072 || le.charCodeAt(0) > 1103)
  // );

  // console.log(odd);

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
        <title>
          {`Geomasters - Геодезически услуги в ${
            city && city[0].toLocaleLowerCase() === 'в' ? 'във' : 'в'
          } ${city ? `${city} и района` : 'цялата страна'}`}
        </title>
        <meta
          name="description"
          content={`Търсите геодезист в района на ${city}? Трасиране на имоти | Кадастър | Проектиране на сгради | Заснемания | Изготвяне на ПУП`}
        />
      </Head>
      <MainLanding city={city} />
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
          <SalesPitch city={city} />
          <AboutUsLanding />
        </motion.div>
      </Box>
      <LandingDetail />
    </>
  );
};

export default CityPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const ParamsSchema = z.object({ city: z.string() });

  try {
    const { city } = ParamsSchema.parse(query);

    const oblast = oblasti.find((ob) => ob.pathCaption === city);
    if (oblast) {
      return {
        props: { city: oblast.label },
      };
    }

    const settlements = ekatte.filter((ek) => ek.pathCaption === city);
    // console.log(settlements);

    if (settlements.length === 0) {
      throw '';
    }

    const settlement = settlements.filter((se) => se.label.startsWith('гр.'));
    if (settlement.length > 0) {
      return {
        props: { city: settlement[0].label },
      };
    } else {
      return {
        props: { city: settlements[0].label },
      };
    }
  } catch (error) {}
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
