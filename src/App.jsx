
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
