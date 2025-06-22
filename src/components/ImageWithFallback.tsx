"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: string;
  fallback?: string;
  alt: string;
}

export default function ImageWithFallback({
  src,
  fallback = "/images/products/emptyproduct.png", 
  alt,
  ...rest
}: ImageWithFallbackProps) {
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