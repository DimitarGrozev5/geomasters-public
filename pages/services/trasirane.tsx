import {
  Box,
  Stack,
  Breadcrumbs,
  useMediaQuery,
  Link as MuiLink,
  Typography as Ty,
  Button,
} from '@mui/material';

import Link from 'next/link';

import Span from '../../components/common/data-presentation/span';
import Spacer from '../../components/common/data-presentation/spacer';
import PageLayout from '../../components/layouts/page-layout/page-layout';
import PrimaryDarkText from '../../components/common/display-modifiers/primary-dark-text';
import SecondaryDarkText from '../../components/common/display-modifiers/secondary-dark-text';

import naImg from '../../public/images/services/trasirane/na.jpg';
import niviImg from '../../public/images/services/trasirane/greshna-niva.png';
import stakeImg from '../../public/images/services/trasirane/stake.webp';
import planoveImg from '../../public/images/services/trasirane/planove.png';
import accentImage from '../../public/images/services/trasirane/trasirane.jpg';
import kombiSKicaImg from '../../public/images/services/trasirane/kombi-skica.png';
import geomastersImg from '../../public/logo.png';

import VisualAid from '../../components/layouts/page-services/visual-aid';
import ServiceHeader from '../../components/layouts/page-services/service-header';
import ServiceParagraph from '../../components/layouts/page-services/service-paragraph';
import ServiceBulletList from '../../components/layouts/page-services/bullet-list';
import ServicePage from '../../components/layouts/page-services/service-page';
import Head from 'next/head';
import { emailContact, phoneContact } from '../../data/contacts';
import PhoneContact from '../../components/common/contacts/phone-contact';
import EmailContact from '../../components/common/contacts/email-contact';
import SendMessage from '../../components/common/contacts/send-message';
import { useGlobalContext } from '../../components/layouts/main-layout/context/global-ctx';

export default function TrasiranePage() {
  const horizontal = useMediaQuery('(min-width:900px)');

  const { openSendMessage } = useGlobalContext();
  return (
    <>
      <Head>
        <title>Трасиране на имот: Какво представялва и имам ли нужда?</title>
        <meta
          name="description"
          content="Трасирането на имот се налага винаги, когато трябва да знаете от точните му граници. Наемете лицензиран инженер геодезист, за да получите прецизно решение и да си спестите множество проблеми в бъдеще."
        />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
          "@type": "Question",
          "name": "Кога има нужда от Трасиране?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "<p>Множество ситуации изискват точно определени граници на поземлен имот, като например:</p><ul><li>В случай на спор със съсед за границата</li><li>При закупуване на недвижим имот</li><li>Когато няма материализирана ограда на терена и не знаете реалните граници на имота си</li><li>Преди изграждане на масивна ограда</li><li>Преди обработване на ниви, овощни градини и други селскостопански имоти</li><li>Преди извършване на строителство, близо до границата</li></ul>"
          }
        }, {
          "@type": "Question",
          "name": "Какво да очаквам ако поръчам Трасиране?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "<p>Ако решите да поръчате трасиране, можете да очаквате следното:</p><ul><li>Лицензиран инженер геодезист ще разгледа документите ви, за да определи дали имотът ви е поземлен или урегулиран.</li><li>Инженерът ще определи кой е правилният план за трасиране на границите на имота ви - по кадастрална карта, кадастрален план, регулационен план, план за новообразувани имоти или друг актуален план за местността.</li><li>След това ще уредите удобно време за да отидете до имота и да маркирате реалното местоположение на границата.</li><li>Накрая, ще получите протокол за извършеното трасиране.</li></ul>"
          }
        }, {
          "@type": "Question",
          "name": "Какви документи са необходими",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "<p>Задължително трябва да предоставите документ за собственост. Възможно е да потрябва скица на имота.</p>"
          }
        }, {
          "@type": "Question",
          "name": "Как протича Трасирането на имот",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "<p>Преди да започнете трасирането на границите на имота си, е важно да се уверите, че теренът около границите е подготвен и изчистен от храсти, високи треви и предмети, които може да попречат на свободното придвижване. Препоръчваме да уведомите съседите си и да ги поканите да присъстват, за да видят лично къде точно се намират границите. Ако са навлезли в имота ви, е добре да се осигури достъп от тяхната страна на оградата.</p><p>По време на трасрането геодезистът ще маркира границите с дървени колчета, арматури или с цветен спрей. Продължителността на процеса може да варира в зависимост от наличността на геодезически работни точки, състоянието на GPS спътниците и обстоятелствата в самия имот, но в повечето случаи малък имот може да се трасира за под час. След приключване на трасирането, ще бъде подписан протокол.</p>"
          }
        }]
    }`}
        </script>
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
            Трасиране
          </Ty>
        </Breadcrumbs>
        <ServicePage sideImage={accentImage}>
          <ServiceHeader>
            <PrimaryDarkText colorVariant="A600">Трасиране</PrimaryDarkText> на
            границите на имот
          </ServiceHeader>
          <Spacer gap={6} />

          <ServiceParagraph
            title={
              <>
                Кога има нужда от{' '}
                <PrimaryDarkText colorVariant="A600">Трасиране</PrimaryDarkText>
                ?
              </>
            }
            content={
              <>
                <VisualAid srcImg={kombiSKicaImg} horizontal={horizontal}>
                  <Ty>
                    Множество ситуации изискват точно определени граници на
                    поземлен имот, като например:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      { primary: 'В случай на спор със съсед за границата' },
                      { primary: 'При закупуване на недвижим имот' },
                      {
                        primary:
                          'Когато няма материализирана ограда на терена и не знаете реалните граници на имота си',
                      },
                      { primary: 'Преди изграждане на масивна ограда' },
                      {
                        primary:
                          'Преди обработване на ниви, овощни градини и други селскостопански имоти',
                      },
                      {
                        primary:
                          'Преди извършване на строителство, близо до границата',
                      },
                    ]}
                  />
                </VisualAid>

                <Spacer gap={4} />

                <VisualAid right srcImg={niviImg} horizontal={horizontal}>
                  <Ty>
                    Много често се случва оградите, които съществуват на място,
                    да не съответстват на оградите, отбелязани в кадастралната
                    карта или регулационния план. Това може да доведе до ненужни
                    конфликти със съседите.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    Ако притежавате имот, е препоръчително да направите
                    трасиране на границите му, дори ако вече има съществуваща
                    стара ограда. Така ще бъдете сигурни, че никой не е навлязъл
                    на вашата собственост и ще можете да го ползвате спокойно.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Какво да очаквам ако поръчам{' '}
                <PrimaryDarkText colorVariant="A600">Трасиране</PrimaryDarkText>
                ?
              </>
            }
            content={
              <>
                <VisualAid srcImg={planoveImg} horizontal={horizontal}>
                  <Ty>
                    Ако решите да поръчате трасиране, можете да очаквате
                    следното:
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary:
                          'Лицензиран инженер геодезист ще разгледа документите ви, за да определи дали имотът ви е поземлен или урегулиран.',
                      },
                      {
                        primary:
                          'Инженерът ще определи кой е правилният план за трасиране на границите на имота ви - по кадастрална карта, кадастрален план, регулационен план, план за новообразувани имоти или друг актуален план за местността.',
                      },
                      {
                        primary:
                          'След това ще уредите удобно време за да отидете до имота и да маркирате реалното местоположение на границата.',
                      },
                      {
                        primary:
                          'Накрая, ще получите протокол за извършеното трасиране.',
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
                <VisualAid right srcImg={naImg} horizontal={horizontal}>
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
                        primary: 'Документ за собственост',
                        secondary:
                          'Необходим е, за да можем да идентифицираме имотът Ви и да определим от кой план да извлечем данни',
                      },
                    ]}
                  />
                  <Ty>
                    <PrimaryDarkText>Може да потрябват</PrimaryDarkText>
                  </Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: 'Скица на имота',
                        secondary:
                          'Необходима е, за да се извлекат границите на имотa',
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
                  Трасирането
                </PrimaryDarkText>{' '}
                на границите и колко време отнема?
              </>
            }
            content={
              <>
                <VisualAid srcImg={stakeImg} horizontal={horizontal}>
                  <Ty>
                    Преди да започнете трасирането на границите на имота си, е
                    важно да се уверите, че теренът около границите е подготвен
                    и изчистен от храсти, високи треви и предмети, които може да
                    попречат на свободното придвижване. Препоръчваме да
                    уведомите съседите си и да ги поканите да присъстват, за да
                    видят лично къде точно се намират границите. Ако са навлезли
                    в имота ви, е добре да се осигури достъп от тяхната страна
                    на оградата.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    По време на трасрането геодезистът ще маркира границите с
                    дървени колчета, арматури или с цветен спрей.
                    Продължителността на процеса може да варира в зависимост от
                    наличността на геодезически работни точки, състоянието на
                    GPS спътниците и обстоятелствата в самия имот, но в повечето
                    случаи малък имот може да се трасира за под час. След
                    приключване на трасирането, ще бъде подписан протокол.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                <PrimaryDarkText>Потърсете</PrimaryDarkText> ни сега, за да
                получите <SecondaryDarkText>безплатна</SecondaryDarkText>{' '}
                консултация!
              </>
            }
            content={
              <>
                <VisualAid
                  right
                  srcImg={geomastersImg}
                  objectFit="contain"
                  horizontal={horizontal}
                  minHeight={400}
                >
                  <Ty>Свържете се с нас чрез:</Ty>
                  <ServiceBulletList
                    items={[
                      {
                        primary: (
                          <PhoneContact phone={phoneContact} size="h5" />
                        ),
                        secondary: 'Телефон',
                      },
                      {
                        primary: (
                          <EmailContact email={emailContact} size="h5" />
                        ),
                        secondary: 'Емейл',
                      },
                      {
                        primary: (
                          <SendMessage
                            onClick={openSendMessage}
                            label="Съобщение"
                          />
                        ),
                        secondary: 'Изпратете директно съобщение',
                      },
                    ]}
                  />
                </VisualAid>
              </>
            }
          />
        </ServicePage>
      </PageLayout>
    </>
  );
}
