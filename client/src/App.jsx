import { EthProvider } from './contexts/EthContext';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { AlertProvider } from './contexts/AlertContext';

function App() {
  return (
    <AlertProvider>
      <EthProvider>
        <Header />
        <Main />
        <Footer />
      </EthProvider>
    </AlertProvider>
  );
}

export default App;
