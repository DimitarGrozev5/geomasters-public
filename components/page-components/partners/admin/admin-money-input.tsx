import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { CreditMovementReason } from '@prisma/client';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { QueryKey } from 'react-query';
import { creditMovementReasonValues } from '../../../../data/money-movement-reasons';
import { DetailedPartner } from '../../../../pages/api/partners/[partnerId]';
import { useConfiguredMutation } from '../../../data-fetching/use-mutation';

type Props = { partner: DetailedPartner; invalidates: QueryKey };

type MoneyInputForm = {
  amount: number;
  reason: CreditMovementReason | '';
};

const AdminMoneyInput: React.FC<Props> = ({ partner, invalidates }) => {
  const { register, watch, control, handleSubmit } = useForm<MoneyInputForm>({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      reason: '',
    },
  });

  const { isLoading, mutate } = useConfiguredMutation(
    `/api/partners/${partner.id}/creditBalance`,
    {
      method: 'PATCH',
    },
    invalidates,
    { alertOnSuccess: { message: 'Успешно извършена операция със средства' } }
  );

  const reason = watch('reason');

  const textLabel = useMemo(() => {
    switch (reason) {
      case 'PARTNER_INPUT':
        return 'Партньорът е внесъл сума';
      case 'PARTNER_SPEND_ON_TASK':
        return 'Партньорът е похарчил за такса';
      case 'PARTNER_WITHDRAW':
        return 'Партньорът е поискал да изтегли пари';
      case 'ADMIN_REFUND_TASK':
        return 'Администратор възстановява сума';
      case 'ADMIN_CORRECT_ERROR':
        return 'Администратор коригира грешка';

      default:
        return 'Изберете причина за внасяне';
    }
  }, [reason]);

  return (
    <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
      <TextField
        label={textLabel}
        disabled={reason === null}
        {...register('amount', {
          min: reason !== 'ADMIN_CORRECT_ERROR' ? 0 : undefined,
        })}
        sx={{ flex: 1 }}
      />
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="reason-select">Причина</InputLabel>
        <Controller
          control={control}
          name="reason"
          rules={{ validate: (val) => val !== '' }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Select
              id="reason-select"
              label="Причина"
              value={value}
              onChange={onChange}
              sx={{ flex: 1 }}
              error={!!error}
            >
              {creditMovementReasonValues.map((val) => (
                <MenuItem key={val.value} value={val.value}>
                  {val.caption}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <LoadingButton
        loading={isLoading}
        onClick={handleSubmit((form) => {
          mutate({ data: form });
        })}
      >
        Изпрати
      </LoadingButton>
    </Stack>
  );
};

export default AdminMoneyInput;
