import { Box, Card, CardActionArea, Radio, Typography } from '@mui/material';

type Props = {
  icon: React.ReactElement;
  label: string;
  selectedValue: string | null;
  value: string;
  onSelect: () => void;
  disabled?: boolean;
  disabledLabel?: string;
};

const CardRadio: React.FC<Props> = ({
  selectedValue,
  value,
  icon,
  label,
  onSelect,
  disabled,
  disabledLabel,
}) => {
  const selected = value === selectedValue;
  return (
    <Card
      variant="outlined"
      sx={{
        width: 150,
        height: 150,
        backgroundColor: (theme) =>
          selected ? theme.palette.primary.A100 : 'default',
        borderColor: (theme) =>
          selected ? theme.palette.primary.A900 : 'default',
      }}
    >
      <CardActionArea
        onClick={onSelect}
        disabled={disabled}
        sx={{
          width: 150,
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Radio value={value} />
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            color: (theme) =>
              selected
                ? theme.palette.primary.A800
                : theme.palette.alternative.A600,
          }}
        >
          {!disabled && icon}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              position: 'absolute',
              width: 150,
              bottom: (theme) => theme.spacing(-3),
              left: 0,
              right: 0,
              color: (theme) =>
                selected ? theme.palette.primary.A800 : 'default',
            }}
          >
            {label}
            {disabled && (
              <>
                <br />
                {disabledLabel}
              </>
            )}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CardRadio;
