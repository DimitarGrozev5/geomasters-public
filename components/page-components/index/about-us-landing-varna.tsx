import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, alpha, useTheme } from "@mui/material";
import { motion, useScroll } from "framer-motion";
import vicove from "../../../public/images/vicove.jpg";
import BgImage from "../../common/helper/background-image";
import Credits from "../../common/data-presentation/credits";

const AboutUsLandingVarna = () => {
  const theme = useTheme();

  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: [
      `start ${targetRef.current?.getBoundingClientRect().top || 0}px`,
      `end ${targetRef.current?.getBoundingClientRect().bottom || 0}px`,
    ],
  });

  const [slideText, setSlideText] = useState("100vw");

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0) {
        setSlideText("0vw");
      }
    });
  }, [scrollYProgress]);

  const [flashPrimary, setFlashPrimary] = useState(
    alpha(theme.palette.primary.A500!, 0)
  );
  const [colorPrimary, setColorPrimary] = useState(
    theme.palette.alternative.A600
  );
  const [flashSecondary, setFlashSecondary] = useState(
    alpha(theme.palette.secondary.A500!, 0)
  );
  const [colorSecondary, setColorSecondary] = useState(
    theme.palette.alternative.A600
  );
  useEffect(() => {
    if (slideText !== "100vw") {
      setTimeout(() => {
        setFlashPrimary(alpha(theme.palette.primary.A500!, 1));
        setColorPrimary(theme.palette.primary.A500!);
        setFlashSecondary(alpha(theme.palette.secondary.A500!, 1));
        setColorSecondary(theme.palette.secondary.A500!);

        setTimeout(() => {
          setFlashPrimary(alpha(theme.palette.primary.A500!, 0));
          setFlashSecondary(alpha(theme.palette.secondary.A500!, 0));
        }, 500);
      }, 1000);
    }
  }, [slideText, theme.palette.primary.A500, theme.palette.secondary.A500]);

  return (
    <Box
      sx={{
        width: { md: "50%", xs: "100%" },
        // height: (theme) => `calc(100vh - ${theme.spacing(7)})`,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        position: "relative",
      }}
      ref={targetRef}
    >
      <Box
        sx={{
          width: "100%",
          flex: 1,
          overflow: "hidden",
          position: { md: "relative", xs: "absolute" },
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BgImage
          sizes={{
            xs: "100vw",
            sm: "100vw",
            md: "100vw",
            lg: "50vw",
            xl: "50vw",
          }}
          srcImg={vicove}
          priority
        />
        <Credits>4687688 © Benkrut | Dreamstime.com</Credits>
      </Box>

      <Box
        sx={{
          width: "100%",
          flex: 1,
          position: "relative",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          textAlign: "center",
          pl: 4,
          pr: 4,

          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.8),
          zIndex: 1,
        }}
      >
        <motion.div animate={{ x: slideText }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: (theme) => theme.palette.primary.A800,
            }}
          >
            GEOMASTERS
          </Typography>
        </motion.div>
        <motion.div animate={{ x: slideText }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            ОБЕДИНИЛИ СМЕ ПРОФЕСИОНАЛИСТИ ОТ ЦЯЛАТА СТРАНА, ЗА ДА{" "}
            <motion.div
              style={{ display: "inline" }}
              animate={{
                backgroundColor: flashPrimary,
                color: colorPrimary,
              }}
            >
              РЕШИМ
            </motion.div>{" "}
            ВАШИЯ{" "}
            <motion.div
              style={{ display: "inline" }}
              animate={{
                backgroundColor: flashSecondary,
                color: colorSecondary,
              }}
            >
              ПРОБЛЕМ
            </motion.div>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Екипът ни от Варна се състои от специалисти, които от години работят
            в област Варна и имат богат опит с изискванията на общинските
            администрации.
          </Typography>
        </motion.div>
        {/* <motion.div animate={{ x: slideText }}>
          <Button href="/about-us">Научете повече</Button>
        </motion.div> */}
      </Box>
    </Box>
  );
};

export default AboutUsLandingVarna;
