import Head from "next/head";
import PageLayout from "../components/layouts/page-layout/page-layout";
import PageCard from "../components/layouts/page-card/page-card";
import { Box } from "@mui/material";

import BgImage from "../components/common/helper/background-image";
import logoImg from "../public/logo.png";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Кои сме ние? - GeoMasters</title>
        <meta
          name="description"
          content="GeoMasters е Геодезическа фирма, която Ви дава достъп до специалисти от цялата страна, всеки от които е запознат със спецификите на местната общинска администрация и ще може да Ви предложи възможно най-качествената услуга."
        />
      </Head>
      <PageLayout>
        <PageCard>
          <Box
            sx={{
              alignSelf: "center",
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 4,
              alignItems: "center",
              maxWidth: { xs: "400px", md: "800px" },
            }}
          >
            <Box
              sx={{
                flex: 1,
                position: "relative",
                alignSelf: "stretch",
                minHeight: "250px",
              }}
            >
              <BgImage
                srcImg={logoImg}
                objectFit="contain"
                sizes={{
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              Geomasters е начинание, което обединява усилията на способни
              геодезисти, от цялата страна. Работейки с нас, ще може да се
              възползвате от знанията и уменията на специалисти с дългогодишен
              опит, които са добре запознати с изискванията на местните
              администрации.
            </Box>
          </Box>
        </PageCard>
      </PageLayout>
    </>
  );
}
