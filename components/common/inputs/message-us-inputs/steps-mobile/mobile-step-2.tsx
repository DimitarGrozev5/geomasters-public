import { Box, Button, FormLabel, Stack } from '@mui/material';
import ProblemInput from '../problem-input';
import SelectLocation from '../select-location/select-location';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';
import { useImageUrl } from '../useImageUrl';
import { height } from '../../../../../utility/image-util';
import { useScreenSize } from '../../../../../hooks/use-screen-size';

type Props = {};

const rows = {
  xs: 20,
  sm: 20,
  md: 15,
  lg: 6,
  xl: 7,
};

const MobileSecondStep: React.FC<Props> = () => {
  const { watch } = useFormContext<MsgUs_FormInputs>();

  const screenSize = useScreenSize();

  return (
    <ProblemInput
      label="Опишете вашият проблем, колкото може по-подробно"
      tooShortErrMsg="Моля напишете нещо"
      minLength={1}
      rows={rows[screenSize]}
    />
  );
};

export default MobileSecondStep;
