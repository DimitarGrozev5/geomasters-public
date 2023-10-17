import { useState } from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  Slider,
  Stack,
  styled,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PrimaryDarkText from '../../../common/display-modifiers/primary-dark-text';

const getTimeLabel = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes - hours * 60;

  return hours > 0
    ? mins > 0
      ? `${hours}ч ${mins}м`
      : `${hours}ч`
    : `${mins}м`;
};

const marks = Array(7)
  .fill('')
  .map((_, i) => {
    const time = i * 60 + 60;
    const label = getTimeLabel(time);
    return {
      value: time,
      label,
    };
  });

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.A500,
  height: theme.spacing(2),
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:before': {
      // display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: theme.palette.primary.A500,
    border: '1px solid black',
    borderColor: theme.palette.primary.A700,
    color: theme.palette.primary.A50,
  },

  '& .MuiSlider-markLabel': {
    marginTop: theme.spacing(0.5),
    color: theme.palette.primary.A500,
  },
  '& .MuiSlider-markLabelActive': {
    color: theme.palette.primary.A700,
  },

  '& .MuiSlider-mark': {
    color: theme.palette.primary.A300,
    width: 3,
    height: 6,
  },
  '& .MuiSlider-markActive': {
    backgroundColor: theme.palette.primary.A200,
    width: 3,
    height: 6,
  },
}));

type DurationSliderProps = {
  label: string;
  value: number;
  onChange: (n: number) => void;
};

const DistanceSlider: React.FC<DurationSliderProps> = ({
  label,
  value,
  onChange,
}) => {
  const addTimeHandler = (time: number) => () => {
    if (value + time < 30 || value + time > 8 * 60) {
      return;
    }
    onChange(value + time);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const n = Array.isArray(newValue) ? newValue[0] : newValue;
    if (n < 30 || n > 8 * 60) {
      return;
    }
    onChange(n);
  };

  const smallScreenPinch = useMediaQuery('(max-width:550px)');
  const twoColumnPinch = useMediaQuery('(min-width:900px) and (max-width:950px)');
  const compactSize = smallScreenPinch || twoColumnPinch;
  return (
    <Stack>
      <Typography>
        <PrimaryDarkText>{label}</PrimaryDarkText>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <TextField
          value={getTimeLabel(value)}
          onChange={() => {}}
          sx={{ textAlign: 'center' }}
          InputProps={{
            inputProps: {
              sx: {
                textAlign: 'center',
                color: (theme: Theme) => theme.palette.primary.A800,
                fontSize: (theme: Theme) => theme.spacing(2.5),
              },
              readOnly: true,
            },
            startAdornment: (
              <ButtonGroup
                variant="text"
                aria-label="text button group"
                orientation={compactSize ? 'vertical' : 'horizontal'}
              >
                {compactSize ? (
                  <>
                    <Button
                      onClick={addTimeHandler(-1)}
                      sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                    >
                      -1м
                    </Button>
                    <Button
                      onClick={addTimeHandler(-10)}
                      sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                    >
                      -10м
                    </Button>
                    <Button
                      onClick={addTimeHandler(-60)}
                      sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                    >
                      -1ч
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={addTimeHandler(-60)}
                      sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                    >
                      -1ч
                    </Button>
                    <Button
                      onClick={addTimeHandler(-10)}
                      sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                    >
                      -10м
                    </Button>
                    <Button
                      onClick={addTimeHandler(-1)}
                      sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                    >
                      -1м
                    </Button>
                  </>
                )}
              </ButtonGroup>
            ),
            endAdornment: (
              <ButtonGroup
                variant="text"
                aria-label="text button group"
                orientation={compactSize ? 'vertical' : 'horizontal'}
              >
                <Button
                  onClick={addTimeHandler(1)}
                  sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                >
                  +1м
                </Button>
                <Button
                  onClick={addTimeHandler(10)}
                  sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                >
                  +10м
                </Button>
                <Button
                  onClick={addTimeHandler(60)}
                  sx={{ fontSize: (theme) => theme.spacing(1.6) }}
                >
                  +1ч
                </Button>
              </ButtonGroup>
            ),
          }}
        />
      </Box>
      <StyledSlider
        value={value}
        onChange={handleSliderChange}
        step={1}
        marks={marks}
        min={0}
        max={480}
        valueLabelDisplay="auto"
        valueLabelFormat={getTimeLabel}
        getAriaValueText={getTimeLabel}
      />
    </Stack>
  );
};

export default DistanceSlider;
