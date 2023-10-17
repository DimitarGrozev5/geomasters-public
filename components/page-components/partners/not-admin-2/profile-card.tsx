import { lighten, Stack } from '@mui/material';
import PageCard from '../../../layouts/page-card/page-card';

type Props = {
  flex?: number;
  border?: 'default' | 'primary' | 'secondary' | 'alternative';
  sx?: React.ComponentProps<typeof PageCard>['sx'];
} & React.PropsWithChildren;

const ProfileCard: React.FC<Props> = ({
  children,
  flex,
  border = 'default',
  sx = {},
}) => {
  return (
    <PageCard
      sx={{
        flex,
        position: 'relative',
        p: 4,
        border: '1px solid black',
        borderColor: (theme) =>
          border === 'default' ? '#eee' : theme.palette[border].A200,
        backgroundColor: (theme) =>
          border === 'default'
            ? theme.palette.background.default
            : lighten(theme.palette[border].A50!, 0.8),
        ...sx,
      }}
    >
      {children}
    </PageCard>
  );
};

export default ProfileCard;
