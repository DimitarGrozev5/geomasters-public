import { Box, Typography, useTheme } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { useMemo } from "react";

type Props = {
  srcImg: StaticImageData;
  sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  alt?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: "cover" | "contain";
  objectPosition?: "center" | "top";
};

const BgImage: React.FC<Props> = ({
  srcImg,
  sizes,
  alt = "",
  priority = false,
  quality = 75,
  objectFit = "cover",
  objectPosition = "center",
}) => {
  const theme = useTheme();
  const sizesString = useMemo(
    () =>
      Object.entries(sizes)
        .map(([sz, val]) => {
          const breakpoint = sz as keyof typeof theme.breakpoints.values;
          const muiSize = theme.breakpoints.values[breakpoint];

          const cssQuery = `(max-width: ${muiSize}px) ${val}`;
          return breakpoint !== "xl" ? cssQuery : val;
        })
        .join(","),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, sizes.xs, sizes.sm, sizes.md, sizes.lg, sizes.xl]
  );

  return (
    <Image
      src={srcImg}
      alt={alt}
      fill
      sizes={sizesString}
      priority={priority}
      quality={quality}
      style={{
        objectFit,
        objectPosition,
      }}
    />
  );
};

export default BgImage;
