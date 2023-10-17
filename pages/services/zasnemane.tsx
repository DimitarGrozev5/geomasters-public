import {
  Breadcrumbs,
  useMediaQuery,
  Link as MuiLink,
  Typography as Ty,
} from '@mui/material';

import Link from 'next/link';

import Span from '../../components/common/data-presentation/span';
import Spacer from '../../components/common/data-presentation/spacer';
import PageLayout from '../../components/layouts/page-layout/page-layout';
import PrimaryDarkText from '../../components/common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../components/common/display-modifiers/secondary-dark-text';

import accentImage from '../../public/images/services/zasnemane/zasnemane.jpg';
import sureveyorImg from '../../public/images/services/zasnemane/surveyor.jpg';
import sureveyor2Img from '../../public/images/services/zasnemane/surveyor2.webp';
import snimka1Img from '../../public/images/services/zasnemane/snimka1.png';
import snimka2Img from '../../public/images/services/zasnemane/snimka2.png';
import vizaImg from '../../public/images/services/zasnemane/viza.jpg';
import izkopImg from '../../public/images/services/zasnemane/izkop.png';

import VisualAid from '../../components/layouts/page-services/visual-aid';
import ServiceHeader from '../../components/layouts/page-services/service-header';
import ServiceParagraph from '../../components/layouts/page-services/service-paragraph';
import ServiceBulletList from '../../components/layouts/page-services/bullet-list';
import ServicePage from '../../components/layouts/page-services/service-page';
import Head from 'next/head';

export default function TrasiranePage() {
  const horizontal = useMediaQuery('(min-width:900px)');

  return (
    <>
      <Head>
        <title>Геодезическо заснемане: Кога е необходимо?</title>
        <meta
          name="description"
          content="Геодезическото заснемане е необходимо практически при всяка дейност, свързана със строителство, проектиране или кадастър. Обикновено не е необходимо да се поръчва отделно, а е включвено като част от другите услуги, които използват геодезически данни. Въпреки това, има някои случаи, когато геодезическото заснемане трябва да се извърши самостоятелно:"
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
          <Ty sx={{ color: (theme) => theme.palette.primary.A500 }}>
            Заснемане
          </Ty>
        </Breadcrumbs>
        <ServicePage sideImage={accentImage}>
          <ServiceHeader>
            Геодезическо{' '}
            <PrimaryDarkText colorVariant="A600">Заснемане</PrimaryDarkText>
          </ServiceHeader>
          <Spacer gap={6} />

          <ServiceParagraph
            title={
              <>
                Кога има нужда от{' '}
                <PrimaryDarkText colorVariant="A600">Заснемане</PrimaryDarkText>{' '}
                и какво представлява?
              </>
            }
            content={
              <>
                <VisualAid srcImg={sureveyorImg} horizontal={horizontal}>
                  <Ty>
                    Геодезическото заснемане е необходимо практически при всяка
                    дейност, свързана със строителство, проектиране или
                    кадастър. Обикновено не е необходимо да се поръчва отделно,
                    а е включвено като част от другите услуги, които използват
                    геодезически данни. Въпреки това, има някои случаи, когато
                    геодезическото заснемане трябва да се извърши самостоятелно:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary:
                          'Преди да започнете проектиране на сграда, трябва да заснемете имота или терена.',
                      },
                      {
                        primary:
                          'Когато е необходимо да знаете обема на строителен изкоп.',
                      },
                      { primary: 'За да заснемете фасадата на сграда.' },
                      {
                        primary:
                          'За определяне на площа, върху която ще се полага някаква настилка или площа на прозорци, на които ще се слага дограма.',
                      },
                      {
                        primary:
                          'Винаги, когато са нужни точните размери и местоположение на даден обект може да се поръча геодезическо заснемане.',
                      },
                    ]}
                  />
                </VisualAid>

                <Spacer gap={4} />

                <VisualAid right srcImg={snimka1Img} horizontal={horizontal}>
                  <Ty>
                    Геодезическото заснемане цели да определи точното
                    местоположение на точки от земната повърхност, от сграда или
                    съоражение. За тази цел се използват специализирани
                    инструменти, които гарантират висока точност на измерване.
                    Когато поръчате заснемане, ще бъдат извършени следните
                    дейности:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary:
                          'Лицензиран инженер геодезист ще се запознае с вашите документи и изисквания и ще избере най-подходящия инструмент и метод на измерване. Той ще подготви необходимите изходни данни за провеждане на заснемането.',
                      },
                      {
                        primary:
                          'В удобен за вас ден ще бъде извършено заснемането. Ще се срещнете на място и ще бъдат направени необходимите измервания.',
                      },
                      {
                        primary:
                          'След това геодезистът ще обработи измерванията и ще оформи документацията, която е необходима за конкретната задача.',
                      },
                    ]}
                  />
                  <Spacer gap={4} />
                  <Ty>
                    Ако не сте сигурни, дали имате нужда от геодезическо
                    заснемане, Свържете се с нас за безплатна консултация.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Какви <SecondaryDarkText>документи</SecondaryDarkText> са
                необходими, за да възложа{' '}
                <PrimaryDarkText colorVariant="A600">задачата</PrimaryDarkText>?
              </>
            }
            content={
              <>
                <VisualAid srcImg={vizaImg} horizontal={horizontal}>
                  <Ty>
                    За започване на работа по задачата са необходими следните
                    документи:
                  </Ty>
                  <Ty>
                    <PrimaryDarkText>Задължителни документи</PrimaryDarkText>
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: 'Удостоверяване на правен интерес',
                        secondary:
                          'Необохдимо е да информирате геодезиста какъв е правният Ви интерес - дали сте собственик на имота или имате някакви търговски отношения със собственика.',
                      },
                    ]}
                  />
                  <Ty>
                    <PrimaryDarkText>Може да потрябват</PrimaryDarkText>
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: 'Нотариален акт за имота',
                        secondary:
                          'Може да е необходим, за да се идентифицира имотът.',
                      },
                      {
                        primary: 'Скица на имота',
                        secondary:
                          'Може да е небоходима, за да се извлекат границите на имотa.',
                      },
                      {
                        primary: 'Виза за проектиране/ПУП/РУП',
                        secondary:
                          'Когато извършвате заснемане за проектиране, е необходимо да се нанесат линиите на застройка.',
                      },
                      {
                        primary: 'Проектна документация',
                        secondary:
                          'Когато се заснема сграда или се определят обеми, може да са необходими проектните чертежи на строежа, за извличане на допълнителна информация',
                      },
                    ]}
                  />

                  <Ty>
                    <Span sx={{ textDecoration: 'underline' }}>
                      <SecondaryDarkText>Внимание: </SecondaryDarkText>
                    </Span>
                    Посочените документи обикновено са достатъчни, но всеки
                    случай е индивидуален и може да се наложи изискването на
                    допълнителни документи.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Как протича{' '}
                <PrimaryDarkText colorVariant="A600">
                  Заснемането
                </PrimaryDarkText>{' '}
                и колко време отнема?
              </>
            }
            content={
              <>
                <VisualAid right srcImg={sureveyor2Img} horizontal={horizontal}>
                  <Ty>
                    Преди започване на заснемането е важно да има осигурен
                    достъп до обекта и теренът да бъде почистен от високи треви
                    и предмети, които могат да пречат на свободното придвижване
                    на геодезиста. Може да бъде необходимо преместването на
                    животни или предмети, които пречат на достъпа. Ако се
                    заснема фасадата на сграда, може да се наложи да осигурите
                    достъп до горните етажи и/или покрива. Тези детайли
                    обикновено се уточняват от геодезиста преди заснемането.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    Продължителността на заснемането зависи от сложността на
                    обекта, като може да варира много. Обикновено продължава
                    около час и половина, но е препоръчително да имате поне
                    два-три часа на разположение, ако възникнат непредвидени
                    обстоятелства. Ако има свободен достъп до имота, може и да
                    не е необходимо да присъствате по време на заснемането.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Какво ще <SecondaryDarkText>получа</SecondaryDarkText> като
                краен{' '}
                <PrimaryDarkText colorVariant="A600">продукт</PrimaryDarkText>?
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={snimka2Img}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    При геодезическо заснемане за проектиране ще получите
                    подробна снимка на терена, на която са изобразени всички
                    сгради, алеи, инфраструктурни обекти, комуникации,
                    разтителност и теренни хоризонтали. Ситуацията се нанася
                    върху извадка от плана за имота, с нанесени данни от визата
                    за проектиране. По ваше предпочитание може да получите
                    данните на хартиен носител и/или в цифров вид.
                  </Ty>
                </VisualAid>
                <Spacer gap={6} />
                <VisualAid
                  right
                  srcImg={izkopImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    При геодезическо заснемане на фасадата на сграда или при
                    определяне на обема на изкоп, ще получите подписан и
                    подпечатан чертеж, на който са изобразени заснетите величини
                    и са предоставени необходимите данни, чрез които са
                    изчислени получените стойности.
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
