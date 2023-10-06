import { ThemeProvider, createTheme } from '@mui/material/styles'; 

import Dashboard from './private/Dashboard';

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
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
