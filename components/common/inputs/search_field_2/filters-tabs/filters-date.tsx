import { Box, TextField, Typography } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { SearchValue } from '../search-value-type';

type Props = {
  dateFrom: SearchValue | null;
  setDateFrom: (fromDate: SearchValue | null) => void;
  dateTo: SearchValue | null;
  setDateTo: (fromDate: SearchValue | null) => void;
};

const FiltersDate: React.FC<Props> = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  const fromDateUTC = dateFrom?.raw;
  const toDateUTC = dateTo?.raw;

  const fromDate = fromDateUTC ? new Date(+fromDateUTC) : null;
  const toDate = toDateUTC ? new Date(+toDateUTC) : null;

  const setFromHandler = (date: Date | null) => {
    setDateFrom(
      date
        ? {
            type: 'date-from',
            value: new Intl.DateTimeFormat('bg').format(date),
            raw: date.getTime().toString(),
          }
        : null
    );
  };
  const setToHandler = (date: Date | null) => {
    setDateTo(
      date
        ? {
            type: 'date-to',
            value: new Intl.DateTimeFormat('bg').format(date),
            raw: date.getTime().toString(),
          }
        : null
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
      <Box>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          От
        </Typography>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          label="От"
          value={fromDate}
          onChange={setFromHandler}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          До
        </Typography>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          label="До"
          value={toDate}
          onChange={setToHandler}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </Box>
    </Box>
  );
};

export default FiltersDate;
