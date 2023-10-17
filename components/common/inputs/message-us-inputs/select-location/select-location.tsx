import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ekatte, EkatteData, oblasti } from '../../../../../data/ekatte';
import { MsgUs_FormInputs } from '../form-data-type';
import AutocompleteElements from './autocpmplete-elements';

type Props = {
  oblastLabel: string;
  settlementLabel: string;
  oblastErrorMsg: string;
  settlementErrorMsg: string;
};

const SelectLocation: React.FC<Props> = ({
  oblastLabel,
  settlementLabel,
  oblastErrorMsg,
  settlementErrorMsg,
}) => {
  // Get form data
  const { control } = useFormContext<MsgUs_FormInputs>();

  return (
    <>
      <Controller
        name="ekatte"
        control={control}
        rules={{
          validate: (value) => {
            if (value === null) return oblastErrorMsg;
            if (typeof value === 'string') return settlementErrorMsg;
            return true;
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <AutocompleteElements
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={error}
            oblastLabel={oblastLabel}
            oblastErrorMsg={oblastErrorMsg}
            settlementLabel={settlementLabel}
            settlementErrorMsg={settlementErrorMsg}
          />
        )}
      />
    </>
  );
};

export default SelectLocation;
