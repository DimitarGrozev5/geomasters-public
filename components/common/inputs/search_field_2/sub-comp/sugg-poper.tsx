import {
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { RefObject } from 'react';
import { Suggestion } from '../partner-tasks-search-field-2';
import { SearchValue } from '../search-value-type';
import AttrChip from './chip';

type Props = {
  isSuggetionDropdownOpen: boolean;
  dropdownAnchorEl: null | HTMLElement;
  containerRef: RefObject<HTMLDivElement>;
  handleDropdownClose: () => void;
  suggestions: Suggestion[];
  suggIndex: number;
  pushChip: (...vals: SearchValue[]) => void;
  setInputValue: (s: string) => void;
};

const SuggestionsPopper: React.FC<Props> = ({
  isSuggetionDropdownOpen,
  dropdownAnchorEl,
  containerRef,
  handleDropdownClose,
  suggestions,
  suggIndex,
  pushChip,
  setInputValue,
}) => {
  return (
    <Popper
      open={!!isSuggetionDropdownOpen}
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
          <Stack sx={{ p: 2, pl: 4 }}>
            {suggestions.map((s, i) => {
              return (
                <ButtonBase
                  key={`${s.text}${i}`}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-start',
                    p: 1,
                    backgroundColor: (theme) => {
                      if (i !== suggIndex) return 'default';
                      if (s.chips.length === 0)
                        return theme.palette.alternative.A50;
                      return theme.palette.primary.A50;
                    },
                  }}
                  onClick={() => {
                    if (s.chips.length > 0) {
                      pushChip(...s.chips);
                      setInputValue('');
                    }
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ flex: 1, textAlign: 'left' }}
                  >
                    {s.text}
                  </Typography>
                  {s.chips.map((chip) => (
                    <AttrChip key={chip.value} chip={chip} />
                  ))}
                </ButtonBase>
              );
            })}
          </Stack>
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
};

export default SuggestionsPopper;
