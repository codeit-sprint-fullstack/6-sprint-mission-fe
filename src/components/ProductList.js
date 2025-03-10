import "./ProductList.css";
import unheartIcon from "../assets/images/icon/ic-unheart.svg";
import { Link } from "react-router-dom";

function ProductList({
  order,
  setOrder,
  input,
  setInput,
  currentItems,
  dropdownItems,
  handleDropdown,
}) {
  return (
    <main className="product">
      <div className="heading">
        <div className="title">판매 중인 상품</div>
        <div className="searchBar">
          <input
            type="text"
            value={input}
            className="input"
            onChange={(e) => setInput(e.target.value)}
            placeholder="검색할 상품을 입력해주세요"
          ></input>
        </div>
        <div className="createBtn">
          <Link to="registration">
            <button className="button" type="button">
              상품 등록하기
            </button>
          </Link>
        </div>
        <div className="dropdown">
          <button
            type="button"
            className="dropdownBtn"
            onClick={handleDropdown}
          >
            {order === "recent" ? "최신순" : "좋아요순"}
          </button>
          <div className={dropdownItems ? "dropdownItems" : "hide"}>
            <button
              type="button"
              className="dropdownItem"
              onClick={() => setOrder("recent")}
            >
              최신순
            </button>
            <button
              type="button"
              className="dropdownItem line"
              onClick={() => setOrder("favoriteCount")}
            >
              좋아요순
            </button>
          </div>
        </div>
      </div>
      <div className="list">
        {currentItems.map((item) => (
          <div key={item.id}>
            <ProductListItem item={item} />
          </div>
        ))}
      </div>
    </main>
  );
}

function ProductListItem({ item }) {
  return (
    <div>
      <img className="img" src={item.images} alt={item.name} />
      <div className="description">
        <div className="name">{item.name}</div>
        <div className="price">{item.price}원</div>
        <div className="favoriteCount">
          <img src={unheartIcon} />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
