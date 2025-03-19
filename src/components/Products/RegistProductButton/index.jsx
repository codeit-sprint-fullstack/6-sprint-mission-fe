import { Link } from "react-router-dom";
import "./index.css";

export const RegistProductButton = () => {
  return (
    <Link className="registProdutButton" to="/registration">
      상품 등록하기
    </Link>
  );
};
