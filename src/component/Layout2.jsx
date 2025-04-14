import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav2 from "./Nav2";

function Layout2() {
  return (
    <>
      <Nav2 />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout2;
