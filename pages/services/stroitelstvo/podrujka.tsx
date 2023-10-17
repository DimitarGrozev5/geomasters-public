import {
  Breadcrumbs,
  useMediaQuery,
  Link as MuiLink,
  Typography as Ty,
} from '@mui/material';

import Link from 'next/link';

import Span from '../../../components/common/data-presentation/span';
import Spacer from '../../../components/common/data-presentation/spacer';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../../components/common/display-modifiers/secondary-dark-text';

import accentImage from '../../../public/images/services/zasnemane/zasnemane.jpg';
import introImg from '../../../public/images/services/vp/top_view1.jpg';
import constImg from '../../../public/images/services/podrujka/construction1.jpg';
import protokolImg from '../../../public/images/services/podrujka/obrazec2.png';
import deformationImg from '../../../public/images/services/podrujka/deformation.png';
import mostImg from '../../../public/images/services/podrujka/most.png';
import izkopImg from '../../../public/images/services/podrujka/izkop.jpg';

import VisualAid from '../../../components/layouts/page-services/visual-aid';
import ServiceHeader from '../../../components/layouts/page-services/service-header';
import ServiceParagraph from '../../../components/layouts/page-services/service-paragraph';
import ServiceBulletList from '../../../components/layouts/page-services/bullet-list';
import ServicePage from '../../../components/layouts/page-services/service-page';
import Head from 'next/head';

export default function TrasiranePage() {
  const horizontal = useMediaQuery('(min-width:900px)');

  return (
    <>
      <Head>
        <title>
          Подръжка по време на строителство: Как геодезията може да подобри
          строителния процес
        </title>
        <meta
          name="description"
          content="Геодезията играе изключително важна роля в строителството на сгради и съоръжения. За да се гарантира високо качество на строежа, много етапи от процеса изискват прецизни измервания и трасиране. В зависимост от типа на обекта, може да се наложат множество различни геодезически задачи, но най-често се изискват следните:"
        />
      </Head>
      <PageLayout>
        <Breadcrumbs aria-label="breadcrumb" sx={{ ml: 2 }}>
          <MuiLink
            underline="hover"
            color="inherit"
            component={Link}
            href="/services"
          >
            Услуги
          </MuiLink>
          <MuiLink
            underline="hover"
            color="inherit"
            component={Link}
            href="/services/stroitelstvo"
          >
            Строителство
          </MuiLink>
          <Ty sx={{ color: (theme) => theme.palette.primary.A500 }}>
            Подръжка по време на строителство
          </Ty>
        </Breadcrumbs>

        <ServicePage sideImage={accentImage}>
          <ServiceHeader>
            Подръжка по време на{' '}
            <PrimaryDarkText colorVariant="A600">Строителство</PrimaryDarkText>
          </ServiceHeader>
          <Spacer gap={6} />

          <ServiceParagraph
            title={
              <>
                Геодезия в{' '}
                <PrimaryDarkText colorVariant="A600">
                  Строителството
                </PrimaryDarkText>
              </>
            }
            content={
              <>
                <VisualAid srcImg={constImg} horizontal={horizontal}>
                  <Ty>
                    Геодезията играе изключително важна роля в строителството на
                    сгради и съоръжения. За да се гарантира високо качество на
                    строежа, много етапи от процеса изискват прецизни измервания
                    и трасиране. В зависимост от типа на обекта, може да се
                    наложат множество различни геодезически задачи, но най-често
                    се изискват следните:
                  </Ty>

                  <Spacer gap={4} />

                  <ServiceBulletList
                    items={[
                      {
                        primary:
                          'Откриване на строителната линия и даване на ниво, съгласно Протокол по образец 2',
                      },
                      {
                        primary:
                          'Трасиране на конструктивни елементи на строежа',
                      },
                      {
                        primary:
                          'Следене на обемите и нивото на изкопи и насипи',
                      },
                      {
                        primary: 'Следене на качеството на изпълнение',
                      },
                    ]}
                  />
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Откриване на{' '}
                <PrimaryDarkText colorVariant="A600">
                  строителна линия
                </PrimaryDarkText>{' '}
                и даване на{' '}
                <PrimaryDarkText colorVariant="A600">ниво</PrimaryDarkText>
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={protokolImg}
                  horizontal={horizontal}
                  right
                  minHeight={'20rem'}
                >
                  <Ty>
                    При започването на строителството, един от ключовите
                    документи е Протоколът по Образец 2. Чрез него се открива
                    строителната площадка, се задава строителна линия и ниво. На
                    този етап, геодезистът играе важна роля, като маркира
                    точното местоположение на сградата върху терена, съобразно
                    проектната документация, и задава изходното ниво. Това ниво
                    е от съществено значение, тъй като върху него се базират
                    всички елементи на строежа, като например нивото на изкопа,
                    котата нула и други.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Трасиране на{' '}
                <PrimaryDarkText colorVariant="A600">
                  конструктивни елементи
                </PrimaryDarkText>
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={mostImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    В проектите по част Конструктивна се предвиждат множество
                    елементи, като колони, шайби и плочи, всеки от които трябва
                    да бъде изпълнен на точно определено местоположение и на
                    определено ниво, спрямо кота нула. При по-малки строежи може
                    да няма нужда от толкова подробно трасиране, но практиката
                    показва, че при сгради, по-големи от еднофамилна къща, има
                    голям риск от грешно полагане на конструктивни елементи.
                    Това може да доведе до скъпи корекции и трайно влошаване на
                    качествата на сградата.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Следене на{' '}
                <PrimaryDarkText colorVariant="A600">обемите</PrimaryDarkText>{' '}
                на изкопи и насипи
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={izkopImg}
                  horizontal={horizontal}
                  right
                  minHeight={'30rem'}
                >
                  <Ty>
                    За почти всеки строеж е необходимо извършване на изкопни
                    работи за полагане на основите. За да се определи точно
                    обемът на изкопните работи, може да се направи заснемане
                    преди началото на работите и отново след приключването им.
                    Това не само осигурява висока точност на резултатите, но и
                    намалява риска от конфликти с подизпълнители. При изпълнение
                    на вертикалната планировка, почти винаги се налага
                    извършване на изкопи и насипи. Ако проектът обхваща голяма
                    площ или включва значителни промени на съществуващия терен,
                    е препоръчително нивото на изкопите и насипите да се следи
                    редовно с помощта на геодезически измервания.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Определяне на{' '}
                <PrimaryDarkText colorVariant="A600">
                  деформации
                </PrimaryDarkText>{' '}
                и следене на изпълнението на проектите
              </>
            }
            content={
              <>
                <VisualAid srcImg={deformationImg} horizontal={horizontal}>
                  <Ty>
                    При някои видове строежи, строителните допуски за
                    конструктивните елементи са изключително строги. В такива
                    случаи, освен да се трасират елементите, се изисква и
                    тяхното проверяване за съответствие с проектната
                    документация. При определени строежи е необходимо да се
                    следят и деформациите на сградата. Например, при тежки
                    съоръжения като силози за зърно, е очаквано да има някакво
                    ниво на почвеното слагане. За да се гарантира безопасна
                    експлоатация, тези деформации трябва да се следят за да се
                    уверим, че не превишават допустимите граници и не водят до
                    наклон на съоръжението.
                  </Ty>
                </VisualAid>
              </>
            }
          />
        </ServicePage>
      </PageLayout>
    </>
  );
}
