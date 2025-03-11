import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./App.module.css";

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
