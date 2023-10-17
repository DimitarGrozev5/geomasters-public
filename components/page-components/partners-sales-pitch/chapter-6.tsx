import { Box, Card, Typography } from '@mui/material';

import logoImg from '../../../public/logo.png';

import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import VisualAid from '../../layouts/page-services/visual-aid';
import Spacer from '../../common/data-presentation/spacer';
import BgImage from '../../common/helper/background-image';

const PartnersChapter6: React.FC = () => {
  return (
    <Box sx={{ p: 10, mb: 35 }}>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Започнете сега</PrimaryDarkText>
      </Typography>
      <Spacer gap={4} />

      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography>
            В GeoMasters вярваме, че всеки трябва да има шанс да реализира
            потенциала си. Искаме да улесним максимално досадните и трудни
            аспекти, свързани със започване на нов бизнес, за да можете да се
            занимавате с геодезия, а не с маркетинг. Без значение дали тепърва
            се замисляте за самостоятелна дейност или вече имате фирма и искате
            да я развиете, нашата платформа ще ви предостави ресурсите и
            подкрепата, от които се нуждаете.
          </Typography>
          <Spacer gap={4} />
          <Typography>
            Така че не чакайте! Свържете се с нас, за да обсъдим детайлите.
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', flex: 1, minHeight: '20rem' }}>
          <BgImage
            srcImg={logoImg}
            objectFit="contain"
            sizes={{
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '100%',
              xl: '100%',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PartnersChapter6;
