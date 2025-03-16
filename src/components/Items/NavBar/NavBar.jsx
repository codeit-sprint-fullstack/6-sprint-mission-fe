import style from "./NavBar.module.scss";
import SearchBox from "./SearchBox/SearchBox.jsx";
import CreateProduct from "./CreateProduct/CreateProduct.jsx";
import SelectSort from "./SelectSort/SelectSort.jsx";

const NavBar = ({ sortLoad, searchLoad }) => {
  return (
    <div className={style.navContainer}>
      <div className={style.navBar}>
        <h1 className={style.sellHeaderTxt}>판매 중인 상품</h1>
        <nav className={style.nav}>
          <SearchBox searchLoad={searchLoad} />
          <CreateProduct />
          <SelectSort sortLoad={sortLoad} />
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
