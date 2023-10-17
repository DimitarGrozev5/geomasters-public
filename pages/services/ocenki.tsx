import {
  Breadcrumbs,
  useMediaQuery,
  Link as MuiLink,
  Typography as Ty,
} from '@mui/material';

import Link from 'next/link';

import Spacer from '../../components/common/data-presentation/spacer';
import PageLayout from '../../components/layouts/page-layout/page-layout';
import PrimaryDarkText from '../../components/common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../components/common/display-modifiers/secondary-dark-text';

import accentImage from '../../public/images/services/zasnemane/zasnemane.jpg';
import sureveyor2Img from '../../public/images/services/zasnemane/surveyor2.webp';
import agenciaImg from '../../public/images/services/cadastre/agencia.png';
import cadastreImg from '../../public/images/services/cadastre/cadastre.jpg';
import etajImg from '../../public/images/services/cadastre/etaj.jpg';
import odobrenoImg from '../../public/images/services/cadastre/odobreno.jpg';
import registarImg from '../../public/images/services/cadastre/registar.jpg';
import skicaImg from '../../public/images/services/cadastre/skica.jpg';
import skicaProektImg from '../../public/images/services/cadastre/skica-proekt.jpg';
import naImg from '../../public/images/services/cadastre/na.jpg';

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
        <title>Оценки на имоти</title>
        <meta
          name="description"
          content="Оценка на имоти се налага винаги когато се ипотекира недвижим имот."
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
            Оценки на имоти
          </Ty>
        </Breadcrumbs>
        <ServicePage sideImage={accentImage}>
          <ServiceHeader>
            Услуги свързани с{' '}
            <PrimaryDarkText colorVariant="A600">Оценки</PrimaryDarkText> на
            имоти
          </ServiceHeader>
          <Spacer gap={6} />

          <ServiceParagraph
            title={
              <>
                Какво е{' '}
                <PrimaryDarkText colorVariant="A600">Оценка</PrimaryDarkText> на
                имот?
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={agenciaImg}
                  horizontal={horizontal}
                  minHeight={300}
                  objectPosition="top"
                >
                  <Ty>
                    Кадастралната карта и кадастралните регистри (КККР)
                    представляват информационна система, която има за цел да
                    отговори на следният важен въпрос -{' '}
                    <PrimaryDarkText>
                      какви са истинските граници, размери и местоположение на
                      недвижимия имот, описан в нотариалния ми акт
                    </PrimaryDarkText>
                    . Кадастралната карта и регистри се поддържат от Агенцията
                    по Геодезия, Картография и Кадастър. Понастоящем
                    кадастралната карта покрива над 95% от цялата страна, така
                    че ако притежавате недвижим имот, е много вероятно в един
                    момент да се наложи да използвате услуга по кадастър.
                  </Ty>
                </VisualAid>

                <Spacer gap={4} />

                <VisualAid right srcImg={cadastreImg} horizontal={horizontal}>
                  <Ty>Кадастралната карта съдържа:</Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary:
                          'Държавните граници, границите на административно-териториалните единици, землищните граници и границите на територии с еднакво трайно предназначение',
                      },
                      {
                        primary:
                          'Поземлените имоти с границите и идентификаторите им',
                      },
                      {
                        primary: 'Сградите и идентификаторите им',
                      },
                      {
                        primary:
                          'Наименованията на местности, улици, водни течения и площи и други обекти',
                      },
                      {
                        primary: 'Точките от геодезическата основа',
                      },
                    ]}
                  />
                  <Ty>
                    В кадастралните регистри се съхранява подробна информация за
                    собствениците на недвижими имоти и сгради, заедно с
                    нотариалните им актове. Вписването на нотариален акт в
                    кадастралните регистри води до повече сигурност върху
                    собствеността Ви.
                  </Ty>
                  <Spacer gap={4} />
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Как се прави{' '}
                <PrimaryDarkText colorVariant="A600">Оценка</PrimaryDarkText> на
                имот?
              </>
            }
            content={
              <>
                <VisualAid srcImg={skicaProektImg} horizontal={horizontal}>
                  <Ty>
                    Целта на кадастралната карта е да отразява обективната
                    реалност, но на практика не винаги е така. При създаването
                    й, геодезистите използват наличните картни материали,
                    провеждат анкетиране на собствениците и измерват оградите, и
                    сградите. Въпреки тези усилия, при създаването на карта,
                    която обхваща цяло населено място, неизбежно се допускат
                    неточности и грешки. Може да има грешно положени огради,
                    несъвпадения между площите по документите и реалните размери
                    на имота, неправомерно построени сгради и т.н. Често
                    собствениците не успяват да видят тези проблеми навреме.
                  </Ty>

                  <Spacer gap={4} />

                  <Ty>
                    Дори след като е създадена кадастралната карта, постоянно се
                    случват промени. Имотите се делят и обединяват, строят се
                    нови сгради, преустройват се апартаменти и др. Във ваш
                    интерес е да проверите дали кадастралната карта, за вашия
                    имот, отговаря на реалността и да се грижите за своевременно
                    отразяване на всички промени.
                  </Ty>
                </VisualAid>

                <Spacer gap={4} />

                <VisualAid srcImg={etajImg} horizontal={horizontal} right>
                  <Ty>
                    Това са най-често срещаните задачи, свързани с промяна на
                    кадастралната карта:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary:
                          'Делба на недвижим имот или обединение на недвижими имоти',
                        secondary:
                          'Делба или обединение на имот в неурбанизирана територия се правят чрез проект за промяна на кадастралната карта. Геодезистът изготвя проекта, в съответствие с вашите желания и законовите изисквания. След като проектът бъде входиран в кадастъра, се издава скица-проект, която в случая на доброволна делба може да бъде използвана пред нотариус, за изготвяне на договор.',
                      },
                      {
                        primary: 'Нанасяне на границите по ПУП',
                        secondary:
                          'Делба, обединение или промяна на границите, в урбанизирана територия, се правят чрез изготвяне на подробен устройствен план (ПУП). В такива случаи, промяната която се предвижда в ПУП, трябва да се нанесе в кадатралната карта.',
                      },
                      {
                        primary: 'Отстраняване на непълноти и грешки',
                        secondary:
                          'При създаване на кадастралната карта е възможно да възникнат най-разнообразни непълноти и грешки. Най-често става дума за несъответствие между нотариален акт и имот, грешни или лиспващи данни в кадастралния регистър, или грешно нанесена ограда. Точната промяна, която се изисква може да бъде определена след разглеждане на документите Ви.',
                      },
                      {
                        primary: 'Нанасяне на сграда',
                        secondary:
                          'Нанасяне на сграда се налага обикновено при ново строителство. След като сградата бъде построена до степен груб строеж, следва да се заснеме и нанесе в кадастралната карта, като това е необходимо условие за последващото въвеждане в експлоатация. Понякога е възможно и стара сграда да не е нанесена в картата. Процедурата там е сходна.',
                      },
                      {
                        primary: 'Нанасяне на самостоятелен обект в сграда',
                        secondary:
                          'Самостоятелен обект в сграда е етаж или част от етаж в сграда (апартамент, магазин, ателие, гараж и др.), който има самостоятелно функционално предназначение и собствеността върху него се удостоверява с документ за собственост или друго вещно право. За да можете да извършвате разпоредителни сделки, е небходимо самостоятелният обект да е нанесен в кадастралната карта.',
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
                Какви <SecondaryDarkText>документи</SecondaryDarkText> са
                необходими, за да възложа{' '}
                <PrimaryDarkText colorVariant="A600">задачата</PrimaryDarkText>?
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={naImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                  objectPosition="top"
                >
                  <Ty>
                    Като абсолютен минимум трябва да носите следните документи:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: 'Документ, който удостоверява правен интерес',
                        secondary:
                          'Това обикновено е нотариален акт, но е възможно и да е друг вид документ, например съдебно решение, решение на поземлена комисия, разрешение за строеж и други',
                      },
                      {
                        primary:
                          'Документ, който позволява да се идентифицира имотът',
                        secondary:
                          'Много често нотариалният акт е достатъчен, но ако имотът е придобит, преди създаване на кадастралната карта, най-вероятно ще трябва извадка от регулационния или кадастралния план, когато е бил издаден акта. Ако имате стари скици, пригответе ги.',
                      },
                    ]}
                  />
                  <Ty>
                    В процеса на анализиране на документите може да възникне
                    нужда и от други.
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
                  srcImg={odobrenoImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                  objectPosition="top"
                >
                  <Ty>
                    Входирането на проекти за промяна на кадастралната карта се
                    извършва изцяло в цифров вид. Геодезистът може да входира
                    докумените през информационната система на кадастъра, от
                    ваше име. Когато проектът бъде одобрен, ще получите хартиено
                    удостоверение, което ще трябва да занесете в кадастъра.
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
