import { createMuiTheme } from '@material-ui/core/styles';

// Shades of grey
const white = '#ffffff',
  grey500 = '#d1d7e0',
  grey600 = '#93a5be',
  grey800 = '#506690',
  grey900 = '#4a5073',
  dark = '#262b40',
  black = '#2e3650';

// Color Scheme
const grey = '#ebf4f6',
  mainIndigo = 'rgba(2, 31, 56, 1)',
  lightIndigo = 'rgba(2, 31, 56, 0.8)',
  highlightedIndigo = '#669df6';

export default createMuiTheme({
  palette: {
    common: {
      white: white,
      grey500: grey500,
      grey600: grey600,
      grey800: grey800,
      grey900: grey900,
      dark: dark,
      black: black,
      highlightedIndigo: highlightedIndigo
    },
    primary: {
      main: grey
    },
    secondary: {
      main: mainIndigo,
      light: lightIndigo
    }
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(',')
  }
});
