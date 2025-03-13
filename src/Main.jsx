import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout2 from "./component/Layout2";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemsPage from "./pages/ItemsPage";
import RegistrationPage from "./pages/RegistrationPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/items" element={<Layout2 />}>
          <Route index element={<ItemsPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
