"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageWithFallback({
  src,
  fallback = "/images/products/emptyproduct.png", 
  alt,
  ...rest
}) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
