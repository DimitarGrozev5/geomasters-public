import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  alpha,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ViberSwitch from '../../viber-swtch';
import { MsgUs_FormInputs } from '../form-data-type';

type Props = {
  phonelabel: string;
  viberlabel: string | React.ReactElement;
  invalidWarningMsg: string;
  emptyErrorMessage: string;
  warningTrottleDuration?: number;
};

const PhoneInput: React.FC<Props> = ({
  phonelabel,
  viberlabel,
  invalidWarningMsg,
  emptyErrorMessage,
  warningTrottleDuration = 1000,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<MsgUs_FormInputs>();
  const phone = watch('phone');

  const [phoneWarning, setPhoneWarning] = useState<false | string>(false);

  useEffect(() => {
    const sanitizedPhone = !!phone ? phone.replaceAll(' ', '') : '';
    const isValidPhone =
      phone === '' || /^((\+359)|0)\d{9}$/.test(sanitizedPhone);

    let timer: NodeJS.Timeout;
    if (!isValidPhone) {
      timer = setTimeout(() => {
        setPhoneWarning(invalidWarningMsg);
      }, warningTrottleDuration);
    } else {
      setPhoneWarning(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [invalidWarningMsg, phone, warningTrottleDuration]);

  return (
    <>
      <TextField
        label={phonelabel}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LocalPhoneIcon />
            </InputAdornment>
          ),
        }}
        {...register('phone', {
          validate: {
            atLeastOne: (phone) => {
              // If the email is not empty check if it is valid
              if (phone !== '') {
                return true;
              }
              return emptyErrorMessage;
            },
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      {phone !== '' && (
        <FormControlLabel
          control={<ViberSwitch />}
          label={viberlabel}
          {...register('hasViber')}
        />
      )}
      {phoneWarning && <Alert severity="warning">{phoneWarning}</Alert>}
    </>
  );
};
export default PhoneInput;
