import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <EthProvider>
      <Header />
      <Footer />
    </EthProvider>
  );
}

export default App;
