import { Header } from "./component/common/Header";
import { Footer } from "./component/common/Footer";
import BestItem from "./component/items/BestItem";
import { SellItem } from "./component/items/SellItem";

function App() {
  return (
    <>
      <Header />
      <BestItem />
      <SellItem />
      <Footer />
    </>
  );
}

export default App;
