import { Card } from '@mui/material';
import React from 'react';

type Props = React.PropsWithChildren & {
  sx?: React.ComponentProps<typeof Card>['sx'];
};

const PageCard: React.FC<Props> = ({ children, sx = {} }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        backgroundColor: (theme) => theme.palette.background.default,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default PageCard;
