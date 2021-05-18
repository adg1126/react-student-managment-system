import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const customBreakpointValues = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

const breakpoints = createBreakpoints({ ...customBreakpointValues });

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
  highlightedIndigo = '#669df6',
  red = '#c40d2e',
  green = '#008000';

export default createMuiTheme({
  palette: {
    common: {
      white,
      grey500,
      grey600,
      grey800,
      grey900,
      dark,
      black,
      highlightedIndigo,
      red,
      green
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
  },
  button: {
    borderRadius: 0,
    padding: '0.3em 1em',
    [breakpoints.down('sm')]: {
      padding: '1em 1.8em',
      width: '85vw'
    }
  },
  buttonIndigoAnimation: {
    position: 'relative',
    zIndex: 1,
    '&:hover': {
      color: 'white',
      border: `1px solid ${mainIndigo}`
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      background: mainIndigo,
      bottom: 0,
      left: 0,
      right: 0,
      top: '100%',
      zIndex: '-1',
      transition: 'top 0.2s ease-in'
    },
    '&:hover::before': {
      top: 0
    }
  },
  buttonGreenAnimation: {
    position: 'relative',
    color: green,
    border: `1px solid ${green}`,
    zIndex: 1,
    '&:hover': {
      color: white,
      border: `1px solid ${green}`
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      background: green,
      bottom: 0,
      left: 0,
      right: 0,
      top: '100%',
      zIndex: '-1',
      transition: 'top 0.2s ease-in'
    },
    '&:hover::before': {
      top: 0
    }
  },
  buttonRedAnimation: {
    position: 'relative',
    color: red,
    border: `1px solid ${red}`,
    zIndex: 1,
    '&:hover': {
      color: white,
      border: `1px solid ${red}`
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      background: red,
      bottom: 0,
      left: 0,
      right: 0,
      top: '100%',
      zIndex: '-1',
      transition: 'top 0.2s ease-in'
    },
    '&:hover::before': {
      top: 0
    }
  }
});
