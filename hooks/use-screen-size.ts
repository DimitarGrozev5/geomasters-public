import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Function returns the size of the screen
 * according to MUI breakpoints
 * Function is set to default xl
 * and updates the size after the first render
 * on the client
 */
export const useScreenSize = (): ScreenSize => {
  /**
   * The screen size is saved in a state and updated trough useEffect
   * This ensures there are no hidration errors where the server renders
   * one thing and the client an other
   */
  const [screenSize, setScreenSize] = useState<ScreenSize>('xl');

  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));

  useEffect(() => {
    if (xs) setScreenSize('xs');
    if (sm) setScreenSize('sm');
    if (md) setScreenSize('md');
    if (lg) setScreenSize('lg');
    if (xl) setScreenSize('xl');
  }, [lg, md, sm, xl, xs]);

  return screenSize;
};
