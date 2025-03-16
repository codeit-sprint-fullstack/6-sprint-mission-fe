import { Outlet } from "react-router";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
