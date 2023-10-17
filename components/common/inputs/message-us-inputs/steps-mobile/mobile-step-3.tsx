import { Box, Button, FormLabel, Stack } from '@mui/material';
import ProblemInput from '../problem-input';
import SelectLocation from '../select-location/select-location';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import { useImageUrl } from '../useImageUrl';
import { height } from '../../../../../utility/image-util';
import { useScreenSize } from '../../../../../hooks/use-screen-size';
import { useMemo } from 'react';

type Props = {};

const MobileThirdStep: React.FC<Props> = () => {
  const { watch } = useFormContext<MsgUs_FormInputs>();

  const selectedEkatte = watch('ekatte');
  const bulgariaUrl = useImageUrl(selectedEkatte);

  const screenSize = useScreenSize();
  const imgSize = useMemo(
    () =>
      screenSize === 'xs' || screenSize == 'sm'
        ? { width: '100%', height: 'auto' }
        : { width: 'auto', height: '100%' },
    [screenSize]
  );

  return (
    <Stack gap={0} sx={{ width: '100%' }}>
      <FormLabel sx={{ pb: 1 }}>Къде се намира обектът</FormLabel>

      <Stack
        direction="column"
        gap={1}
        alignItems="stretch"
        justifyContent="space-between"
      >
        <Stack gap={2} justifyContent="center" width="100%">
          <SelectLocation
            oblastLabel="Област"
            settlementLabel="Населено място"
            oblastErrorMsg="Моля изберете област"
            settlementErrorMsg="Моля изберете населено място"
          />
        </Stack>

        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            height: { md: 180 },
            textAlign: 'center',
            mb: 1,
          }}
        >
          <Image
            src={`/images/oblasti/${bulgariaUrl}.png`}
            alt=""
            width={500}
            height={height(1600, 1280, 600)}
            style={imgSize}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default MobileThirdStep;
