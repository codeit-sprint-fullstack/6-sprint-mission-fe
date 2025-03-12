import { useEffect, useState } from "react";
import ItemFetch from "../../api/itemFetch.js";
import HeartImg from "/ic_heart.png";
import './BestItem.css'

const BestItem = () => {
  const [Items, setItems] = useState([]);

  useEffect(() => {
    const loadBestProducts = async () => {
      const data = await ItemFetch({
        page: 1,
        pageSize: 4,
        orderBy: "favorite",
        keyword: "",
      });
      
      setItems(data.list);
    };

    loadBestProducts();
  }, []);

  return (
    <div className="best-items-container">
      <div>
        <h2 className="best-items">베스트 상품</h2>
        <div className="item-list">
          {Items.map((product) => (
              <div key={product.id} className="product-item">
                <img className="best-img" src={product.images[0]} alt={product.name} />
                <div className="best-info">
                  <h3 className="best-name">{product.name}</h3>
                  <p className="best-price">{product.price.toLocaleString()}원</p>
                  <div className="best-favorite">
                    <img width={16} height={16}  src={HeartImg} />
                    <p fontSize={12} >{product.favoriteCount}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BestItem;
