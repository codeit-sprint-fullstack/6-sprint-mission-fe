"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeToProduct({
  productId,
  initialCount = 0,
  onFavoriteToggle,
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => (next ? c + 1 : c - 1));
    onFavoriteToggle?.(next);
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-1 text-red-500 mt-1"
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
      <span className="text-sm">{count}</span>
    </button>
  );
}
