import { useEffect, useState } from 'react';
import { OblastData } from '../../../../data/ekatte';
import { EkatteFormType } from './form-data-type';

export const useImageUrl = (selectedEkatte: EkatteFormType) => {
  // Select the image for the oblast
  const [bulgariaUrl, setBulgariaUrl] = useState('oblasti');
  useEffect(() => {
    // Select the image
    let oblastId: null | string;
    if (selectedEkatte === null) {
      oblastId = null;
    } else if (typeof selectedEkatte === 'string') {
      oblastId = selectedEkatte;
    } else {
      oblastId = selectedEkatte.oblast;
    }
    const imageName = oblastId ? oblastId : 'oblasti';
    setBulgariaUrl(imageName);
  }, [selectedEkatte]);

  return bulgariaUrl;
};
