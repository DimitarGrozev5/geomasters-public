import { Chip, Theme } from '@mui/material';
import { useMemo } from 'react';
import { SearchValue } from '../search-value-type';

type Props = {
  chip: SearchValue;
  handleDeleteChip?: (chip: SearchValue) => () => void;
};

export const AttrChip: React.FC<Props> = ({ chip, handleDeleteChip }) => {
  const chipColor = useMemo(() => {
    switch (chip.type) {
      case 'category':
        return 'secondary';
      case 'status':
        return 'primary';

      default:
        return 'default';
    }
  }, [chip.type]);

  const backgroundColor = useMemo(() => {
    switch (chip.type) {
      case 'ekatte':
        return (theme: Theme) => theme.palette.alternative.A500;
      case 'date-from':
      case 'date-to':
        return (theme: Theme) => theme.palette.alternative.A300;

      default:
        return undefined;
    }
  }, [chip.type]);

  const color = useMemo(() => {
    switch (chip.type) {
      case 'ekatte':
        return (theme: Theme) => theme.palette.alternative.A50;

      default:
        return undefined;
    }
  }, [chip.type]);
  return (
    <Chip
      label={chip.value}
      onDelete={handleDeleteChip ? handleDeleteChip(chip) : undefined}
      color={chipColor}
      sx={{
        marginRight: '4px',
        backgroundColor,
        color,
      }}
    />
  );
};

export default AttrChip;
