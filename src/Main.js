import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App.js";
import HomePage from "./pages/HomePage.js";
import SignupPage from "./pages/SignupPage.js";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
