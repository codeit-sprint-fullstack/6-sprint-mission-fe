"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../lib/api/products";
import Link from "next/link";
import Image from "next/image";

// 상품 타입 인터페이스
interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nickName, setNickName] = useState<string | null>(null);

  const handleProductRegister = async () => {
    // 예: 등록 페이지로 이동 또는 모달 열기
    alert("상품 등록 기능은 아직 구현되지 않았습니다.");
  };

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickName");
    console.log(localStorage.getItem("accessToken"));
    console.log(localStorage.getItem("userId"));

    if (storedNickname) {
      setNickName(storedNickname);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      {/* 헤더 */}
      <div className="border-b border-[#DFDFDF] flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[200px]">
        <div className="flex">
          <div className="mt-[10px] mr-[32px] flex w-[153px] h-[51px]">
            <div className="mt-[5.02px] mb-[5.85px] gap-[8.59px] flex">
              <Image
                src="/pandaImg.png"
                width={40}
                height={40.14}
                alt="판다이미지"
              />
              <p className="cursor-pointer mt-[9.3px] mb-[0.39px] font-bold text-[25.63px] text-[#3692FF] font-rokaf">
                판다마켓
              </p>
            </div>
          </div>
          <div className="flex pt-[21px] px-[15px]">
            <p className="hover:text-blue-500 cursor-pointer mr-[15px] font-bold text-[18px] text-gray-600">
              자유게시판
            </p>
            <Link href={`/products`}>
              <p className="hover:text-blue-500 cursor-pointer font-bold text-[18px] text-gray-600">
                중고마켓
              </p>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[6px]">
          {nickName ? (
            <>
              <Image
                src="/userImg.png"
                width={40}
                height={40}
                alt="유저이미지"
              />
              <p>{nickName}</p>
            </>
          ) : (
            <Link href={`/auth/signUp`}>
              <button className="bg-blue-500 w-[74px] h-[42px] rounded-[8px] flex items-center justify-center mt-[16px] mb-[24px]">
                <p className="font-semibold text-[16px] text-[#F3F4F6]">로그인</p>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-20 xl:px-[200px] mt-8">
        <p className="text-lg font-semibold">판매 중인 상품</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleProductRegister}
        >
          상품 등록하기
        </button>
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-20 xl:px-[200px] mt-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border p-4 rounded-lg hover:shadow-md cursor-pointer transition-all">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-[200px] object-cover rounded"
                />
              ) : (
                <div className="w-full h-[200px] bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  이미지 없음
                </div>
              )}
              <p className="mt-2 text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">{product.price.toLocaleString()}원</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
