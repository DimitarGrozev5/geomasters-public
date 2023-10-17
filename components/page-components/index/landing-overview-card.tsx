import { Box, Card, Grid, Paper, Stack, Typography } from '@mui/material';

type Props = {
  header: React.ReactElement | string;
  children: React.ReactElement | React.ReactElement[] | string;
};

const OverviewCard: React.FC<Props> = ({ header, children }) => {
  return (
    <Grid
      item
      lg={4}
      md={6}
      xs={12}
      sx={{
        display: 'flex',
        height: { lg: '50%', md: '33%', xs: '16.5%' },
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          textAlign: 'center',

          pl: 3,
          pr: 3,
          pt: 2,
          pb: 2,

          backgroundColor: (theme) => theme.palette.background.default,

          display: 'flex',
          flexDirection: 'column',
          gap: 3,

          minHeight: 350,
        }}
      >
        <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
          {header}
        </Typography>
        <Stack spacing={1} sx={{ flex: 1 }}>
          {children}
        </Stack>
      </Card>
    </Grid>
  );
};

export default OverviewCard;
