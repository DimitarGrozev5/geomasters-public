import { Link, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

type Props = {
  email: string;
  size?: React.ComponentProps<typeof Typography>['variant'];
};

const EmailContact: React.FC<Props> = ({ email, size = 'body2' }) => {
  return (
    <Link
      href={`mailto:${email}`}
      underline="none"
      variant={size}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.25,
      }}
    >
      <EmailIcon
        sx={{
          fontSize: (theme) =>
            theme.typography[size === 'inherit' ? 'body2' : size].fontSize,
        }}
      />
      {email}
    </Link>
  );
};

export default EmailContact;
