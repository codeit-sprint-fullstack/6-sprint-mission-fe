"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../lib/api/products";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [nickName, setNickName] = useState(null);

  const handleProductRegister= async()=>{
    await 
  }
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
    <>
      <div>
        <div className="border-b border-[#DFDFDF] flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[200px]">
          <div className="flex">
            <div className="mt-[10px] mr-[32px] flex w-[153px] h-[51px] ">
              <div className="mt-[5.02px] mb-[5.85px] gap-[8.59px] flex">
                <Image
                  src="/pandaImg.png"
                  width={40}
                  height={40.14}
                  alt="판다이미지"
                />
                <p className="cursor-pointer mt-[9.3px] mb-[0.39px] font-bold text-[25.63px] leading-[100%] tracking-[0%] align-middle text-[#3692FF] font-rokaf">
                  판다마켓
                </p>
              </div>
            </div>

            <div className="flex  pt-[21px] pr-[15px] pb-[21px] pl-[15px]">
              <p className="hover:text-blue-500 cursor-pointer mr-[15px] font-pretendard font-bold text-[18px] leading-[26px] tracking-normal text-center align-middle text-gray-600">
                자유게시판
              </p>
              <Link href={`/products`}>
                <p className="hover:text-blue-500 cursor-pointer mr-[15px] font-pretendard font-bold text-[18px] leading-[26px] tracking-normal text-center align-middle text-gray-600">
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
                <button className="bg-blue-500 w-[74px] h-[42px] rounded-[8px] flex items-center justify-center ml-auto mt-[16px] mb-[24px]">
                  <p className="cursor-pointer font-pretendard font-semibold text-[16px] leading-[26px] text-[#F3F4F6]">
                    로그인
                  </p>
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <p>판매 중인 상품</p>
          <button className="cursor-pointer" onClick={handleProductRegister}>
            상품 등록하기
          </button>
        </div>
        {products.map((product) => (
          <Link href={`products/${product.id}`} key={product.id}>
            <div className="border p-2 my-2">
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
