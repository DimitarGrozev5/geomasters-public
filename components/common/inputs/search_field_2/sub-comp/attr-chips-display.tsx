import { Box, Chip } from '@mui/material';
import Spacer from '../../../data-presentation/spacer';
import { SearchValue } from '../search-value-type';
import AttrChip from './chip';

type Props = {
  chips: Chips;
  handleDeleteChip: (chip: SearchValue) => () => void;
};

export type Chips = {
  status: SearchValue | null;
  category: SearchValue | null;
  dateFrom: SearchValue | null;
  dateTo: SearchValue | null;
  location: SearchValue | null;
  rnd: SearchValue[];
};

const AttrChipsDisplay: React.FC<Props> = ({ chips, handleDeleteChip }) => {
  return (
    <>
      <Box>
        {chips.status && (
          <Chip
            label={chips.status.value}
            onDelete={handleDeleteChip(chips.status)}
            color={'primary'}
            sx={{ marginRight: '4px' }}
          />
        )}
        {chips.category && (
          <Chip
            label={chips.category.value}
            onDelete={handleDeleteChip(chips.category)}
            color={'secondary'}
            sx={{ marginRight: '4px' }}
          />
        )}
        {chips.location && (
          <Chip
            label={chips.location.value}
            onDelete={handleDeleteChip(chips.location)}
            sx={{
              marginRight: '4px',
              backgroundColor: (theme) => theme.palette.alternative.A500,
              color: (theme) => theme.palette.alternative.A50,
            }}
          />
        )}
        {chips.dateFrom && (
          <Chip
            label={`От ${chips.dateFrom.value}`}
            onDelete={handleDeleteChip(chips.dateFrom)}
            sx={{
              marginRight: '4px',
              backgroundColor: (theme) => theme.palette.alternative.A300,
            }}
          />
        )}
        {chips.dateTo && (
          <Chip
            label={`До ${chips.dateTo.value}`}
            onDelete={handleDeleteChip(chips.dateTo)}
            sx={{
              marginRight: '4px',
              backgroundColor: (theme) => theme.palette.alternative.A300,
            }}
          />
        )}
      </Box>

      <Spacer gap={2} />

      <Box>
        {chips.rnd.map((chip) => (
          <AttrChip
            key={chip.value}
            chip={chip}
            handleDeleteChip={handleDeleteChip}
          />
        ))}
      </Box>
      <Spacer gap={2} />
    </>
  );
};

export default AttrChipsDisplay;
