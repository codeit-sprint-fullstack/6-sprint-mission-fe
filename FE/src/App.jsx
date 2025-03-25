import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import "./styles/global.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
