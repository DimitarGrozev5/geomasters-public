import React, { useEffect, useRef, useState } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";

type Props = {
  // variant?: React.ComponentProps<typeof Typography>['variant'];
  children: string;
  icon: React.ReactElement;
  alignRight?: boolean;
};

const BulletPoint: React.FC<Props> = ({
  // variant = 'subtitle1',
  children,
  icon,
  alignRight = false,
}) => {
  const iconBox = (
    <Box
      sx={{
        borderRadius: 1000,
        backgroundColor: (theme) => theme.palette.primary.A900,
        color: (theme) => theme.palette.primary.A50,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // width: (theme) =>
        //   `calc(${theme.spacing(2)} + ${
        //     variant !== 'inherit' ? theme.typography[variant].fontSize : 0
        //   })`,
        // height: (theme) =>
        //   `calc(${theme.spacing(2)} + ${
        //     variant !== 'inherit' ? theme.typography[variant].fontSize : 0
        //   })`,
        width: (theme) => theme.spacing(5),
        height: (theme) => theme.spacing(5),
      }}
    >
      {icon}
    </Box>
  );

  const textBox = (
    <Typography
      // variant={variant}
      variant={"subtitle1"}
      sx={{
        fontWeight: 500,
        color: (theme) => theme.palette.primary.A900,
        pl: 1,
        pr: 1,
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Paper
      sx={{
        position: "relative",
        // p: 1,
        borderTopLeftRadius: !alignRight ? 1000 : 0,
        borderBottomLeftRadius: !alignRight ? 1000 : 0,
        borderTopRightRadius: alignRight ? 1000 : 0,
        borderBottomRightRadius: alignRight ? 1000 : 0,

        backgroundColor: (theme) => theme.palette.background.default,

        display: "flex",
        alignItems: "center",
        justifyContent: alignRight ? "flex-end" : "flex-start",
      }}
    >
      {alignRight && (
        <>
          {textBox}
          {iconBox}
        </>
      )}
      {!alignRight && (
        <>
          {iconBox}
          {textBox}
        </>
      )}
    </Paper>
  );
};

export default BulletPoint;
