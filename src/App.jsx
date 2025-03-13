import "./App.css";
import BestProduct from "./components/BestProduct";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SaleProduct from "./components/SaleProduct";

function App() {
  return (
    <div>
      <Header />
      <BestProduct />
      <SaleProduct />
      <Footer />
    </div>
  );
}

export default App;
