import Image from "next/image";
import React from "react";

const Images = ({ src, w, h, alt }) => {
  return (
    <figure className={`relative w-[${w}] h-[${h}]`}>
      <Image className="object-cover" src={`${src}`} alt={`${alt}`} fill />
    </figure>
  );
};

export default Images;
