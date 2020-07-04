import { red, teal, deepOrange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: red.A400,
    },
    error: {
      main: deepOrange.A400,
    },
    background: {
      default: '#EEE',
    },
  },
});

export default theme;
