import {
  Box,
  Button,
  Paper,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useScreenOrientation } from "../../../hooks/use-get-screen-orientation";
import { height, width } from "../../../utility/image-util";
import bgImage from "../../../public/images/bg.jpg";
import BgImage from "../../common/helper/background-image";
import { useGlobalContext } from "../../layouts/main-layout/context/global-ctx";
import { StaticImageData } from "next/image";

type MainLandingProps = {
  city?: string;
  backgroundImage?: StaticImageData;
};

const MainLanding: React.FC<MainLandingProps> = ({ city, backgroundImage }) => {
  const orientation = useScreenOrientation();

  const { openSendMessage } = useGlobalContext();

  const [dropHeader, setDropHeader] = useState(-80);
  useEffect(() => {
    setTimeout(() => {
      setDropHeader(0);
    }, 500);
  }, []);

  const [slideFirst, setSlideFirst] = useState(-500);
  const [slideSecond, setSlideSecond] = useState(-500);
  useEffect(() => {
    setTimeout(() => {
      setSlideFirst(0);
      setSlideSecond(0);
    }, 1000);
  }, []);

  const landingRef = useRef<HTMLDivElement>(null);
  const [bgWidth, setBgWidth] = useState(0);
  const [bgHeight, setBgHeight] = useState(height(5756, 3843, bgWidth));

  useEffect(() => {
    const resizeHandler = () => {
      const landingWidth =
        landingRef.current?.getBoundingClientRect().width || 0;
      const landingHeight =
        landingRef.current?.getBoundingClientRect().height || 0;
      let w = landingWidth;
      let h = height(5756, 3843, w);
      if (h < landingHeight + 300) {
        h = landingHeight + 300;
        w = width(5756, 3843, h);
      }

      setBgWidth(w);
      setBgHeight(h);
    };

    resizeHandler();

    const div = landingRef.current;
    if (div) {
      window.addEventListener("resize", resizeHandler);
    }
    return () => {
      if (div) {
        window.removeEventListener("resize", resizeHandler);
      }
    };
  }, []);

  const theme = useTheme();
  const upLG = useMediaQuery(theme.breakpoints.up("lg"));
  const upMD = useMediaQuery(theme.breakpoints.up("md"));
  const upSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Paper
      elevation={10}
      ref={landingRef}
      sx={{
        // border: '3px solid red',
        position: "relative",
        height: (theme) => ({
          xs: `calc(100vh - ${theme.spacing(15)})`,
          md: `calc(100vh - ${theme.spacing(24)})`,
        }),
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: (theme) => theme.spacing(-18),
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <BgImage
          srcImg={backgroundImage ?? bgImage}
          sizes={{
            xs: "100vw",
            sm: "100vw",
            md: "100vw",
            lg: "100vw",
            xl: "100vw",
          }}
          priority
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            p: backgroundImage ? 3 : 0,
            borderRadius: backgroundImage ? 3 : 0,
            backgroundColor: backgroundImage ? "rgba(0, 0, 0, 0.3)" : undefined,
            backdropFilter: backgroundImage ? "blur(2px)" : undefined,

            position: "relative",
            top: { lg: "15vh", md: "20vh", sm: "30vh", xs: "35vh" },
            right: { lg: "-10vw" },
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ position: "relative", top: -80 }}
              animate={{ top: dropHeader }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  // color: (theme) => theme.palette.alternative.A600,
                  color: (theme) =>
                    backgroundImage
                      ? alpha(theme.palette.alternative.A50!, 0.6)
                      : theme.palette.alternative.A600,
                  textShadow: backgroundImage
                    ? "2px 2px rgba(0, 0, 0, 0.5)"
                    : undefined,
                  textTransform: "uppercase",
                }}
              >
                Геодезически услуги
              </Typography>
            </motion.div>
          </Box>
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ position: "relative", top: -80 }}
              animate={{ top: dropHeader }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 500,
                  // color: (theme) => theme.palette.alternative.A600,
                  color: (theme) =>
                    backgroundImage
                      ? alpha(theme.palette.alternative.A50!, 0.6)
                      : theme.palette.alternative.A600,
                  textShadow: backgroundImage
                    ? "2px 2px rgba(0, 0, 0, 0.5)"
                    : undefined,
                  textTransform: "uppercase",
                }}
              >
                {city && city[0].toLocaleLowerCase() === "в" ? "във" : "в"}{" "}
                {city ? `${city} и района` : "цялата страна"}
              </Typography>
            </motion.div>
          </Box>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ position: "relative", left: -500 }}
              animate={{ left: slideFirst }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button sx={{ padding: 0, margin: 0 }} onClick={openSendMessage}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    color: (theme) => theme.palette.background.default,
                    backgroundColor: (theme) => theme.palette.secondary.A300,
                    textTransform: "uppercase",
                  }}
                >
                  Свържете се сега
                </Typography>
              </Button>
            </motion.div>
            <motion.div
              style={{ position: "absolute", left: -500, top: 0 }}
              animate={{ left: [-500, slideSecond, 500] }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.background.default,
                  backgroundColor: (theme) => theme.palette.background.default,
                  textTransform: "uppercase",
                }}
              >
                Свържете се сега
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default MainLanding;
