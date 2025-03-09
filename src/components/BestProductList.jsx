import { useEffect, useState } from "react";
import { getProduct } from "../services/productApi";
import noimg from "../img/img_default.png";
import heartic from "../img/ic_heart.png";
import "../styles/item.css";

const BestProductList = () => {
  const [bestitems, setBestitems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleItems(4);
      } else if (width >= 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        const sortedBestProducts = (data.list || [])
          .sort((a, b) => b.favoriteCount - a.favoriteCount)
          .slice(0, 4);
        setBestitems(sortedBestProducts);
      } catch (e) {
        console.error("베스트 불러오기 실패:", e);
      }
    };

    fetchProducts();

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  return (
    <div>
      <main>
      <h2 style={{ width: "100%", textAlign: "left" }}>베스트 상품</h2>

        <div className="BestProduct-container">
          {bestitems.slice(0, visibleItems).map((product) => (
            <div key={product.id} className="BestProduct-item">
              <img
                className="BestProduct-items"
                src={product.images?.[0] || noimg}
                alt={product.name}
                onError={(e) => (e.target.src = noimg)}
              />
              <p>{product.name}</p>
              <p>{product.price.toLocaleString()}원</p>
              <p>
                <img src={heartic} alt="favorite" />
                {product.favoriteCount}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BestProductList;
