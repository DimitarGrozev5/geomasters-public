import { useRef, useState } from 'react';

import {
  Chip,
  ClickAwayListener,
  Divider,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Popper,
  TextField,
  Box,
  Stack,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import {
  getDateRestriction,
  getTaskCategory,
  getTaskStatus,
  pipeGetValue,
} from './test-query';
import StatusesSelect from './statuses-select';
import CategoriesSelect from './categories-select';
import { SearchValue } from './search-value-type';
import DateRangeSelect from './date-range-select';
import EkatteSelect from './ekatte-select';

type Props = {
  forPartner?: boolean;
};

type Chips = {
  status: SearchValue | null;
  category: SearchValue | null;
  dateFrom: SearchValue | null;
  dateTo: SearchValue | null;
  ekatte: SearchValue | null;
  rnd: SearchValue[];
};

const datesAreArranged = (
  fromRaw: string | undefined,
  toRaw: string | undefined
): boolean => {
  if (!fromRaw || !toRaw) return true;
  const fromUTC = +fromRaw;
  const toUTC = +toRaw;
  if (fromUTC > toUTC) return false;
  return true;
};

const updateChips = (newVals: SearchValue[]) => (chips: Chips) => {
  const workChips = { ...chips };

  newVals.forEach((newVal) => {
    switch (newVal.type) {
      case 'status':
        workChips.status = { ...newVal };
        break;

      case 'category':
        workChips.category = { ...newVal };
        break;

      case 'date-from':
        if (datesAreArranged(newVal.raw, chips.dateTo?.raw)) {
          workChips.dateFrom = { ...newVal };
          break;
        }
        const newFrom: SearchValue = {
          type: 'date-from',
          value: chips.dateTo?.value!,
          raw: chips.dateTo?.raw!,
        };
        const newТо: SearchValue = {
          type: 'date-to',
          value: newVal.value!, // I know that dateTo is not undefined, since if it was, datesAreArranged would have returned true
          raw: newVal.raw!,
        };
        workChips.dateFrom = newFrom;
        workChips.dateTo = newТо;
        break;

      case 'date-to':
        if (datesAreArranged(chips.dateFrom?.raw, newVal.raw)) {
          workChips.dateTo = { ...newVal };
          break;
        }
        const newFrom1: SearchValue = {
          type: 'date-from',
          value: newVal.value!,
          raw: newVal.raw!,
        };
        const newТо1: SearchValue = {
          type: 'date-to',
          value: chips.dateFrom?.value!, // I know that dateFrom is not undefined, since if it was, datesAreArranged would have returned true
          raw: chips.dateFrom?.raw!,
        };
        workChips.dateFrom = newFrom1;
        workChips.dateTo = newТо1;
        break;

      case 'rnd-text':
        workChips.rnd = [
          ...workChips.rnd.filter((chip) => chip.value !== newVal.value),
          newVal,
        ];
        break;

      default:
        break;
    }
  });

  return workChips;
};

const PartnerTasksSearchField: React.FC<Props> = ({ forPartner = true }) => {
  // The value of the text field
  const [value, setValue] = useState('');

  // The entered values
  const [chips, setChips] = useState<Chips>({
    status: null,
    category: null,
    dateFrom: null,
    dateTo: null,
    ekatte: null,
    rnd: [],
  });

  // Anchor element for dropdown menu
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Event handlers
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value) {
      event.preventDefault();
      const newVals: SearchValue[] = pipeGetValue(
        value.trim(),
        getTaskStatus(true),
        getTaskCategory(),
        getDateRestriction()
      );

      setChips(updateChips(newVals));
      setValue('');
    }
    if (event.key === 'Escape') {
      // @ts-ignore
      event.target.blur();
      setDropdownAnchorEl(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleDeleteChip = (chipToDelete: SearchValue) => () => {
    setChips((chips) => {
      const workChips = { ...chips };

      switch (chipToDelete.type) {
        case 'status':
          workChips.status = null;
          break;
        case 'category':
          workChips.category = null;
          break;
        case 'date-from':
          workChips.dateFrom = null;
          break;
        case 'date-to':
          workChips.dateTo = null;
          break;
        case 'rnd-text':
          workChips.rnd = workChips.rnd.filter((chip) => chip !== chipToDelete);
        default:
          break;
      }

      return workChips;
    });
  };
  const handleDropdownOpen = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setDropdownAnchorEl(containerRef.current);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
  };

  const pushStatus = (status: string) => () => {
    const newVals = getTaskStatus(true)(status);

    if (newVals.length > 0) {
      setChips(updateChips(newVals));
    }
  };

  const pushCategory = (category: string) => () => {
    const newVals = getTaskCategory()(category);

    if (newVals.length > 0) {
      setChips(updateChips(newVals));
    }
  };

  const pushDate = (date: string) => {
    const newVals = getDateRestriction()(date);

    if (newVals.length > 0) {
      setChips(updateChips(newVals));
    }
  };

  const removeDate = (target: 'date-from' | 'date-to') => {
    setChips((chp) => {
      const workChips = { ...chp };

      if (target === 'date-from') workChips.dateFrom = null;
      if (target === 'date-to') workChips.dateTo = null;

      return workChips;
    });
  };

  // const handleClearChips = () => {
  //   setChips([]);
  // };

  const isDropdownOpen =
    Boolean(dropdownAnchorEl) &&
    containerRef.current?.contains(dropdownAnchorEl);

  return (
    <Box ref={containerRef}>
      <TextField
        label="Въведете какво търсите и натиснете Enter"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onClick={handleDropdownOpen}
        variant="outlined"
        fullWidth
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <Stack
              direction="row"
              alignItems="center"
              // flexWrap="wrap"
              spacing={1}
              rowGap={1}
            >
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>

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

              {chips.rnd.map((chip) => (
                <Chip
                  key={chip.value}
                  label={chip.value}
                  onDelete={handleDeleteChip(chip)}
                  color={
                    chip.type === 'date-from' || chip.type === 'date-to'
                      ? 'secondary'
                      : chip.type === 'status'
                      ? 'primary'
                      : 'default'
                  }
                  sx={{
                    marginRight: '4px',
                    backgroundColor: (theme) =>
                      chip.type === 'category'
                        ? theme.palette.alternative.A300
                        : undefined,
                  }}
                />
              ))}
            </Stack>
          ),
        }}
      />
      <Popper
        open={!!isDropdownOpen}
        anchorEl={dropdownAnchorEl}
        sx={{ width: containerRef.current?.clientWidth }}
      >
        <Paper
          elevation={7}
          sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        >
          <ClickAwayListener onClickAway={handleDropdownClose}>
            <List>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <DateRangeSelect
                  dateFrom={chips.dateFrom}
                  dateTo={chips.dateTo}
                  pushDate={pushDate}
                  removeDate={removeDate}
                />
              </ListItem>
              <Divider
                sx={{
                  m: 2,
                  ml: 1,
                  mr: 1,
                }}
              />

              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <EkatteSelect ekatte={chips.dateTo} pushEkatte={pushDate} />
              </ListItem>
              <Divider
                sx={{
                  m: 2,
                  ml: 1,
                  mr: 1,
                }}
              />

              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <StatusesSelect
                  forPartner={forPartner}
                  status={chips.status}
                  pushStatus={pushStatus}
                />
              </ListItem>
              <Divider
                sx={{
                  m: 2,
                  ml: 1,
                  mr: 1,
                }}
              />

              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <CategoriesSelect
                  category={chips.category}
                  pushCategory={pushCategory}
                />
              </ListItem>
              <Divider sx={{ ml: 1, mr: 1 }} />
            </List>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  );
};

export default PartnerTasksSearchField;
