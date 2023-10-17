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
import trasImg from '../../../public/images/services/vp/tras.png';
import vp1Img from '../../../public/images/services/vp/vp1.png';
import vp2Img from '../../../public/images/services/vp/vp2.png';
import kzmImg from '../../../public/images/services/vp/kzm.png';
import fasadaImg from '../../../public/images/services/vp/fasada.png';
import proektImg from '../../../public/images/services/vp/proekt.png';
import niveletaImg from '../../../public/images/services/vp/niveleta.jpg';
import introImg from '../../../public/images/services/vp/top_view1.jpg';

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
          Проектиране на сгради: Вертикална планировка, трасировъчен план и
          картограма на земните маси
        </title>
        <meta
          name="description"
          content="Геодезическите проекти са неизменна част от почти всеки строителен процес. В зависимост от сложността на обекта, изискванията за различни геодезически разработки могат да варират, но обикновено включват трасировъчен план, вертикална планировка и картограма на земните маси."
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
            Проектиране
          </Ty>
        </Breadcrumbs>
        <ServicePage sideImage={accentImage}>
          <ServiceHeader>
            Инвестиционно проектиране, част{' '}
            <PrimaryDarkText colorVariant="A600">Геодезия</PrimaryDarkText>
          </ServiceHeader>
          <Spacer gap={6} />

          <ServiceParagraph
            title={
              <>
                Какво представляват{' '}
                <PrimaryDarkText colorVariant="A600">проектите</PrimaryDarkText>{' '}
                по част Геодезия
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={introImg}
                  horizontal={horizontal}
                  minHeight={'25rem'}
                >
                  <Ty>
                    Геодезическите проекти са неизменна част от почти всеки
                    строителен процес. В зависимост от сложността на обекта,
                    изискванията за различни геодезически разработки могат да
                    варират, но обикновено включват трасировъчен план,
                    вертикална планировка и картограма на земните маси.
                  </Ty>
                </VisualAid>
              </>
            }
          />
          <ServiceParagraph
            title={
              <>
                <PrimaryDarkText colorVariant="A600">
                  Трасировъчен план
                </PrimaryDarkText>{' '}
                на строежа
              </>
            }
            content={
              <>
                <VisualAid srcImg={trasImg} horizontal={horizontal} right>
                  <Ty>
                    Трасировъчният план описва хоризонталнаа геометрия на
                    проектирания обект и дава необходимите данни за трасиране по
                    време на строителство. В най-ограниченият си обем съдържа
                    информация за изходни точки, трасировъчни данни за външният
                    контур на сградата и препоръка за най-подходящият метод за
                    трасиране. За по-големи и сложни обекти, може да съдържа
                    значително по-подробни данни, за отделните конструктивни
                    елементи на строежа, за нивата им в абсолютни стойности и
                    подробна разработка за мрежата от изходни точки.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                <PrimaryDarkText colorVariant="A600">
                  Вертикална планировка
                </PrimaryDarkText>{' '}
                на сградата и прилежащия терен
              </>
            }
            content={
              <>
                <VisualAid srcImg={vp1Img} horizontal={horizontal}>
                  <Ty>
                    Вертикалното планиране на прилежащия терен е процесът на
                    оформяне на околната среда и позициониране на сградата върху
                    земята, като включва проектиране на различни инфраструктурни
                    елементи като пътища, алеи, рампи, паркинги, стълбища и
                    подпорни стени. За да се осигури оптимално използване на
                    имота и добро отводняване, при изготвянето на вертикалната
                    планировка се вземат предвид множество фактори като
                    геометрията на релефа, наклонът и посоката на водоотвеждане
                    на терена, транспортната инфраструктура, която да осигури
                    удобен и лесен достъп до сградата, културното и историческо
                    наследство на мястото и предпочитанията на клиента.
                  </Ty>
                </VisualAid>
                <Spacer gap={4} />
                <VisualAid srcImg={vp2Img} horizontal={horizontal} right>
                  <Ty>
                    Добрата вертикална планировка може да създаде приятна среда
                    за живеене или работа, като интегрира сградата по-добре в
                    околната среда и подобрява нейния външен вид. Освен това, тя
                    допринася за удобството и безопасността на живущите или
                    работещите в сградата, като осигурява лесен достъп до нея и
                    я предпазва от евентуални наводнения, свлачища и други
                    природни бедствия.
                  </Ty>
                </VisualAid>
              </>
            }
          />
          <ServiceParagraph
            title={
              <>
                <PrimaryDarkText colorVariant="A600">
                  Картограма
                </PrimaryDarkText>{' '}
                на земни маси
              </>
            }
            content={
              <>
                <VisualAid srcImg={kzmImg} horizontal={horizontal}>
                  <Ty>
                    При изработването на вертикална планировка често е
                    необходимо да се извършат изкопни и насипни работи, за да се
                    постигне по-ефективно използване на прилежащия терен. За да
                    се определят обемите на земните работи, които ще бъдат
                    извършени по време на строителството, се използва картограма
                    на земните маси. Целта на картограмата е да минимизира и
                    балансира обемите на изкопите и насипите. Картограмата се
                    изготвя на базата на геодезическото заснемане и проекта за
                    вертикална планировка. Съдържанието на чертежа може да
                    варира в зависимост от изискванията на местната общинска
                    администрация и специфичните нужди на конкретния проект, но
                    винаги включва баланс на изчислените обеми.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Какво е необходимо, за да започне{' '}
                <PrimaryDarkText colorVariant="A600">
                  проектирането
                </PrimaryDarkText>
              </>
            }
            content={
              <>
                <VisualAid srcImg={fasadaImg} horizontal={horizontal} right>
                  <Ty>
                    За започване на работа по задачата е необходимо следното:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: 'Виза за проектиране',
                        secondary:
                          'Визата за проектиране се издава от общинската администрация и съдържа информация за границите на имота и параметрите на застрояване.',
                      },
                      {
                        primary: 'Геодезическо заснемане на имота',
                        secondary:
                          'Геодезическото заснемане изобразява всички елементи, необходими за проектиране - сгради, инфраструктурни обекти, растителност, комуникации, релеф и др.',
                      },
                      {
                        primary:
                          'Проект по част Архитектура и част Конструктивна',
                        secondary:
                          'От проектите по част Архитектура и част Конструктивна се извличат данни за размерите и местоположението на сградата, на база на които се изговят проектите по част Геодезия.',
                      },
                    ]}
                  />
                </VisualAid>
                <Spacer gap={4} />
                <VisualAid srcImg={niveletaImg} horizontal={horizontal}>
                  <Ty>Възможно е да потрябва и следното:</Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: 'Проекти по други части',
                        secondary:
                          'Възможно е да има нужда да се изготви трасировъчен план и вертикална планировка за обекти в някоя от другите части на инвестиционния проект, като например електропроводи, тръбопроводи, изгребни ями, и др.',
                      },
                      {
                        primary:
                          'Нивелетен проект за прилежащите улици или план схема за вертикално планиране',
                        secondary:
                          'Ако има наличен проект за прилежащата улица, проектантът е дъжен да се съобрази.',
                      },
                      {
                        primary: 'Геоложки доклад',
                        secondary:
                          'При мащабни инвестиционни начинаия и при по-спеифични теренни условия, е необходимо да се вземе предвид и геоложката основа, за да се осигури безопасно моделиране на прилежащия терен.',
                      },
                    ]}
                  />
                  <Spacer gap={4} />
                  <Ty>
                    В процеса на проектиране може да възникне нужда и от други
                    материали. Ако не сте сигурни дали имате нещо или не знаете
                    дали ще трябва, конултирайте се с геодезистът, който изготвя
                    проекта.
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
                  srcImg={proektImg}
                  horizontal={horizontal}
                  minHeight={'25rem'}
                  right
                >
                  <Ty>
                    Като краен продукт на проектирането по част Геодезия, ще
                    получите изготвените чертежи и обяснителна записка,
                    предадени в хартиен и в цифров вид. Всички хартиени копия ще
                    бъдат подпечатани от лицензиран инженер геодезист с
                    проектатска правоспособност.
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
