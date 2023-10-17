import { Box, Button, FormLabel, Stack } from '@mui/material';
import ProblemInput from '../problem-input';
import SelectLocation from '../select-location/select-location';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import { useImageUrl } from '../useImageUrl';
import { height } from '../../../../../utility/image-util';
import { useScreenSize } from '../../../../../hooks/use-screen-size';

type Props = {
  goBack: () => void;
  handleMoveToStep3: () => void;
};

const rows = {
  xs: 6,
  sm: 6,
  md: 10,
  lg: 6,
  xl: 7,
};

const SecondStep: React.FC<Props> = ({ goBack, handleMoveToStep3 }) => {
  const { watch } = useFormContext<MsgUs_FormInputs>();

  const selectedEkatte = watch('ekatte');
  const bulgariaUrl = useImageUrl(selectedEkatte);

  const screenSize = useScreenSize();

  return (
    <Stack gap={0}>
      <FormLabel sx={{ pb: 1 }}>Къде се намира обектът</FormLabel>

      <Stack direction="row" gap={1} alignItems="stretch">
        <Stack gap={5} justifyContent="center" width="50%">
          <SelectLocation
            oblastLabel="Област"
            settlementLabel="Населено място"
            oblastErrorMsg="Моля изберете област"
            settlementErrorMsg="Моля изберете населено място"
          />
        </Stack>

        <Box
          sx={{
            width: '50%',
            overflow: 'hidden',
            height: { md: 180, xl: 250 },
            textAlign: 'center',
            mb: 1,
          }}
        >
          <Image
            src={`/images/oblasti/${bulgariaUrl}.png`}
            alt=""
            width={500}
            height={height(1600, 1280, 600)}
            style={{ width: 'auto', height: '100%' }}
          />
        </Box>
      </Stack>

      <ProblemInput
        label="Опишете вашият проблем, колкото може по-подробно"
        tooShortErrMsg="Моля напишете нещо"
        minLength={1}
        rows={rows[screenSize]}
      />

      <Stack direction="row" justifyContent="space-between">
        <Button onClick={goBack}>Назад</Button>
        <Button onClick={handleMoveToStep3}>Към Завършване</Button>
      </Stack>
    </Stack>
  );
};

export default SecondStep;
