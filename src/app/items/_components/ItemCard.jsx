"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function ItemCard({ item }) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className="itemCard">
        <img
          src={item.images[0]}
          alt={item.name}
          className="itemCardThumbnail"
        />
        <div className="itemSummary">
          <h2 className="itemName">{item.name}</h2>
          <p className="itemPrice">{item.price.toLocaleString()}원</p>
          <div className="favoriteCount">
            <FaHeart />
            {item.favoriteCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
