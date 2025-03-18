import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Market from "./pages/Market";
import Productregist from "./pages/Productregist";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import LandingPage from "./pages/LandingPage"; // 랜딩 페이지 컴포넌트 임포트
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* 랜딩 페이지 */}
          <Route path="/items" element={<Market />} /> {/* 중고마켓 페이지 */}
          <Route path="/registration" element={<Productregist />} />{" "}
          {/* 상품 등록 페이지 */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
