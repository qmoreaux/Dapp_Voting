import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './components/Header';
import AlertComponent from './components/AlertComponent';
import Main from './components/Main';
import Footer from './components/Footer';

import { EthProvider } from './contexts/EthContext';
import { AppProvider } from './contexts/AppContext';

let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#E7098F'
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
    <EthProvider>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Header />
          <AlertComponent />
          <Main />
          <Footer />
        </AppProvider>
      </ThemeProvider>
    </EthProvider>
  );
}

export default App;
