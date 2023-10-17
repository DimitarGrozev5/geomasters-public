import EmailIcon from '@mui/icons-material/Email';
import { InputAdornment, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';

type Props = {
  label: string;
  invalidErrMsg: string;
};

const EmailInput: React.FC<Props> = ({ label, invalidErrMsg }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MsgUs_FormInputs>();

  return (
    <TextField
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      {...register('email', {
        validate: {
          atLeastOne: (email) => {
            // If the email is not empty check if it is valid
            if (email === '') return true;

            return /\S+@\S+\.\S+/.test(email) ? true : invalidErrMsg;
          },
        },
      })}
      error={!!errors.email}
      helperText={errors.email?.message}
    />
  );
};
export default EmailInput;
