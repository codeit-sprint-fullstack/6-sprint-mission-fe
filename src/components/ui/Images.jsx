import Image from "next/image";
import React from "react";

const Images = ({ src, w, h, alt }) => {
  return (
    <figure className={`relative ${w} ${h}`}>
      <Image className={`object-cover`} src={`${src}`} alt={`${alt}`} fill />
    </figure>
  );
};

export default Images;
