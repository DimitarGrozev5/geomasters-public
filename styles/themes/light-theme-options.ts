import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00bbd4',
      A900: '#005f64',
      A800: '#00828f',
      A700: '#0096a7',
      A600: '#00abc1',
      A500: '#00bbd4',
      A400: '#26c5da',
      A300: '#4dcfe1',
      A200: '#80deea',
      A100: '#b2ebf2',
      A50: '#e0f7fa',
      contrastText: '#3c3950',
    },
    secondary: {
      main: '#00cb6b',
      A900: '#007530',
      A800: '#009646',
      A700: '#00a753',
      A600: '#00bb60',
      A500: '#00cb6b',
      A400: '#00d483',
      A300: '#92e6b8',
      A200: '#92e6b8',
      A100: '#bef0d3',
      A50: '#e4f9ed',
    },
    alternative: {
      main: '#181828',
      A900: '#181828',
      A800: '#39384a',
      A700: '#575669',
      A600: '#6b6a7e',
      A500: '#9392a7',
      A400: '#b3b2c7',
      A300: '#d7d5ec',
      A200: '#e7e6fd',
      A100: '#f1efff',
      A50: '#f8f6ff',
    },
    viber: {
      main: '#6F5DEA',
      light: '#d7d2f9',
    },
    background: {
      paper: '#F4F6F7',
    },
  },
  typography: {
    h1: { color: '#39384a' },
    h2: { color: '#39384a' },
    h3: { color: '#39384a' },
    h4: { color: '#39384a' },
    h5: { color: '#39384a' },
    h6: { color: '#39384a' },
    subtitle1: { color: '#39384a' },
    subtitle2: { color: '#39384a' },
    body1: { color: '#39384a' },
    body2: { color: '#39384a' },
    button: { color: '#39384a' },
    caption: { color: '#39384a' },
    overline: { color: '#39384a' },
  },
};

const lightTheme = createTheme(lightThemeOptions);

const fontSizesTheme = responsiveFontSizes(lightTheme, { factor: 4 });

export default fontSizesTheme;

declare module '@mui/material/styles' {
  interface Palette {
    alternative: Palette['primary'];
    viber: Palette['primary'];
  }

  interface PaletteOptions {
    alternative: PaletteOptions['primary'];
    viber: PaletteOptions['primary'];
  }

  interface PaletteColor {
    A900?: string;
    A800?: string;
    A700?: string;
    A600?: string;
    A500?: string;
    A400?: string;
    A300?: string;
    A200?: string;
    A100?: string;
    A50?: string;
  }

  interface SimplePaletteColorOptions {
    A900?: string;
    A800?: string;
    A700?: string;
    A600?: string;
    A500?: string;
    A400?: string;
    A300?: string;
    A200?: string;
    A100?: string;
    A50?: string;
  }
}
