import { Outlet } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";

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
