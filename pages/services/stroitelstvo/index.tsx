import {
  Breadcrumbs,
  useMediaQuery,
  Link as MuiLink,
  Typography as Ty,
} from '@mui/material';

import Link from 'next/link';

import Spacer from '../../../components/common/data-presentation/spacer';
import PageLayout from '../../../components/layouts/page-layout/page-layout';
import PrimaryDarkText from '../../../components/common/display-modifiers/primary-dark-text';

import accentImage from '../../../public/images/services/stroitelstvo/side.jpg';
import homeImg from '../../../public/images/services/stroitelstvo/home.jpg';
import regulaciaImg from '../../../public/images/services/stroitelstvo/regulacia.png';
import vpImg from '../../../public/images/services/stroitelstvo/vp.png';
import constructionImg from '../../../public/images/services/stroitelstvo/construction.jpg';
import cadastreImg from '../../../public/images/services/stroitelstvo/cadastre.jpg';

import VisualAid from '../../../components/layouts/page-services/visual-aid';
import ServiceHeader from '../../../components/layouts/page-services/service-header';
import ServiceParagraph from '../../../components/layouts/page-services/service-paragraph';
import ServicePage from '../../../components/layouts/page-services/service-page';
import Head from 'next/head';

export default function TrasiranePage() {
  const horizontal = useMediaQuery('(min-width:900px)');

  return (
    <>
      <Head>
        <title>
          Строителство и геодезия: Трябва ли ми геодезист, когато строя?
        </title>
        <meta
          name="description"
          content="Ако имате намерение да започнете строеж, търсите проектанти или процесът е вече започнал или дори е на път да приключи, лицензиран геодезист ще бъдат от изключителна помощ и значимост във всеки един етап. От урегулиране на имота, през проектиране, изпълнението на строителството, до въвеждането му в експлоатация."
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
            Строителство
          </Ty>
        </Breadcrumbs>
        <ServicePage sideImage={accentImage}>
          <ServiceHeader>
            Геодезия в{' '}
            <PrimaryDarkText colorVariant="A600">
              Строителството
            </PrimaryDarkText>
          </ServiceHeader>
          <Spacer gap={6} />

          <ServiceParagraph
            title={
              <>
                Кога има нужда от{' '}
                <PrimaryDarkText colorVariant="A600">Геодезист</PrimaryDarkText>
                ?
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={homeImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    Ако имате намерение да започнете строеж, търсите проектанти
                    или процесът е вече започнал, дори да е на път да приключи,
                    лицензиран геодезист ще бъде необходим във всеки един етап.
                    От урегулиране на имота, през проектиране и изпълнение на
                    строителството, до въвеждането му в експлоатация.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                <PrimaryDarkText colorVariant="A600">
                  Урегулиране
                </PrimaryDarkText>{' '}
                на поземления имот
              </>
            }
            content={
              <>
                <VisualAid
                  right
                  srcImg={regulaciaImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    В най-добрия случай бихте имали урегулиран поземлен имот,
                    който би ви позволил да започнете строителството без
                    забавяне. Често е необходимо да се изготви подробен
                    устройствен план за имота (ПУП), преди да започнете
                    строителството. Изготвянето на ПУП е един от по-скъпите и
                    бавни процеси в инвестиционното проектиране и изисква
                    съвместната работа на геодезист и архитект. Ако смятате, че
                    имате нужда от изготвяне на ПУП, свържете се с нас.
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Изготвяне на{' '}
                <PrimaryDarkText colorVariant="A600">Проекти</PrimaryDarkText>
              </>
            }
            content={
              <>
                <VisualAid srcImg={vpImg} horizontal={horizontal}>
                  <Ty>
                    След като сте изготвили ПУП или получили виза за проектиране
                    от общинската администрация, е време да проектирате бъдещата
                    сграда. Необходимите проектни части варират в зависимост от
                    вида, предназначението и местоположението на обекта, но
                    почти винаги включват следните:{' '}
                    <PrimaryDarkText colorVariant="A600">
                      Архитектурна, Конструктивна, Геодезия, Електрическа, Води
                      и Канализация
                    </PrimaryDarkText>
                    . В зависимост от нуждите и местните изисквания, може да
                    включва и други части като: Енергийна ефективност,
                    Паркоустрояване и Благоустрояване, Технологична, Пожарна
                    безопасност, План по безопасност и здраве, организация и
                    безопасност на движението и други.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    Геодезистът има важна роля на този етап от проекта, тъй като
                    трябва да изготви проектите по част Геодезия. Това включва
                    изработването на трасировъчен план, вертикална планировка,
                    картограма на земните маси и при необходимост, трасировъчни
                    планове за новопроектирани електропроводи и ВиК връзки.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    За повече информация вижте{' '}
                    <MuiLink
                      component={Link}
                      href="/services/stroitelstvo/proektirane"
                    >
                      тази връзка
                    </MuiLink>
                    .
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                <PrimaryDarkText colorVariant="A600">
                  Строителство
                </PrimaryDarkText>{' '}
                на сградата
              </>
            }
            content={
              <>
                <VisualAid
                  right
                  srcImg={constructionImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    След като сте изготвили проектната документация и сте
                    получили разрешение за строеж от общинската администрация,
                    следва да се възползвате от услугите на геодезист, който да
                    открие строителната линия и да даде изходно ниво. Тези
                    задачи са необходими за изготвянето на протокол по образец
                    2, който е задължителен за започване на строителството на
                    сградата, а съшо така са необходими и за строителя, за да
                    знае къде точно в имота трябва да се намира сградата.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    Ако строителството, което планирате, е по-мащабно, може да
                    имате нужда от допълнителни услуги, като например наблюдение
                    на обема на изкопните работи, трасиране на конструктивните
                    елементи на сградата и контрол за спазване на
                    конструктивните допуски.
                  </Ty>
                  <Spacer gap={4} />
                  <Ty>
                    За повече информация вижте{' '}
                    <MuiLink
                      component={Link}
                      href="/services/stroitelstvo/podrujka"
                    >
                      тази връзка
                    </MuiLink>
                    .
                  </Ty>
                </VisualAid>
              </>
            }
          />

          <ServiceParagraph
            title={
              <>
                Въвеждане в{' '}
                <PrimaryDarkText colorVariant="A600">
                  Експлоатация
                </PrimaryDarkText>
              </>
            }
            content={
              <>
                <VisualAid
                  srcImg={cadastreImg}
                  horizontal={horizontal}
                  minHeight={'20rem'}
                >
                  <Ty>
                    Ключов момент при изграждане на сграда е завършване на
                    грубия строеж. Това е фазата, в която сградата вече има
                    изградени ограждащи стени и покрив, но все още има нужда от
                    множество довършителни работи. След като сградата е
                    завършена до груб строеж, трябва да се пристъпи към
                    следващата важна административна стъпка - попълването й в
                    Кадастралната карта. Попълването на сградата е важно
                    условие, за издаване на Акт 16, чрез който се въвежда в
                    експлоатация.
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
