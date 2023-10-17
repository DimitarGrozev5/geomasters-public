import { Card, CardActionArea } from '@mui/material';
import Link from 'next/link';

type Props = {
  sx?: React.ComponentProps<typeof Card>['sx'];
} & React.PropsWithChildren &
  (
    | {
        navigate?: never;
        onClick?: () => void;
      }
    | {
        navigate?: string;
        onClick?: never;
      }
  );

const FilledCard: React.FC<Props> = ({ children, sx, navigate, onClick }) => {
  return (
    <Card
      sx={{
        p: !!navigate || !!onClick ? 0 : 1,
        border: '1px solid gray',
        borderColor: (theme) => theme.palette.primary.A500,
        backgroundColor: (theme) => theme.palette.primary.A50,
        ...sx,
      }}
      variant="outlined"
    >
      {!!navigate || !!onClick ? (
        <CardActionArea
          sx={{ p: !!navigate || !!onClick ? 1 : 0 }}
          {...(!!navigate
            ? {
                component: Link,
                href: navigate,
              }
            : {})}
          onClick={onClick}
        >
          {children}
        </CardActionArea>
      ) : (
        children
      )}
    </Card>
  );
};

export default FilledCard;
