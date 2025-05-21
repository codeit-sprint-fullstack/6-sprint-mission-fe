import Image from "next/image";
import xImageIcon from "@/assets/images/icons/ic_x.png";
import defaultImage from "@/assets/images/logo/defaultImage.png";

export default function ImageCard({ imgSrc, imgAlt, className, deleteFn }) {
  return (
    <div className={`relative w-42 h-42 bg-gray-200 rounded-xl ${className}`}>
      <img
        src={imgSrc || defaultImage}
        alt={imgAlt}
        className="w-full h-auto object-cover"
      />

      {deleteFn && (
        <Image
          className="w-5 h-auto object-cover absolute z-50 right-2 top-2"
          src={xImageIcon}
          alt="deleteTagButton"
          onClick={() => deleteFn()}
        />
      )}
    </div>
  );
}
