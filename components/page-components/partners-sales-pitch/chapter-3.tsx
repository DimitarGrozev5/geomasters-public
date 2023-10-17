import { Box, Card, Typography } from '@mui/material';

import profileDemoImg from '../../../public/images/partners/profile-demo.png';
import helpImg from '../../../public/images/partners/help.jpg';

import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import VisualAid from '../../layouts/page-services/visual-aid';
import Spacer from '../../common/data-presentation/spacer';

const PartnersChapter3: React.FC = () => {
  return (
    <Box
      sx={{
        p: 10,
        mb: 20,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Помощ</PrimaryDarkText>
      </Typography>
      <Spacer gap={4} />

      <VisualAid
        srcImg={profileDemoImg}
        minHeight={'20rem'}
        objectPosition="top"
        right
      >
        <Typography>
          Геодезическите задачи са множество на брой и изключително разнородни.
          Дори за най-добрите геодезисти е трудно, да са еднакво добри във
          всичко. В нашата платформа можете да изброите областите, в които се
          чувствате силни, което ще ни позволи да ви свързваме с подходящи
          клиенти. С придобиването на повече опит, ще имате възможност да
          разширите своята практика и в нови области.
        </Typography>
      </VisualAid>
      <Spacer gap={8} />

      <VisualAid
        srcImg={helpImg}
        minHeight={'20rem'}
        objectPosition="top"
      >
        <Typography>
          В GeoMasters разбираме, че създаването на успешна геодезическа
          практика може да бъде предизвикателство, затова сме отдадени на
          оказване на помощ, когато се нуждаете от нея. Като партньор ще
          получите достъп до опитни геодезисти от цялата страна, които са
          отдадени на професията и са готови да ви помогнат, ако срещнете
          затруднение. От технически въпроси, до съвети по проектите, ние винаги
          сме на разположение.
        </Typography>
      </VisualAid>
    </Box>
  );
};

export default PartnersChapter3;
