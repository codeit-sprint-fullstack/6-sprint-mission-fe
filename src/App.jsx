import React from "react";
import Market from "./pages/Market";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Market />
      <Footer />
    </div>
  );
}

export default App;
