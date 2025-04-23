import Image from "next/image";
import facebook from "@/assets/ic_facebook.png";
import instagram from "@/assets/ic_instagram.png";
import twitter from "@/assets/ic_twitter.png";
import youtube from "@/assets/ic_youtube.png";

export default function Footer() {
  return (
    <div className="w-full bg-navy h-40 pt-8 px-4">
      <div className="w-full max-w-[1120px] h-5 flex items-center justify-between mx-auto">
        <p className="text-gray">@codeit - 2024</p>
        <div className="w-full max-w-[159px] flex items-center justify-between">
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className="w-full max-w-[116px] flex items-center justify-between">
          <Image src={facebook} width={20} height={20} alt="facebook" />
          <Image src={twitter} width={20} height={20} alt="twitter" />
          <Image src={youtube} width={20} height={20} alt="youtube" />
          <Image src={instagram} width={20} height={20} alt="instagram" />
        </div>
      </div>
    </div>
  );
}
