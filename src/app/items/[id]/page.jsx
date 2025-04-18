"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function ItemDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;

  // 실제 구현에서는 ID를 기반으로 API에서 데이터를 가져와야 합니다
  const [product, setProduct] = useState({
    id: id,
    title: "애플 아이패드 프로 11인치 M2 (2022)",
    category: "디지털/가전",
    price: 950000,
    description:
      "22년 11월에 구입한 아이패드 프로 11인치 M2 모델입니다. 항상 케이스와 필름을 사용했고, 배터리 성능도 아직 좋습니다. 충전기와 케이스도 함께 드립니다. 직거래 가능하신 분 우선으로 연락 주세요.",
    location: "서울시 강남구",
    date: "2023-12-15",
    views: 245,
    likes: 36,
    images: ["/img/product-1.jpg", "/img/product-2.jpg", "/img/product-3.jpg"],
    seller: {
      id: "user123",
      name: "김판다",
      profileImage: "/img/avatar.jpg",
      rating: 4.8,
      itemCount: 15,
    },
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setProduct((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  const similarProducts = [
    {
      id: 1,
      title: "아이패드 에어 4세대",
      price: 650000,
      image: "/img/similar-1.jpg",
    },
    {
      id: 2,
      title: "삼성 갤럭시 탭 S8",
      price: 850000,
      image: "/img/similar-2.jpg",
    },
    {
      id: 3,
      title: "애플 매직 키보드",
      price: 350000,
      image: "/img/similar-3.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <FaChevronLeft className="mr-2" /> 뒤로가기
      </button>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 이미지 갤러리 */}
        <div className="lg:w-1/2">
          <div className="relative mb-4 h-96 overflow-hidden rounded-lg bg-gray-100">
            {product.images.length > 0 ? (
              <Image
                src={product.images[currentImageIndex]}
                alt={product.title}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                이미지가 없습니다
              </div>
            )}

            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
                >
                  <FaChevronLeft className="text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
                >
                  <FaChevronRight className="text-gray-700" />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-md ${
                    currentImageIndex === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="lg:w-1/2">
          <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>
              <button
                onClick={handleLike}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              </button>
            </div>

            <p className="mb-4 text-3xl font-bold text-gray-800">
              {product.price.toLocaleString()}원
            </p>

            <div className="mb-2 flex items-center text-gray-500">
              <FaMapMarkerAlt className="mr-2" />
              {product.location}
            </div>

            <div className="mb-6 flex items-center text-gray-500">
              <FaEye className="mr-2" />
              조회 {product.views}회<span className="mx-2">•</span>
              {product.date} 등록
              <span className="mx-2">•</span>
              관심 {product.likes}
            </div>

            <div className="my-6 h-px bg-gray-200"></div>

            <h2 className="mb-3 text-lg font-semibold">상품 정보</h2>
            <p className="mb-6 whitespace-pre-line text-gray-700">
              {product.description}
            </p>

            <div className="my-6 h-px bg-gray-200"></div>

            {/* 판매자 정보 */}
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold">판매자 정보</h2>
              <div className="flex items-center">
                <div className="relative mr-4 h-16 w-16">
                  <Image
                    src={product.seller.profileImage}
                    alt={product.seller.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {product.seller.name}
                  </h3>
                  <div className="mb-1 flex items-center text-yellow-500">
                    {"★".repeat(Math.floor(product.seller.rating))}
                    <span className="ml-1 text-gray-600">
                      {product.seller.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    판매상품 {product.seller.itemCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 hover:bg-gray-300">
                채팅하기
              </button>
              <button className="flex-1 rounded-lg bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 비슷한 상품 */}
      <div className="mt-12">
        <h2 className="mb-6 text-xl font-bold">비슷한 상품</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {similarProducts.map((item) => (
            <Link href={`/items/${item.id}`} key={item.id} className="block">
              <div className="overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 truncate font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <p className="font-bold text-gray-900">
                    {item.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
