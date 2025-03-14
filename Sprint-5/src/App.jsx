import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./component/common/Header";
import { Footer } from "./component/common/Footer";
import BestItem from "./component/items/BestItem";
import { SellItem } from "./component/items/SellItem";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={ 
          <>
            <BestItem /> 
            <SellItem />
          </>
        } />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
