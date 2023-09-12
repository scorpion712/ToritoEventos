import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';


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
      default: '#bbb2bb',
      paper: '#e6dde6',
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
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography> Hola mundo</Typography>
        <Button color="secondary" variant="contained">Contained</Button>
        <Button color="success" variant="contained">Contained</Button>
        <Button color="error" variant="contained">Contained</Button>
        <Button color="info" variant="contained">Contained</Button>
        <Button variant="contained">Contained</Button>
        </div>
    </ThemeProvider>
  )
}

export default App
