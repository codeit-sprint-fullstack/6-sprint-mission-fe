import Button from "@/components/ui/common-UI/Button";
import Dropdown from "@/components/ui/common-UI/Dropdown";
import Pagination from "@/components/ui/common-UI/Pagination";
import Search from "@/components/ui/common-UI/Search";
import { getProducts } from "@/lib/product";
import Link from "next/link";

export const ItemsPage = async () => {
  // const [saleItems, setSaleItems] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [order, setOrder] = useState("recent");
  // const [keyword, setKeyword] = useState("");
  // const [page, setPage] = useState(null);
  // const [salePageSize, setSalePageSize] = useState(0);

  // useEffect(() => {
  //   handleSaleItems({ page: 1, pageSize: 10, orderBy: order, keyword: "" });
  // }, [order]);

  // const handleSelectChange = (e) => setOrder(e.target.value);
  // const handleSubmit = (e) => setKeyword(e.target.value);

  // useEffect(() => {
  //   handleSaleItems({ page: 1, pageSize: 10, orderBy: "recent", keyword });
  // }, [keyword]);

  // useEffect(() => {
  //   if (width >= 1200) setSalePageSize(10);
  //   else if (width >= 744) setSalePageSize(6);
  //   else setSalePageSize(4);
  //   handleSaleItems({ pageSize: salePageSize });
  // }, []);

  // const handleSaleItems = async (data) => {
  //   const result = await api.products.getAllProducts(data);
  //   setSaleItems(result);
  //   const totalItems = result.totalItems;
  //   setTotalPage(Math.ceil(totalItems / 10));
  // };

  // const getSalePageSize = () => {
  //   if (width >= 1200) return 10;
  //   else if (width >= 744) return 6;
  //   return 4;
  // };

  // useEffect(() => {
  //   const reLoad = async () => {
  //     const salepageSize = getSalePageSize();
  //     const saleProducts = await api.products.getAllProducts({
  //       pageSize: salepageSize,
  //     });
  //     setSaleItems(saleProducts);
  //   };
  //   reLoad();
  // }, [page]);

  // const handleButtonClick = (e) => {
  //   e.target.classList.add("clicked");
  //   setTimeout(() => e.target.classList.remove("clicked"), 200);
  // };

  const result = await getProducts();
  const products = result.list;

  //디버깅
  console.log("products", products);

  return (
    <div className="flex justify-center">
      <div className="w-[1200px] pt-[68px]">
        <div className="flex flex-row justify-between mb-6">
          <p className="text-xl font-bold">판매중인 상품</p>
          <div className="flex flex-row">
            <Search width="w-[325px]" />
            <Link href="/registration">
              <Button
                text="상품 등록하기"
                width="w-[133px]"
                height="h-[42px]"
                // onClick={() => console.log("상품 등록하기 버튼 클릭")}
              />
            </Link>
            <Dropdown />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/items/${product.id}`}
              className="bg-third"
            >
              <div className="text-amber-900"> {product.name}</div>
            </Link>
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default ItemsPage;
