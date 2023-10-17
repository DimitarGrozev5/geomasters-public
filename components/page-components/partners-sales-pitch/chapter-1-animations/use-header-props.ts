import { useMediaQuery } from '@mui/material';
import { MotionValue, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export const useHeaderAnimProps = (headerScroll: MotionValue<number>) => {
  const xl = useMediaQuery('(min-width:1500px)');
  const lg = useMediaQuery('(min-width:1000px)');
  const md = useMediaQuery('(min-width:900px)');
  const sm = useMediaQuery('(min-width:600px)');
  const xs = useMediaQuery('(max-width:599px)');

  const initMargin = useMemo(() => {
    if (xl) return '35rem';
    if (lg) return '25rem';
    if (md) return '15rem';
    if (sm) return '20rem';
    if (xs) return '20rem';
    return '20rem';
  }, [lg, md, sm, xl, xs]);

  const initRadius = useMemo(() => {
    if (xl) return '100px';
    if (lg) return '100px';
    if (md) return '100px';
    if (sm) return '50px';
    if (xs) return '50px';
    return '50px';
  }, [lg, md, sm, xl, xs]);

  const headerMargin = useTransform(
    headerScroll,
    [0, 0.7, 1],
    [initMargin, '0rem', '0rem']
  );

  const headerRadius = useTransform(
    headerScroll,
    [0, 0.4, 0.5, 1],
    [`50% ${initRadius}`, `50% ${initRadius}`, '50% 0px', '50% 0px']
  );

  return { headerMargin, headerRadius };
};
