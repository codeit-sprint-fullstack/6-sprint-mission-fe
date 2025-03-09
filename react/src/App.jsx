import Footer from "./assets/Footer";
import ProductsPage from "./assets/ProductsPage";
import Nav from "./assets/Nav.jsx";

function App() {
  return (
    <div>
      <Nav />
      <ProductsPage /> {/* 상품 목록 페이지 */}
      <Footer />
    </div>
  );
}

export default App;
