import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, Typography } from '@mui/material';
import { SearchValue } from './search-value-type';
import Spacer from '../../data-presentation/spacer';

type Props = {
  dateFrom: SearchValue | null;
  dateTo: SearchValue | null;
  pushDate: (txt: string) => void;
  removeDate: (type: 'date-from' | 'date-to') => void;
};

const DateRangeSelect: React.FC<Props> = ({
  dateFrom,
  dateTo,
  pushDate,
  removeDate,
}) => {
  const fromDateUTC = dateFrom?.raw;
  const toDateUTC = dateTo?.raw;

  const fromDate = fromDateUTC ? new Date(+fromDateUTC) : null;
  const toDate = toDateUTC ? new Date(+toDateUTC) : null;

  const setFromHandler = (date: Date | null) => {
    changeHandler('От', date);
  };
  const setToHandler = (date: Date | null) => {
    changeHandler('До', date);
  };

  const changeHandler = (label: 'От' | 'До', date: Date | null) => {
    if (!date) {
      removeDate(label === 'От' ? 'date-from' : 'date-to');
      return;
    }

    pushDate(
      `${label} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    );
  };
  return (
    <>
      <Typography variant="subtitle2">За период</Typography>
      <Spacer gap={1} />
      <Stack direction="row" flexWrap="wrap" rowGap={1} gap={1}>
        <DatePicker
          label="От"
          value={fromDate}
          onChange={setFromHandler}
          renderInput={(params: any) => <TextField {...params} />}
        />

        <DatePicker
          label="До"
          value={toDate}
          onChange={setToHandler}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </Stack>
    </>
  );
};

export default DateRangeSelect;
