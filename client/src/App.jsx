import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <EthProvider>
      <Header />
      <Main />
      <Footer />
    </EthProvider>
  );
}

export default App;
