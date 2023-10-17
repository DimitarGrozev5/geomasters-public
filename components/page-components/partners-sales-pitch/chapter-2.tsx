import { Box, Card, Typography } from '@mui/material';

import clientsImg from '../../../public/images/partners/clients.jpg';

import PrimaryDarkText from '../../common/display-modifiers/primary-dark-text';
import VisualAid from '../../layouts/page-services/visual-aid';
import Spacer from '../../common/data-presentation/spacer';

const PartnersChapter2: React.FC = () => {
  return (
    <Box sx={{ p: 10, mb: 20 }}>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        <PrimaryDarkText>Клиенти</PrimaryDarkText>
      </Typography>
      <Spacer gap={4} />

      <VisualAid srcImg={clientsImg} minHeight={'20rem'}>
        <Typography>
          Изграждането на база от клиенти е може би най-голямото
          предизвикателство, при започване на самостоятелна геодезическа
          практика, затова сме горди да ви предложим решение, уникално за
          Българския пазар. Когато клиент се свърже с нас, с геодезическа
          задача, ние не просто ви даваме задачата - ние ви даваме клиента. Не
          се опитваме да посредничим във вашите отношения и не се опитваме да
          печелим от вашия приход. Помагаме ви да установите контакт и не ви
          пречим повече.
        </Typography>
        <Spacer gap={4} />

        <Typography>Този подход има редица предимства.</Typography>
      </VisualAid>
      <Spacer gap={8} />

      <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 8 }}>
        <Card
          sx={{ p: 4, backgroundColor: (theme) => theme.palette.primary.A50 }}
        >
          <Typography>
            <PrimaryDarkText>
              Ще имате свободата и гъвкавостта да определяте собствени цени и да
              вършите работа, както вие прецените.
            </PrimaryDarkText>
          </Typography>
        </Card>
        <Card
          sx={{ p: 4, backgroundColor: (theme) => theme.palette.primary.A50 }}
        >
          <Typography>
            <PrimaryDarkText>
              Получавате възможност да изградите дълготрайни отношения с
              клиентите, което ще ви помогне да развивате бизнеса си.
            </PrimaryDarkText>
          </Typography>
        </Card>
        <Card
          sx={{ p: 4, backgroundColor: (theme) => theme.palette.primary.A50 }}
        >
          <Typography>
            <PrimaryDarkText>
              Позволява ви да изградите добра репутация пред клиентите, която ще
              ви носи препоръки и допълнителна работа.
            </PrimaryDarkText>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default PartnersChapter2;
