import { ClickAwayListener, Paper, Popper } from '@mui/material';
import { RefObject } from 'react';
import FiltersTabs from '../filters-tabs/filters-tabs';
import { SearchValue } from '../search-value-type';
import { Chips } from './attr-chips-display';

type Props = {
  isMainDropdownOpen: boolean;
  dropdownAnchorEl: null | HTMLElement;
  containerRef: RefObject<HTMLDivElement>;
  handleDropdownClose: () => void;
  chips: Chips;
  setStatus: (status: SearchValue | null) => void;
  setCategory: (status: SearchValue | null) => void;
  setDateFrom: (status: SearchValue | null) => void;
  setDateTo: (status: SearchValue | null) => void;
  setLocation: (status: SearchValue | null) => void;
};

const FiltersPoper: React.FC<Props> = ({
  isMainDropdownOpen,
  dropdownAnchorEl,
  containerRef,
  handleDropdownClose,
  setStatus,
  setCategory,
  setDateFrom,
  setDateTo,
  setLocation,
  chips,
}) => {
  return (
    <Popper
      open={!!isMainDropdownOpen}
      anchorEl={dropdownAnchorEl}
      sx={{
        width: containerRef.current?.clientWidth,
        zIndex: (theme) => theme.zIndex.tooltip,
      }}
    >
      <Paper
        elevation={7}
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        <ClickAwayListener onClickAway={handleDropdownClose}>
          <FiltersTabs
            status={chips.status}
            setStatus={setStatus}
            category={chips.category}
            setCategory={setCategory}
            dateFrom={chips.dateFrom}
            setDateFrom={setDateFrom}
            dateTo={chips.dateTo}
            setDateTo={setDateTo}
            location={chips.location}
            setLocation={setLocation}
          />
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
};

export default FiltersPoper;
