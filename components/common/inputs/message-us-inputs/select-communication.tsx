import { RadioGroup, Stack } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import CardRadio from '../card-radio';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
  UseFormStateReturn,
} from 'react-hook-form';
import { ReactElement, JSXElementConstructor } from 'react';
import { MsgUs_FormInputs } from './form-data-type';

type Props = {
  labels: { email: string; phone: string; viber: string };
  disabledLabels: { email: string; viber: string };
};

const SelectCommunication: React.FC<Props> = ({ labels, disabledLabels }) => {
  const { control, watch } = useFormContext<MsgUs_FormInputs>();

  const hasEmail = watch('email') !== '';
  const hasViber = watch('hasViber');

  return (
    <Controller
      name={'meansOfContact'}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={value}
          onChange={(e, val) => onChange(val)}
          name="radio-buttons-group"
        >
          <Stack
            gap={3}
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            sx={{ width: '100%' }}
          >
            <CardRadio
              selectedValue={value}
              value={'phone'}
              icon={<LocalPhoneIcon fontSize="large" />}
              label={labels.phone}
              onSelect={() => onChange('phone')}
            />
            <CardRadio
              selectedValue={value}
              value={'viber'}
              icon={<EmailIcon fontSize="large" />}
              label={labels.viber}
              onSelect={() => onChange('viber')}
              disabled={!hasViber}
              disabledLabel={disabledLabels.viber}
            />
            <CardRadio
              selectedValue={value}
              value={'email'}
              icon={<EmailIcon fontSize="large" />}
              label={labels.email}
              onSelect={() => onChange('email')}
              disabled={!hasEmail}
              disabledLabel={disabledLabels.email}
            />
          </Stack>
        </RadioGroup>
      )}
    />
  );
};

export default SelectCommunication;
