import { Box, Card, Grid, Typography } from '@mui/material';

import profileDemoImg from '../../../public/images/partners/smetka.png';
import helpImg from '../../../public/images/partners/help.jpg';

import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import VisualAid from '../../layouts/page-services/visual-aid';
import Spacer from '../../common/data-presentation/spacer';
import SecondaryDarkText from '../../common/display-modifiers/secondary-dark-text';
import Span from '../../common/data-presentation/span';
import React from 'react';

const PartnersChapter5: React.FC = () => {
  return (
    <Box
      sx={{
        p: 10,
        mb: 20,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Изгодно</PrimaryDarkText>
      </Typography>
      <Spacer gap={4} />

      <VisualAid
        srcImg={profileDemoImg}
        minHeight={'20rem'}
        objectPosition="top"
      >
        <Typography>
          Разбираме, че стартирането на собствен бизнес може да бъде скъпо,
          поради което сме подбрали ценова схема, която да е достъпна за всеки.
          Всеки път когато ви предоставим контактите на нов клиент, удържаме
          комисионна на стойност 20лв. По този начин не се налага да инвестирате
          големи суми предварително или да имате постоянен разход всеки месец, а
          плащате само за това, което получавате.
        </Typography>
        <Spacer gap={4} />

        <Typography>
          След като се присъедините към нас, ще получите{' '}
          <Span sx={{ fontWeight: 500 }}>
            <SecondaryDarkText>кредит на стойност 100лв</SecondaryDarkText>
          </Span>
          , което означава, че първите петима клиенти ще са безплатни. След
          това, ако сте доволни от услугите ни, ще можете да зареждате в профила
          си малки суми, от които да удържаме комисионната си. Ще можете да
          изтеглите тези пари по всяко време и по всякаква причина.
        </Typography>
      </VisualAid>
      <Spacer gap={8} />

      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Стъпка по стъпка:</PrimaryDarkText>
      </Typography>
      <Spacer gap={8} />

      <Grid container>
        <Grid item lg={1}></Grid>
        <TextCard>
          Обаждате се на 088 412 3455, за да Ви направим профил и да получите
          бонус от 100лв в профила си.
        </TextCard>
        <ArrowGrid>
          <Arrow left={false} />
        </ArrowGrid>
        <TextCard>
          Клиент се свързва с нас. Проверяваме дали е надежден, къде се намира и
          от каква услуга има нужда. Ако клиентът е подходящ за вашите
          изисквания, ви го предлагаме.
        </TextCard>
        <ArrowGrid>
          <Arrow left={false} />
        </ArrowGrid>
        <TextCard>
          Вие виждате общо описание на задачата и ако имате интерес я приемате.
        </TextCard>
        <Grid
          item
          lg={1}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: '50%',
              height: '50%',
              ml: '10%',
              border: (theme) => `4px solid ${theme.palette.primary.A500}`,
              borderBottom: 'none',
              borderLeft: 'none',
            }}
          />
        </Grid>

        <Grid item lg={11}></Grid>
        <Grid
          item
          lg={1}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              width: '50%',
              height: '5rem',
              ml: '10%',
              borderRight: (theme) => `4px solid ${theme.palette.primary.A500}`,
            }}
          />
        </Grid>

        <Grid item lg={1}></Grid>
        <TextCard>
          Когато парите по сметката ви намалеят, можете да добавите нова сума,
          която може да бъде изтеглена по всяко време.
        </TextCard>
        <ArrowGrid>
          <Arrow />
        </ArrowGrid>
        <TextCard>
          Можете да се свържете с клиента и да започнете работа по задачата. Ако
          има някакви проблеми или затруднения, винаги сме насреща за помощ
        </TextCard>
        <ArrowGrid>
          <Arrow />
        </ArrowGrid>
        <TextCard>
          След като приемете задачата, таксата за препоръка ще бъде автоматично
          изтеглена от профила ви и ще имате пълен достъп до данните за контакт
          на кллиента.
        </TextCard>
        <Grid
          item
          lg={1}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '40%',
              height: '50%',
              ml: '20%',
              border: (theme) => `4px solid ${theme.palette.primary.A500}`,
              borderTop: 'none',
              borderLeft: 'none',
              '&:before': {
                content: '" "',
                position: 'absolute',
                bottom: '-6px',
                left: '-10px',
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderRight: (theme) =>
                  `20px solid ${theme.palette.primary.A500}`,
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PartnersChapter5;

function ArrowGrid({ children }: React.PropsWithChildren) {
  return (
    <Grid
      item
      lg={2}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {children}
    </Grid>
  );
}
function Arrow({ left = true }: { left?: boolean }) {
  return (
    <Box
      sx={{
        width: '80%',
        height: '4px',
        backgroundColor: (theme) => theme.palette.primary.A500,
        position: 'relative',
        '&:before': left
          ? {
              content: '" "',
              position: 'absolute',
              top: '-2px',
              left: '-10px',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderRight: (theme) =>
                `20px solid ${theme.palette.primary.A500}`,
            }
          : undefined,
        '&:after': !left
          ? {
              content: '" "',
              position: 'absolute',
              top: '-2px',
              right: '-10px',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: (theme) => `20px solid ${theme.palette.primary.A500}`,
            }
          : undefined,
      }}
    />
  );
}

function TextCard({ children }: { children: string | string[] }) {
  return (
    <Grid
      item
      lg={2}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: (theme) => theme.palette.primary.A50,
          borderColor: (theme) => theme.palette.primary.A500,
        }}
      >
        <Typography>
          <PrimaryDarkText>{children}</PrimaryDarkText>
        </Typography>
      </Card>
    </Grid>
  );
}
