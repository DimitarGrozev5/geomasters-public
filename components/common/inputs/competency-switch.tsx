import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  darken,
  lighten,
} from '@mui/material';
import { Competency } from '@prisma/client';

type Props = {
  value: Competency;
  onChange: (c: Competency) => void;
  isLoading?: boolean;
};

const CompetencySwitch_v1: React.FC<Props> = ({ value, onChange }) => (
  <>
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      <Button
        onClick={() => onChange('WILLING')}
        variant={value === 'WILLING' ? 'contained' : 'outlined'}
      >
        Да
      </Button>
      <Button
        onClick={() => onChange('UNABLE')}
        variant={value === 'UNABLE' ? 'contained' : 'outlined'}
      >
        Не
      </Button>
      <Button
        onClick={() => onChange('ABLE')}
        variant={value === 'ABLE' ? 'contained' : 'outlined'}
      >
        При нужда
      </Button>
    </ButtonGroup>
  </>
);

const CompetencySwitch: React.FC<Props> = ({
  value,
  onChange,
  isLoading = false,
}) => (
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-evenly',
      backgroundColor: (theme) => lighten(theme.palette.primary.A50!, 0.5),
      border: '1px solid black',
      borderColor: (theme) => theme.palette.primary.A50,
      p: 1,
    }}
  >
    <Button
      onClick={() => onChange('WILLING')}
      sx={{
        fontSize: (theme) => theme.typography.body2.fontSize,
        backgroundColor: value === 'WILLING' ? 'secondary.A200' : undefined,
        '&:hover': {
          backgroundColor: (theme) =>
            value === 'WILLING'
              ? darken(theme.palette.secondary.A200!, 0.1)
              : undefined,
        },
      }}
      variant={value === 'WILLING' ? 'contained' : 'text'}
    >
      Да
    </Button>
    <Button
      onClick={() => onChange('UNABLE')}
      sx={{
        backgroundColor: value === 'UNABLE' ? 'alternative.A200' : undefined,
        '&:hover': {
          backgroundColor: (theme) =>
            value === 'UNABLE'
              ? darken(theme.palette.alternative.A200!, 0.1)
              : undefined,
        },
      }}
      variant={value === 'UNABLE' ? 'contained' : 'text'}
    >
      Не
    </Button>
    <Button
      onClick={() => onChange('ABLE')}
      sx={{
        backgroundColor: value === 'ABLE' ? 'primary.A100' : undefined,
        '&:hover': {
          backgroundColor: (theme) =>
            value === 'ABLE'
              ? darken(theme.palette.primary.A100!, 0.1)
              : undefined,
        },
      }}
      variant={value === 'ABLE' ? 'contained' : 'text'}
    >
      При нужда
    </Button>

    {isLoading && (
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: '#00000022',
          backdropFilter: 'blur(2px)',
        }}
      >
        <CircularProgress />
      </Box>
    )}
  </Box>
);

export default CompetencySwitch;
