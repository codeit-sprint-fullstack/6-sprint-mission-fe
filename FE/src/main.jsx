import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.js";
import "./styles/global.css";
import App from "./App.jsx";
import { LandingPage } from "./pages/LandingPage/index.jsx";
import { CommunityPage } from "./pages/CommunityPage/index.jsx";
import { ProductsPage } from "./pages/ProductsPage/index.jsx";
import { AddItemPage } from "./pages/AddItemPage/index.jsx";
import { LoginPage } from "./pages/LoginPage/index.jsx";
import { SignupPage } from "./pages/SignupPage/index.jsx";
import { FaqPage } from "./pages/FaqPage/index.jsx";
import { PrivacyPage } from "./pages/PrivacyPage/index.jsx";
import { NotFoundPage } from "./pages/NotFoundPage/index.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="items" element={<ProductsPage />} />
            <Route path="registration" element={<AddItemPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </ThemeProvider>
);
