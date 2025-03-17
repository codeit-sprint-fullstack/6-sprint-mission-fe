import "./productList.css";

export const BestProductList = ({ items }) => {
  return (
    <ul className="BestProductList">
      {items.map((item) => (
        <BestProductListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export const SaleProductList = ({ items }) => {
  return (
    <ul className="SaleProductList">
      {items.map((item) => (
        <SaleProductListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const BestProductListItem = ({ item }) => {
  return (
    <div>
      <img className="BestProductList-img" src={item.images} alt={item.title} />
      <div className="BestProductList-content">
        <p className="BestProductList-desc"> {item.description} </p>
        <p className="BestProductList-price"> {item.price} </p>
        <p className="BestProductList-favorite"> {item.favoriteCount} </p>
      </div>
    </div>
  );
};

const SaleProductListItem = ({ item }) => {
  return (
    <div>
      <img className="SaleProductList-img" src={item.images} alt={item.title} />
      <div className="SaleProductList-content">
        <p className="SaleProductList-desc"> {item.description} </p>
        <p className="SaleProductList-price"> {item.price} </p>
        <p className="SaleProductList-favorite"> {item.favoriteCount} </p>
      </div>
    </div>
  );
};
