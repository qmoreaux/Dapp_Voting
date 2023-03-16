import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { EthProvider } from './contexts/EthContext';
import AppProvider from './contexts/AppContext/AppProvider';
import AlertComponent from './components/AlertComponent';

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
          <AlertComponent />
          <Header />
          <Main />
          <Footer />
        </AppProvider>
      </ThemeProvider>
    </EthProvider>
  );
}

export default App;
