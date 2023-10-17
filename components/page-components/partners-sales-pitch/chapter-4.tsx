import { Box, Card, Typography } from '@mui/material';

import trendImg from '../../../public/images/partners/trend.jpg';

import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import VisualAid from '../../layouts/page-services/visual-aid';
import Spacer from '../../common/data-presentation/spacer';

const PartnersChapter4: React.FC = () => {
  return (
    <Box sx={{ p: 10, mb: 35 }}>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Нови пазари</PrimaryDarkText>
      </Typography>
      <Spacer gap={4} />

      <VisualAid srcImg={trendImg} minHeight={'20rem'} right>
        <Typography>
          Все повече хора се обръщат към интернет, за търсене на геодезически
          услуги. С бързото нарастване на този пазар, става все по-важно да
          имате онлайн присъствие. За малка фирма, това може да бъде трудна
          задача. Създаването на уеб сайт е сложно и скъпо, а сайтовете за обяви
          са пренаситени и с ниско качество. Чрез нашата платформа ще получите
          лесен достъп до интернет пазара, който ще ви помогне да развиете
          бизнеса си по-бързо.
        </Typography>
      </VisualAid>
    </Box>
  );
};

export default PartnersChapter4;
