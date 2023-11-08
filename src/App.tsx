import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Router from './routes/Router';

const theme = createTheme({

  palette: {
    mode: 'light',
    primary: {
      main: '#262627',
    },
    secondary: {
      main: '#d22e92',
    },
    background: {
      default: '#E8E8E8',
      paper: '#FAFAFA',
    },
    error: {
      main: '#f52c2c',
    },
    warning: {
      main: '#faa21e',
    },
    info: {
      main: '#25a4dc',
    },
    success: {
      main: '#098309',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ES'>
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
