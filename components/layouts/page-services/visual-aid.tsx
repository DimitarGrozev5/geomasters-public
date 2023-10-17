import { Box, Card, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import BgImage from '../../common/helper/background-image';
import Modal from '../main-layout/modal/modal';

type Props = {
  srcImg: StaticImageData;
  right?: boolean;
  horizontal?: boolean;
  minHeight?: string | number;
  children: React.ReactNode;
  objectPosition?: 'center' | 'top';
  objectFit?: 'cover' | 'contain';
};

const VisualAid: React.FC<Props> = ({
  srcImg,
  minHeight,
  right = false,
  horizontal = true,
  children,
  objectPosition,
  objectFit,
}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: [`start end`, `end end`],
  });

  const imgOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9, 1],
    [0, 0.2, 0.5, 1]
  );
  const imgOffset = useTransform(scrollYProgress, [0, 1], ['-30vh', '0vh']);

  const [showImg, setShowImg] = useState(false);

  return (
    <Stack
      direction={horizontal ? 'row' : 'column'}
      alignItems="stretch"
      spacing={2}
    >
      {right && horizontal && (
        <Box sx={{ flex: 1, alignSelf: 'center' }}>{children}</Box>
      )}
      {!horizontal && (
        <Box sx={{ flex: 1, alignSelf: 'center' }}>{children}</Box>
      )}

      <Box
        component={horizontal ? 'div' : motion.div}
        style={{
          flex: 1,
          position: 'relative',
          minHeight:
            minHeight !== undefined ? minHeight : horizontal ? 0 : '50vh',
          opacity: horizontal ? 1 : imgOpacity,
          y: horizontal ? '0vh' : imgOffset,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            position: 'absolute',
            left: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
            top: (theme) => theme.spacing(2),
            bottom: (theme) => theme.spacing(2),
          }}
          ref={imgRef}
          onClick={() => setShowImg(true)}
        >
          <BgImage
            srcImg={srcImg}
            sizes={{
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '100%',
              xl: '100%',
            }}
            objectPosition={objectPosition}
            objectFit={objectFit}
          />
        </Card>
      </Box>
      {!right && horizontal && (
        <Box sx={{ flex: 1, alignSelf: 'center' }}>{children}</Box>
      )}
      {/**
       * TODO: make this a bit better and adapt it for mobile
       */}
      <Modal show={showImg} closeHandler={() => setShowImg(false)}>
        <Box
          component={horizontal ? 'div' : motion.div}
          style={{
            flex: 1,
            position: 'relative',
            minHeight: '50vh',
            opacity: horizontal ? 1 : imgOpacity,
            y: horizontal ? '0vh' : imgOffset,
          }}
        >
          <Card
            variant="outlined"
            sx={{
              position: 'absolute',
              left: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
              top: (theme) => theme.spacing(2),
              bottom: (theme) => theme.spacing(2),
            }}
            ref={imgRef}
            onClick={() => setShowImg(true)}
          >
            <BgImage
              srcImg={srcImg}
              sizes={{
                xs: '100%',
                sm: '100%',
                md: '100%',
                lg: '100%',
                xl: '100%',
              }}
              objectPosition={objectPosition}
              objectFit={objectFit}
            />
          </Card>
        </Box>
      </Modal>
    </Stack>
  );
};

export default VisualAid;
