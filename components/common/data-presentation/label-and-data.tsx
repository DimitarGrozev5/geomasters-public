import { Box, Stack, Typography } from '@mui/material';
import PrimaryDarkText from '../display-modifiers/primary-dark-text';

type Props = {
  label: string | React.ReactNode;
  children: string | string[] | React.ReactNode | React.ReactNode[];
  labelWidth?: number;
  alignTop?: boolean;
};

const LabelAndData: React.FC<Props> = ({
  label,
  children,
  labelWidth = 10,
  alignTop = false,
}) => {
  const isString = (() => {
    if (typeof children === 'string') {
      return true;
    }
    if (Array.isArray(children) && typeof children[0] === 'string') {
      return true;
    }
    return false;
  })();
  return (
    <Stack
      flexDirection="row"
      gap={1}
      alignItems={alignTop ? 'flex-start' : 'center'}
      sx={{ width: '100%' }}
    >
      <Box
        sx={{
          minWidth: (theme) => theme.spacing(labelWidth),
          textAlign: 'right',
        }}
      >
        {typeof label === 'string' ? (
          <Typography variant="body1">
            <PrimaryDarkText>{label}:</PrimaryDarkText>
          </Typography>
        ) : (
          label
        )}
      </Box>
      <Box sx={{ flex: 1 }}>
        {isString && <Typography variant="body1">{children}</Typography>}
        {!isString && children}
      </Box>
    </Stack>
  );
};

export default LabelAndData;
