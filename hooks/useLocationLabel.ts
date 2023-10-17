import { useMemo } from 'react';
import { ekatte, oblasti } from '../data/ekatte';

export const useLocationLabel = (targetEkatte: string) => {
  const settlement = useMemo(
    () => ekatte.find((e) => e.ekatte === targetEkatte),
    [targetEkatte]
  );
  const oblast = useMemo(
    () => oblasti.find((b) => b.id === settlement?.oblast),
    [settlement?.oblast]
  );

  return `${settlement?.label || ''}, обл.${
    oblast?.label || ''
  }, ${targetEkatte}`;
};
