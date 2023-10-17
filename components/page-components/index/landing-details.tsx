import { Typography, Paper, Grid } from '@mui/material';
import OverviewCard from './landing-overview-card';
import Span from '../../common/data-presentation/span';
import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';

const LandingDetail = () => {
  return (
    <Paper
      elevation={10}
      sx={{
        width: '100%',
        minHeight: (theme) => `calc(100vh - ${theme.spacing(3)})`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        alignItems: 'stretch',
        // flexWrap: 'wrap',
        // gap: (theme) => theme.spacing(7),

        padding: { lg: 7, md: 5, xs: 5 },
        pl: { xs: 5 },
        pr: { xs: 5 },

        backgroundColor: (theme) => theme.palette.background.paper,

        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        columnSpacing={{ lg: 7, md: 5 }}
        rowSpacing={{ lg: 7, md: 2, xs: 5 }}
        sx={{ width: '100%' }}
      >
        <OverviewCard
          header={
            <>
              <PrimaryDarkText>Трасиране</PrimaryDarkText> на границите на имот
            </>
          }
        >
          <Typography variant="body1">
            Съседът Ви твърди, че оградата е грешна?
          </Typography>
          <Typography variant="body1">
            Ще купувате имот и искате да видите къде всъщност е границата и
            какво точно Ви продават?
          </Typography>
          <Typography variant="body1">
            Искате да изграждате масивна ограда?
          </Typography>
          <Typography variant="body1">
            Поръчайте{' '}
            <Span
              sx={{
                color: (theme) => theme.palette.primary.A800,
              }}
            >
              трасиране
            </Span>
            , за да разберете къде е{' '}
            <Span
              sx={{
                color: (theme) => theme.palette.primary.A500,
              }}
            >
              истината
            </Span>
            .
          </Typography>
        </OverviewCard>

        <OverviewCard
          header={
            <>
              <PrimaryDarkText>Строителство</PrimaryDarkText> на сгради
            </>
          }
        >
          <Typography variant="body1">
            Ако имате намерение да започнете строеж, търсите проектанти или
            процесът е вече започнал, а дори да е на път да приключи, лицензиран
            геодезист ще бъде необходим във всеки един етап.
          </Typography>
          <Typography variant="body1">
            От урегулиране на имота, през проектиране иизпълнение на
            строителството, до въвеждането му в експлоатация.
          </Typography>
        </OverviewCard>

        <OverviewCard header="Проблеми с Кадастъра">
          <Typography variant="body1">
            Кадастралната карта е инструментът, чрез който гарантираме
            собствеността над даден имот
          </Typography>
          <Typography variant="body1">
            Несъвпадения в площта по документ
          </Typography>
          <Typography variant="body1">Делби и обединения на имоти</Typography>
          <Typography variant="body1">Нанасяне на апартаменти</Typography>
          <Typography variant="body1">Изготвяне на скици</Typography>
        </OverviewCard>

        <OverviewCard
          header={
            <>
              Геодезически <PrimaryDarkText>заснемания</PrimaryDarkText>
            </>
          }
        >
          <Typography variant="body1">
            Трябва Ви заснемане, преди да започнете проектиране?
          </Typography>
          <Typography variant="body1">
            Строител сте и искате да знаете точния обем на изкоп, или размерите
            на даден констурктивен елемент?
          </Typography>
          <Typography variant="body1">
            Геодезическо заснемане може да ви даде точни данни.
          </Typography>
        </OverviewCard>

        <OverviewCard header="Изготвяне на ПУП">Изготвяне на подробни устройствени планове</OverviewCard>

        <OverviewCard header="И всичко неизброено">
          Не сте сигурни какъв е проблемът Ви? Свържете се с нашите специалисти
          и ще получите безплатна консултация.
        </OverviewCard>
      </Grid>
    </Paper>
  );
};

export default LandingDetail;
