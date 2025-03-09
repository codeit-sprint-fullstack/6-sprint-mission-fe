import "./NavBar.css";
import { SearchBox } from "./SearchBox/SearchBox.jsx";
import { CreateProduct } from "./CreateProduct/CreateProduct.jsx";
import { SelectSort } from "./SelectSort/SelectSort.jsx";

export const NavBar = ({ sortLoad, searchLoad }) => {
  return (
    <div className="nav-container">
      <div className="nav-bar">
        <h1 className="txt selling">판매 중인 상품</h1>
        <nav className="nav">
          <SearchBox searchLoad={searchLoad} />
          <CreateProduct />
          <SelectSort sortLoad={sortLoad} />
        </nav>
      </div>
    </div>
  );
};
