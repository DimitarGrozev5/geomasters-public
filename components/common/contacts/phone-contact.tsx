import { Link, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';

type Props = {
  phone: string;
  size?: React.ComponentProps<typeof Typography>['variant'];
};

const PhoneContact: React.FC<Props> = ({ phone, size = 'body2' }) => {
  return (
    <Link
      href={`tel:${phone}`}
      color="inherit"
      underline="none"
      variant={size}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.25,
      }}
    >
      <CallIcon
        sx={{
          fontSize: (theme) =>
            theme.typography[size === 'inherit' ? 'body2' : size].fontSize,
        }}
      />
      {phone}
    </Link>
  );
};

export default PhoneContact;
