import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      light: '#372A4B',
      main: '#211338',
      dark: '#1D1132',
      contrastText: '#fff',
    },
    secondary: {
      light: '#de4e6a',
      main: '#d62246',
      dark: '#ab1b38',
      contrastText: '#000',
    },
  },
});
export default Theme;