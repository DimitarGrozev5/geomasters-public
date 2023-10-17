import { MotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useMainPitchProps = (headerScroll: MotionValue<number>) => {
  const [oPitch, setOPitch] = useState(0);

  useEffect(
    () =>
      headerScroll.onChange((latest) => {
        if (latest > 0.6 && latest < 0.95) {
          setOPitch(1);
        }
        if (latest > 0.95) {
          setOPitch(0);
        }
      }),
    [headerScroll]
  );

  return { oPitch };
};
