import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { EthProvider } from './contexts/EthContext';
import { AlertProvider } from './contexts/AlertContext';

let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#E7098F'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: '#9BB1D6'
        }
      }
    }
  },
  palette: {
    primary: {
      main: 'rgb(27, 32, 48)'
    }
  }
});

function App() {
  return (
    <AlertProvider>
      <EthProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <Main />
          <Footer />
        </ThemeProvider>
      </EthProvider>
    </AlertProvider>
  );
}

export default App;
