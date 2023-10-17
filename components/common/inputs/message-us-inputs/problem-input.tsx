import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from './form-data-type';

type Props = {
  label: string;
  rows?: number;
  minLength?: number;
  tooShortErrMsg: string;
};

const ProblemInput: React.FC<Props> = ({
  label,
  rows = 7,
  minLength = 50,
  tooShortErrMsg,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MsgUs_FormInputs>();

  return (
    <TextField
      sx={{ flex: 1 }}
      label={label}
      multiline
      rows={rows}
      {...register('problemDescription', {
        validate: (value) =>
          value.length >= minLength ? true : tooShortErrMsg,
      })}
      error={!!errors.problemDescription}
      helperText={errors.problemDescription?.message}
    />
  );
};

export default ProblemInput;
