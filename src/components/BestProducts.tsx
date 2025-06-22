"use client";

import Link from "next/link";
import { formatNumber } from "@/components/utils";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Product } from "@/types";

interface BestProductsProps {
  products?: Product[];
}

export default function BestProducts({ products = [] }: BestProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4">베스트 상품</h2>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((p) => {
          let imageUrl = "";

          if (Array.isArray(p.images)) {
            imageUrl = p.images[0];
          } else if (typeof p.image === "string") {
            imageUrl = p.image;
          }

          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = `http://localhost:5001/uploads/${imageUrl}`;
          }

          return (
            <li key={p.id}>
              <Link href={`/products/${p.id}`}>
                <div className="relative w-full pb-[100%] rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={imageUrl}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 truncate">{p.name}</p>
                <p className="font-bold">{formatNumber(p.price)}원</p>
                <p className="text-xs text-gray-400">
                  ❤ {p.favoriteCount ?? 0}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
} 