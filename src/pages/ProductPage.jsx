import { Navigate, useParams } from "react-router-dom";
import { getProduct } from "../api";

function ProductPage() {
  const { productId } = useParams();
  const product = getProduct(productId);

  if (!product) {
    return <Navigate to="/items" />;
  }
  return <div>임시 상품 페이지</div>;
}

export default ProductPage;
