import { Outlet } from "react-router-dom";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
