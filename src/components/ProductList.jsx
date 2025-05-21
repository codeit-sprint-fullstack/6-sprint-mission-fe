"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Search from "@/components/Search";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import LikeToProduct from "@/components/LikeToProduct";
import BestProducts from "@/components/BestProducts";
import ImageWithFallback from "@/components/ImageWithFallback";
import { formatNumber } from "@/components/utils";
import { usePaginatedProducts } from "@/hooks/usePaginatedProducts";

const ProductList = () => {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 768) setPageSize(4);
      else if (window.innerWidth <= 1024) setPageSize(6);
      else setPageSize(10);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const {
    data = { products: [], totalCount: 0 },
    isLoading,
    isError,
  } = usePaginatedProducts({ page, pageSize, orderBy, keyword }, !!pageSize);

  const { products, totalCount } = data;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <div className="mt-8">
        <BestProducts products={products} />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mb-6">
        <h2 className="text-lg font-semibold">판매 중인 상품</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <form onSubmit={handleSearch} className="w-full sm:w-auto">
            <Search
              keyword={keyword}
              setKeyword={setKeyword}
              placeholder="검색할 상품을 입력해주세요"
            />
          </form>

          <button
            className="w-full sm:w-36 h-10 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 transition"
            onClick={() => router.push("/products/registration")}
          >
            상품 등록하기
          </button>

          <Filters orderBy={orderBy} setOrderBy={setOrderBy} />
        </div>
      </div>

      {isError && (
        <p className="text-red-500">아이템을 불러오는 데 실패했습니다.</p>
      )}
      {isLoading && <p>로딩 중...</p>}

      {!isLoading &&
        !isError &&
        Array.isArray(products) &&
        products.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.id}`}>
                  <div className="relative w-full pb-[100%] rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-2 text-sm text-gray-600 truncate">
                    {p.name}
                  </p>
                  <p className="font-bold">{formatNumber(p.price)}원</p>
                  <LikeToProduct
                    productId={p.id}
                    initialCount={p.favoriteCount ?? 0}
                    onFavoriteToggle={() => {}}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}

      <div className="mt-8 mb-12 flex justify-center">
        <Pagination
          page={page}
          setPage={setPage}
          hasNext={page < Math.ceil(totalCount / pageSize)}
          totalPages={Math.ceil(totalCount / pageSize)}
        />
      </div>
    </div>
  );
};

export default ProductList;
