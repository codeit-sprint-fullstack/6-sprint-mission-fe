import Image from "next/image";
import pandaLogoImage from "@/assets/images/logo/panda_logo.png";

export default function AuthHeader() {
  return (
    <div className="flex justify-center items-center w-50 h-17 text-primary-100 text-4xl font-bold gap-2">
      <Image src={pandaLogoImage} alt="pandaLogoImage" className="w-13" />
      <p>판다마켓</p>
    </div>
  );
}
