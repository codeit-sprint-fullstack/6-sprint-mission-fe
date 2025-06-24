import Image from "next/image";
import defaultProfileImage from "@/assets/images/logo/defaultProfileImage.png";

interface ProfileImageProps {
  src?: string;
  className?: string;
}

export default function ProfileImage({ src, className }: ProfileImageProps) {
  return (
    <Image
      src={src || defaultProfileImage}
      alt="userProfile"
      className={`${className} w-6 h-auto object-cover`}
    />
  );
}
