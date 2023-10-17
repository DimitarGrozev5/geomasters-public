import {
  Card,
  Box,
  Stack,
  Typography as Ty,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import PrimaryDarkText from '../../components/common/display-modifiers/primary-dark-text';
import BgImage from '../../components/common/helper/background-image';
import { useGlobalContext } from '../../components/layouts/main-layout/context/global-ctx';
import PageLayout from '../../components/layouts/page-layout/page-layout';
import accentImage from '../../public/images/service.jpg';

export default function ServicesPage() {
  const { openSendMessage } = useGlobalContext();
  return (
    <>
      <Head>
        <title>
          Видове геодезически услуги: Какво е геодезията и имам ли нужда от
          геодезист?
        </title>
        <meta
          name="description"
          content="Ако притежавате имот или апартамент, планирате да ги закупите или строите сграда, рано или късно ще имате нужда от професионалните услуги на лицензиран инженер геодезист."
        />
      </Head>
      <PageLayout>
        <Card
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            gap: 2,
            p: 2,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: (theme) => theme.spacing(-2),
                right: 0,
                top: (theme) => theme.spacing(-2),
                bottom: (theme) => theme.spacing(-2),
              }}
            >
              <BgImage
                srcImg={accentImage}
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
          <Stack sx={{ flex: { md: 2, lg: 1 }, textAlign: 'right', p: 4 }}>
            <Ty variant="h4">
              Имам ли нужда от <PrimaryDarkText>Геодезист</PrimaryDarkText>?
            </Ty>
            <Ty variant="body1">
              Ако притежавате имот или апартамент, планирате да ги закупите или
              строите сграда, рано или късно ще имате нужда от професионалните
              услуги на лицензиран инженер геодезист.
            </Ty>
            <List>
              <ReasonListItem
                primaryText="Трасиране на имот"
                secondaryText="Съседът Ви твърди, че оградата е грешна? Ще купувате имот и искате да видите къде е истинската граница и какво точно Ви продават? Искате да изграждате масивна ограда? Прочетете повече за трасирането на имоти."
                pageName="trasirane"
              />
              <ReasonListItem
                primaryText="Геодезическо заснемане"
                secondaryText="Трябва Ви заснемане, преди да започнете проектиране? Строител сте и искате да знаете точния обем на изкоп, или размерите на даден констурктивен елемент? Прочетете още за геодезическите заснемания."
                pageName="zasnemane"
              />
              <ReasonListItem
                primaryText="Строителство"
                secondaryText="Ако имате намерение да започнете строеж, търсите проектанти или процесът е вече започнал, а дори да е на път да приключи, лицензиран геодезист ще бъде необходим във всеки един етап. От урегулиране на имота, през проектиране и изпълнение на строителството, до въвеждането му в експлоатация."
                pageName="stroitelstvo"
              />
              <ReasonListItem
                primaryText="Проблеми с Кадастър"
                secondaryText="Кадастърът съществува за да пази собсвеността Ви, но също така е източник на много грешки. Грешни граници, неправилно въведени документи, лиспващи сгради и много други. Всичко требява да се коригира навреме, преди да стане проблем."
                pageName="cadastre"
              />
              {/* <ReasonListItem
                primaryText="Узаконяване на сгради"
                secondaryText=''
                pageName='turpimost'
              />
              <ReasonListItem
                primaryText="Комбинирани скици"
                secondaryText=''
                pageName='ekspertizi'
              />
              <ReasonListItem
                primaryText="Изготвяне на ПУП"
                secondaryText=''
                pageName='pup'
              /> */}
              {/* <ReasonListItem
                primaryText="Оценки на имоти"
                secondaryText="Мислите да купувате имот с ипотечен кредит и е необходима независима оценка? Мислите да продавате собствения си имот и не сте сигурни каква е реалната му стойност? Поръчайте оценка и ще разберете."
                pageName="ocenki"
              /> */}
              <ReasonListItem
                primaryText="И много други услуги"
                secondaryText="Ако не сте сигурни, какво Ви трябва, свържете се с нас за безплатна консултация."
                pageName=""
                onClick={openSendMessage}
              />
            </List>
          </Stack>
        </Card>
      </PageLayout>
    </>
  );
}

function ReasonListItem({
  primaryText,
  secondaryText,
  pageName,
  onClick,
}: {
  primaryText: string;
  secondaryText: string;
  pageName: string;
  onClick?: () => void;
}) {
  return (
    <ListItem sx={{ textAlign: 'right', mb: 2 }}>
      {(!!pageName || !!onClick) && (
        <ListItemButton
          component={Link}
          href={`/services/${pageName}`}
          onClick={onClick}
          sx={{ textAlign: 'right' }}
        >
          <ListItemText
            primary={<PrimaryDarkText>{primaryText}</PrimaryDarkText>}
            secondary={secondaryText}
          />
        </ListItemButton>
      )}
      {!pageName && !onClick && (
        <ListItemText
          primary={<PrimaryDarkText>{primaryText}</PrimaryDarkText>}
          secondary={secondaryText}
        />
      )}
    </ListItem>
  );
}
