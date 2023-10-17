import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { FieldError, Noop } from 'react-hook-form';
import { ekatte, EkatteData, oblasti } from '../../../../../data/ekatte';
import { EkatteFormType } from '../form-data-type';

type Props = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: EkatteFormType;
  error: FieldError | undefined;
  oblastLabel: string;
  oblastErrorMsg: string;
  settlementLabel: string;
  settlementErrorMsg: string;
};

const AutocompleteElements: React.FC<Props> = ({
  onChange,
  onBlur,
  value,
  error,
  oblastLabel,
  oblastErrorMsg,
  settlementLabel,
  settlementErrorMsg,
}) => {
  let oblastId: null | string;
  if (typeof value === 'string') {
    oblastId = value;
  } else if (!value) {
    oblastId = null;
  } else {
    oblastId = value.oblast;
  }

  const oblastValue = !oblastId ? null : oblasti.find((o) => o.id === oblastId);
  if (oblastValue === undefined) {
    onChange(null);
  }

  let settlementValue: null | EkatteData = null;
  if (typeof value !== 'string') {
    settlementValue = value;
  }

  // Filter out settlements by oblast
  const filteredSettlements: EkatteData[] = useMemo(
    () =>
      oblastId === null
        ? ekatte.map((e) => ({ ...e, label: `${e.label}, ${e.ekatte}` }))
        : ekatte.flatMap((e) => {
            if (e.oblast === oblastId) {
              return { ...e, label: `${e.label}, ${e.ekatte}` };
            }
            return [];
          }),
    [oblastId]
  );

  const [settlementIsTouched, setSettlementIsTouched] = useState(false);

  const showOblastError = useMemo(
    () => !!error && oblastErrorMsg === error.message,
    [error, oblastErrorMsg]
  );
  const showSettlementError = useMemo(
    () => !!error && settlementErrorMsg === error.message,
    [error, settlementErrorMsg]
  );

  useEffect(() => {
    if (!settlementIsTouched && value !== null && typeof value !== 'string') {
      setSettlementIsTouched(true);
    }
  }, [settlementIsTouched, value]);

  return (
    <>
      <Autocomplete
        disablePortal
        options={oblasti}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        groupBy={(option) => option.label.charAt(0)}
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={oblastLabel}
            error={showOblastError}
            helperText={showOblastError ? error?.message : undefined}
          />
        )}
        ListboxProps={{ style: { height: 300 } }}
        value={oblastValue}
        onChange={(e, val) => {
          const id = val ? val.id : null;
          onChange(id);
        }}
        onBlur={onBlur}
      />

      <Autocomplete
        disablePortal
        options={filteredSettlements}
        isOptionEqualToValue={(option, value) => option.ekatte === value.ekatte}
        groupBy={(option) => option.label.split('. ')[1].charAt(0)}
        sx={{ width: '100%' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={settlementLabel}
            error={showSettlementError}
            helperText={showSettlementError ? error?.message : undefined}
          />
        )}
        ListboxProps={{ style: { height: 300 } }}
        value={settlementValue}
        onChange={(e, val) => {
          if (val === null) {
            onChange(oblastId);
            return;
          }
          onChange(val);
        }}
        onBlur={() => {
          setSettlementIsTouched(true);
          onBlur();
        }}
      />
    </>
  );
};

export default React.memo(AutocompleteElements);
