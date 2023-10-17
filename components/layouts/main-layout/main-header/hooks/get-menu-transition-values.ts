import { alpha, useTheme } from '@mui/material';
import { MotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useMenuIsFixed = (scrollPosition: MotionValue<number>) => {
  const [menuIsFixed, setMenuIsFixed] = useState(false);

  useEffect(() => {
    return scrollPosition.onChange((latest) => {
      if (latest > 0) {
        setMenuIsFixed(true);
      } else {
        setMenuIsFixed(false);
      }
    });
  }, [scrollPosition]);

  return menuIsFixed;
};

export const useMenuPadding = (scrollPosition: MotionValue<number>) => {
  const theme = useTheme();

  return useTransform(
    scrollPosition,
    [0, 0.58, 1],
    [theme.spacing(6), theme.spacing(1), theme.spacing(1)]
  );
};

export const useMenuOpacity = (scrollPosition: MotionValue<number>) => {
  const theme = useTheme();

  return useTransform(
    scrollPosition,
    [0, 1],
    [
      alpha(theme.palette.background.default, 0),
      alpha(theme.palette.background.default, 1),
    ]
  );
};
