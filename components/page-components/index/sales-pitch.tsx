import { Box, Typography, alpha } from '@mui/material';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import PinDropIcon from '@mui/icons-material/PinDrop';
import FenceIcon from '@mui/icons-material/Fence';

import BulletPoint from '../../common/data-presentation/bullet-point';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import BgImage from '../../common/helper/background-image';
import cici from '../../../public/images/cici.jpg';
import Credits from '../../common/data-presentation/credits';

const timeoutPromise = (fn: () => void, time: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, time);
  });

type SalesPitchProps = {
  city?: string;
};

const SalesPitch: React.FC<SalesPitchProps> = ({ city }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [`start -90vh`, `end -150vh`],
  });

  const [slideText, setSlideText] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0) {
        setSlideText(true);
      }
    });
  }, [scrollYProgress]);

  const [bulletX1, setBulletX1] = useState('0vw');
  const [bulletX2, setBulletX2] = useState('0vw');
  const [bulletX3, setBulletX3] = useState('0vw');
  const [bulletX4, setBulletX4] = useState('0vw');
  const [bulletX5, setBulletX5] = useState('0vw');
  useEffect(() => {
    if (slideText) {
      (async () => {
        const offset1 = '-5vw';
        const time = 50;

        setBulletX1(offset1);
        await timeoutPromise(() => {
          setBulletX2(offset1);
        }, time);
        await timeoutPromise(() => {
          setBulletX3(offset1);
        }, time);
        await timeoutPromise(() => {
          setBulletX4(offset1);
        }, time);
        await timeoutPromise(() => {
          setBulletX5(offset1);
        }, time);

        setBulletX1('0vw');
        await timeoutPromise(() => {
          setBulletX2('0vw');
        }, time);
        await timeoutPromise(() => {
          setBulletX3('0vw');
        }, time);
        await timeoutPromise(() => {
          setBulletX4('0vw');
        }, time);
        await timeoutPromise(() => {
          setBulletX5('0vw');
        }, time);
      })();
    }
  }, [slideText]);

  return (
    <Box
      ref={targetRef}
      sx={{
        width: { md: '50%', xs: '100%' },
        // height: (theme) => `calc(100vh - ${theme.spacing(7)})`,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          flex: 1,
          position: 'relative',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 2,

          pl: 3,
          pr: 5,

          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.8),
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'right',
            textTransform: 'uppercase',
          }}
        >
          Имате нужда от{' '}
          <Box
            component="span"
            sx={{
              display: 'inline',
              fontWeight: 800,
              color: (theme) => theme.palette.primary.A800,
            }}
          >
            Геодезист{' '}
            {city ? (city[0].toLocaleLowerCase() === 'в' ? 'във ' : 'в ') : ''}
            {city ? `${city} и района` : ''}?
          </Box>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: { lg: '70%' },
            alignSelf: 'flex-end',
          }}
        >
          <Box sx={{ width: { lg: '90%', xs: '100%' }, alignSelf: 'flex-end' }}>
            <motion.div animate={{ x: bulletX1 }}>
              <BulletPoint icon={<GpsNotFixedIcon />} alignRight>
                Трасиране на имоти
              </BulletPoint>
            </motion.div>
          </Box>
          <Box sx={{ width: { lg: '90%', xs: '100%' }, alignSelf: 'flex-end' }}>
            <motion.div animate={{ x: bulletX2 }}>
              <BulletPoint icon={<HouseIcon />} alignRight>
                Проектиране и Узаконяване на сгради
              </BulletPoint>
            </motion.div>
          </Box>
          <Box sx={{ width: { lg: '90%', xs: '100%' }, alignSelf: 'flex-end' }}>
            <motion.div animate={{ x: bulletX3 }}>
              <BulletPoint icon={<FenceIcon />} alignRight>
                Коригиране на Кадастрална карта
              </BulletPoint>
            </motion.div>
          </Box>
          <Box sx={{ width: { lg: '90%', xs: '100%' }, alignSelf: 'flex-end' }}>
            <motion.div animate={{ x: bulletX4 }}>
              <BulletPoint icon={<PinDropIcon />} alignRight>
                Геодезически заснемания
              </BulletPoint>
            </motion.div>
          </Box>
          <Box sx={{ width: { lg: '90%', xs: '100%' }, alignSelf: 'flex-end' }}>
            <motion.div animate={{ x: bulletX5 }}>
              <BulletPoint icon={<MapIcon />} alignRight>
                Изготвяне на ПУП
              </BulletPoint>
            </motion.div>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            alignSelf: 'flex-end',
          }}
        >
          ЗА ВСЕКИ{' '}
          <Box
            sx={{
              display: 'inline',
              color: (theme) => theme.palette.secondary.A500,
            }}
          >
            ПРОБЛЕМ
          </Box>{' '}
          ИМА{' '}
          <Box
            sx={{
              display: 'inline',
              color: (theme) => theme.palette.primary.A500,
            }}
          >
            РЕШЕНИЕ
          </Box>
        </Typography>
      </Box>
      <Box
        sx={{
          width: { md: '100%', xs: '100%' },
          flex: 1,
          overflow: 'hidden',
          position: { md: 'relative', xs: 'absolute' },
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BgImage
          sizes={{
            xs: '100vw',
            sm: '100vw',
            md: '100vw',
            lg: '50vw',
            xl: '50vw',
          }}
          srcImg={cici}
          priority
        />
        <Credits opacity={0.5}>4056451 © Benkrut | Dreamstime.com</Credits>
      </Box>
    </Box>
  );
};

export default SalesPitch;
