import Image from "next/image";
import defaultProfileImage from "@/assets/images/logo/defaultProfileImage.png";

export default function ProfileImage({ src, className }) {
  return (
    <Image
      src={src || defaultProfileImage}
      alt="userProfile"
      className={`${className} w-6 h-auto object-cover`}
    />
  );
}
