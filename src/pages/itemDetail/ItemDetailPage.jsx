import { Navigate, useParams } from "react-router-dom";
import { getProduct } from "../../api/index";

function ItemDetailPage() {
  const { id } = useParams();
  const item = getProduct(id);

  if (!item) {
    return <Navigate to="/items" />;
  }
  return <h1>임시 상품 페이지</h1>;
}

export default ItemDetailPage;
