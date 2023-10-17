import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ButtonBase,
  ClickAwayListener,
  InputAdornment,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useAutocomplete,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { SearchValue } from './search-value-type';
import { getStatusSuggestions } from './text-suggestions/status-suggestion';
import { getCategorySuggestions } from './text-suggestions/category-suggestion';
import AttrChipsDisplay, { Chips } from './sub-comp/attr-chips-display';
import { useChipsControl } from './hooks/use-chips-control';
import FiltersPoper from './sub-comp/filters-poper';
import { getEkatteSuggestions } from './text-suggestions/ekatte-suggestion';
import { getDateSuggestions } from './text-suggestions/date-suggestion';
import SuggestionsPopper from './sub-comp/sugg-poper';

type Props = {
  chips: Chips;
  setChips: Dispatch<SetStateAction<Chips>>;
  forPartner?: boolean;
};

export type Suggestion = {
  text: string;
  chips: SearchValue[];
};

const PartnerTasksSearchField_2: React.FC<Props> = ({
  forPartner = true,
  chips,
  setChips,
}) => {
  // The value of the text field
  const [inputValue, setInputValue] = useState('');

  const {
    handleDeleteChip,
    setStatus,
    setCategory,
    setLocation,
    setDateFrom,
    setDateTo,
    setRnd,
    pushChip,
  } = useChipsControl(chips, setChips);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggIndex, setSuggIndex] = useState(0);
  const [showSugg, setShowSugg] = useState(false);

  // Anchor element for dropdown menu
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const isMainDropdownOpen = Boolean(
    !!dropdownAnchorEl &&
      containerRef.current?.contains(dropdownAnchorEl) &&
      !showSugg
  );
  const isSuggetionDropdownOpen = Boolean(
    !!dropdownAnchorEl &&
      containerRef.current?.contains(dropdownAnchorEl) &&
      showSugg
  );

  // Event listeners
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // if (event.key === 'Escape') {
    //   event.preventDefault();
    //   setDropdownAnchorEl(null);
    //   return;
    // }

    // Enter enteres the SearchValue
    if (event.key === 'Enter') {
      event.preventDefault();
      const sugg = suggestions[suggIndex];
      if (!sugg || sugg.chips.length === 0) return;

      pushChip(...sugg.chips);
      setInputValue('');
      setSuggIndex(0);
      return;
    }

    // Tab and arrows move the selected suggestion
    if (event.key === 'Tab' || event.key === 'ArrowDown') {
      event.preventDefault();
      setSuggIndex((i) => (i + 1) % suggestions.length);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSuggIndex((i) => (i === 0 ? suggestions.length - 1 : i - 1));
      return;
    }
  };

  useEffect(() => {
    if (inputValue.length >= 3 && !showSugg) setShowSugg(true);
    if (inputValue.length < 3 && showSugg) setShowSugg(false);
  }, [inputValue.length, showSugg]);

  useEffect(() => {
    // If the input has more than three characters, start making suggestions
    if (inputValue.length < 3) return;

    const status = getStatusSuggestions(inputValue);
    const category = getCategorySuggestions(inputValue);
    const ekatte = getEkatteSuggestions(inputValue);
    const date = getDateSuggestions(inputValue);

    setSuggestions([
      {
        text: inputValue,
        chips: [{ type: 'rnd-text', value: inputValue, raw: inputValue }],
      },
      ...date,
      ...status,
      ...category,
      ...ekatte,
    ]);
  }, [inputValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDropdownOpen = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setDropdownAnchorEl(containerRef.current);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
  };

  return (
    <Stack ref={containerRef} alignItems="stretch">
      <AttrChipsDisplay chips={chips} handleDeleteChip={handleDeleteChip} />

      <TextField
        label="Въведете какво търсите и натиснете Enter"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onClick={handleDropdownOpen}
        variant="outlined"
        fullWidth
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <FiltersPoper
        isMainDropdownOpen={isMainDropdownOpen}
        dropdownAnchorEl={dropdownAnchorEl}
        containerRef={containerRef}
        handleDropdownClose={handleDropdownClose}
        setStatus={setStatus}
        setCategory={setCategory}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        setLocation={setLocation}
        chips={chips}
      />

      <SuggestionsPopper
        isSuggetionDropdownOpen={isSuggetionDropdownOpen}
        dropdownAnchorEl={dropdownAnchorEl}
        containerRef={containerRef}
        suggestions={suggestions}
        handleDropdownClose={handleDropdownClose}
        suggIndex={suggIndex}
        pushChip={pushChip}
        setInputValue={setInputValue}
      />
    </Stack>
  );
};

export default PartnerTasksSearchField_2;
