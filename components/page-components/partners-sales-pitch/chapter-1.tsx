import { Box, Card, Typography } from '@mui/material';
import BgImage from '../../common/helper/background-image';

import headerBgImg from '../../../public/images/partners/cici2.jpg';
import logoImg from '../../../public/logo.png';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../common/display-modifiers/secondary-dark-text';
import { useHeaderAnimProps } from './chapter-1-animations/use-header-props';
import { useInitQuestionsProps } from './chapter-1-animations/use-init-questions-props';
import { useMainPitchProps } from './chapter-1-animations/use-main-pitch-props';

const PartnersChapter1: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  });

  // useEffect(() => headerScroll.onChange((s) => console.log(s)), [headerScroll]);

  const { headerMargin, headerRadius } = useHeaderAnimProps(headerScroll);

  const { x1, op1, x2, op2, x3, op3, x4, op4, xLogo, opLogo, headingOffset } =
    useInitQuestionsProps(headerScroll);

  const { oPitch } = useMainPitchProps(headerScroll);

  return (
    <>
      <Box
        ref={headerRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: (theme) => theme.palette.background.paper,
          position: 'relative',
          minHeight: (theme) => ({
            xl: `calc(100vh + ${theme.spacing(0)})`,
            xs: `calc(100vh + ${theme.spacing(5)})`,
          }),
          mb: 40,

          '&:after': {
            content: '" "',

            position: 'absolute',
            left: 0,
            right: 0,
            bottom: { xl: -20, lg: -4, xs: 0 },
            // border: '1px solid red',
            height: (theme) => theme.spacing(20),
            zIndex: 2,
            transform: 'skewY(-4deg) translateY(50px)',
            backgroundColor: (theme) => theme.palette.background.paper,
          },
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <BgImage
            srcImg={headerBgImg}
            objectFit="contain"
            objectPosition="top"
            sizes={{
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '100%',
              xl: '100%',
            }}
          />
        </Box>
        <Box
          component={motion.div}
          sx={{
            flex: 1,
            p: 15,
            pt: 15,

            position: 'relative',
            zIndex: 2,

            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.3)',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
          style={{
            marginTop: headerMargin,
            borderTopLeftRadius: headerRadius,
            borderTopRightRadius: headerRadius,
          }}
        >
          <motion.div style={{ y: '2rem' }} animate={{ y: headingOffset }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 400, textAlign: 'center' }}
            >
              <PrimaryDarkText colorVariant="A900">
                Защо да станеш партньор на GeoMasters?
              </PrimaryDarkText>
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
            <Box
              sx={{ flex: 1, position: 'relative' }}
              component={motion.div}
              style={{ x: '-30rem', opacity: 0 }}
              animate={{ x: xLogo, opacity: opLogo }}
            >
              <BgImage
                srcImg={logoImg}
                objectFit="contain"
                sizes={{
                  xs: '100%',
                  sm: '100%',
                  md: '100%',
                  lg: '100%',
                  xl: '100%',
                }}
              />
            </Box>
            <Box
              sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <motion.div
                style={{ x: '30rem', opacity: 0 }}
                animate={{ x: x1, opacity: op1 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 400 }}>
                  <SecondaryDarkText colorVariant="A900">
                    Омръзнало ти e да работиш недооценена и нископлатена работа
                    в голяма фирма?
                  </SecondaryDarkText>
                </Typography>
              </motion.div>

              <motion.div
                style={{ x: '30rem', opacity: 0 }}
                animate={{ x: x2, opacity: op2 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 400 }}>
                  <SecondaryDarkText colorVariant="A900">
                    Изморил си се да нямаш контрол върху работата си и времето
                    си?
                  </SecondaryDarkText>
                </Typography>
              </motion.div>

              <motion.div
                style={{ x: '30rem', opacity: 0 }}
                animate={{ x: x3, opacity: op3 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 400 }}>
                  <SecondaryDarkText colorVariant="A900">
                    Мечтаеш ли да започнеш работа самостоятелно, но се
                    притесняваш от разходите и предизвикателствата?
                  </SecondaryDarkText>
                </Typography>
              </motion.div>

              <motion.div
                style={{ x: '30rem', opacity: 0 }}
                animate={{ x: x4, opacity: op4 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  <PrimaryDarkText colorVariant="A900">
                    Ние от GeoMasters разбираме вашите затруднения и сме тук, за
                    да помогнем.
                  </PrimaryDarkText>
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </Box>
        <Card
          component={motion.div}
          style={{ opacity: 0 }}
          animate={{ opacity: oPitch }}
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 3,

            transform: {
              xl: 'translateX(25vw) translateY(20vh)',
              xs: 'translateX(15vw) translateY(20vh)',
            },

            width: { xl: '50%', xs: '70%' },
            backgroundColor: (theme) => theme.palette.primary.A50,
            p: 4,
          }}
          elevation={6}
        >
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            <PrimaryDarkText>
              Нашата цел е да свързваме независими геодезисти, като вас, с
              клиенти които се нуждаят от услугите ви. Това означава, че можете
              да се фокусирате върху това, в което ви бива - да предоставяте
              висококачествени услуги на вашите клиенти - без ограниченията,
              свързани с работа в голяма фирма. Да работиш за себе си може да
              бъде изключително удовлетворяващо и доходоносно. Нашата цел е да
              го направим и възможно най-лесно.
            </PrimaryDarkText>
          </Typography>
        </Card>
      </Box>
    </>
  );
};

export default PartnersChapter1;
