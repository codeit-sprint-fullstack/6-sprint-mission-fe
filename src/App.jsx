import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemsPage from "./pages/ItemsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout이 필요한 페이지들만 감싸기 */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/items"
          element={
            <Layout>
              <ItemsPage />
            </Layout>
          }
        />

        {/* LoginPage와 SignupPage는 Layout 없이 개별적으로 렌더링 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
