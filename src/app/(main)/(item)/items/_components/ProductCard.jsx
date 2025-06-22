"use client";

import defaultImage from "@/assets/images/logo/defaultImage.png";

export default function ProductCard({ product }) {
  const imageUrl =
    product.images &&
    product.images.length > 0 &&
    product.images[0].startsWith("https")
      ? product.images[0]
      : defaultImage;
  return (
    <div className="flex flex-col ">
      <div className="w-42 h-42">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-42 h-auto object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{product.name}</p>
        <p className="font-bold text-gray-800">{product.price}</p>
        <p className="text-xs font-medium text-gray-600">
          ♡ {product.favoriteCount}
        </p>
      </div>
    </div>
  );
}
