import AccountCircle from '@mui/icons-material/AccountCircle';
import { InputAdornment, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MsgUs_FormInputs } from '../form-data-type';

type Props = {
  label: string;
};

const NameInput: React.FC<Props> = ({ label }) => {
  const { register } = useFormContext<MsgUs_FormInputs>();

  return (
    <TextField
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      {...register('name')}
    />
  );
};
export default NameInput;
