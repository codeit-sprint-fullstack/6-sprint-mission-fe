import "./reset.css";
import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./components/App/App.jsx";
import Registration from "./components/Registration/Registration.jsx";
import Items from "./components/Items/Items.jsx";
import Faq from "./components/Faq/Faq.jsx";
import Privacy from "./components/Privacy/Privacy.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Authorization/login/Login.jsx";
import Signup from "./components/Authorization/signup/Signup.jsx";
import Community from "./components/Community/Community.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="community" element={<Community />} />
          <Route path="items" element={<Items />} />
          <Route path="registration" element={<Registration />} />
          <Route path="faq" element={<Faq />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
