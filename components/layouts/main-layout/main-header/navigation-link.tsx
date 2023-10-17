import { Link } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export type NavigationLinkProps = {
  href: string;
  children: string;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({ href, children }) => {
  const pathname = useRouter().pathname;

  return (
    <Link
      component={NextLink}
      href={href}
      variant="button"
      underline="none"
      sx={{
        color: (theme) =>
          pathname === href
            ? theme.palette.primary.A500
            : theme.palette.primary.contrastText,
        '&:hover': {
          color: (theme) => theme.palette.primary.A500,
        },
      }}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
