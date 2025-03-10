import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BoardPage from "./pages/BoardPage";
import MarketPage from "./pages/MarketPage";
import AddItemPage from "./pages/AddItemPage";
import PrivacyPage from "./pages/PrivacyPage";
import FaqPage from "./pages/FaqPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="registration" element={<AddItemPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
