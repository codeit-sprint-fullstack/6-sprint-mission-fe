import { Link } from "react-router";
import style from "./CreateProduct.module.scss";

const CreateProduct = () => {
  return (
    <Link to="/registration" className={style.createProductBtn}>
      상품 등록하기
    </Link>
  );
};

export default CreateProduct;
