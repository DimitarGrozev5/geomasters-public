import { useEffect, useMemo, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import AutocompleteElements from '../../message-us-inputs/select-location/autocpmplete-elements';
import { EkatteFormType } from '../../message-us-inputs/form-data-type';
import { SearchValue } from '../search-value-type';
import { useImageUrl } from '../../message-us-inputs/useImageUrl';
import { height } from '../../../../../utility/image-util';
import { useLocationLabel } from '../../../../../hooks/useLocationLabel';
import { ekatte } from '../../../../../data/ekatte';

type Props = {
  location: SearchValue | null;
  setLocation: (fromDate: SearchValue | null) => void;
};

const FiltersLocation: React.FC<Props> = ({ location, setLocation }) => {
  const [ekatteData, setEkatteData] = useState<EkatteFormType>(null);
  const bulgariaUrl = useImageUrl(ekatteData);
  // const label = useLocationLabel(
  //   !ekatteData || typeof ekatteData === 'string' ? '' : ekatteData.ekatte
  // );

  const autocompValue = useMemo<EkatteFormType>(() => {
    if (location === null) {
      if (ekatteData !== null && typeof ekatteData !== 'string') {
        setEkatteData(null);
      }
      return ekatteData || null;
    }

    const settlement = ekatte.find((e) => e.ekatte === location.raw);
    setEkatteData(settlement || null);

    return settlement || null;
  }, [ekatteData, location]);

  const handleChange = (data: EkatteFormType) => {
    if (data === null) {
      setLocation(null);
      setEkatteData(null);
      return;
    }

    if (typeof data === 'string') {
      setEkatteData(data);
      return;
    }

    setEkatteData(data);
    setLocation({
      type: 'ekatte',
      value: data.label,
      raw: data.ekatte,
    });
  };

  return (
    <Stack sx={{ p: 2 }} gap={2}>
      <Typography variant="subtitle1">Избор на населено място</Typography>
      <AutocompleteElements
        value={autocompValue}
        onChange={handleChange}
        onBlur={() => {}}
        error={undefined}
        oblastLabel={'Област'}
        oblastErrorMsg={''}
        settlementLabel={'Наелено място'}
        settlementErrorMsg={''}
      />

      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          height: { md: 300, xl: 300 },
          textAlign: 'center',
          mb: 1,
        }}
      >
        <Image
          src={`/images/oblasti/${bulgariaUrl}.png`}
          alt=""
          width={500}
          height={height(1600, 1280, 500)}
          style={{ width: 'auto', height: '100%' }}
        />
      </Box>
    </Stack>
  );
};

export default FiltersLocation;
