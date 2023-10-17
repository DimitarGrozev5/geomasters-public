import { Button, Link, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

type Props = {
  label: string;
  onClick: () => void;
  size?: React.ComponentProps<typeof Typography>['variant'];
};

const SendMessage: React.FC<Props> = ({ label, onClick, size = 'body2' }) => {
  return (
    <Button
      // href={}
      // underline="none"
      // variant={size}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.25,
      }}
      onClick={onClick}
    >
      <MessageIcon
        sx={{
          fontSize: (theme) =>
            theme.typography[size === 'inherit' ? 'body2' : size].fontSize,
        }}
      />
      {label}
    </Button>
  );
};

export default SendMessage;
