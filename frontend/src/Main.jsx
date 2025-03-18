import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import CommunityPage from "./pages/community/CommunityPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import MarketPage from "./pages/market/MarketPage";
import ItemDetailPage from "./pages/itemDetail/ItemDetailPage";
import AddItemPage from "./pages/addItem/AddItemPage";
import PrivacyPage from "./pages/privacy/PrivacyPage";
import FaqPage from "./pages/faq/FaqPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="board" element={<CommunityPage />} />
          <Route path="items">
            <Route index element={<MarketPage />} />
            <Route path=":id" element={<ItemDetailPage />} />
          </Route>
          <Route path="registration" element={<AddItemPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
