import ic_facebook from "../../assets/images/icons/ic_facebook.png";
import ic_twitter from "../../assets/images/icons/ic_twitter.png";
import ic_youtube from "../../assets/images/icons/ic_youtube.png";
import ic_instagram from "../../assets/images/icons/ic_instagram.png";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-200 w-full">
      <footer className="flex items-center px-4 py-8 mb-10">
        <div className="flex flex-col-reverse w-full gap-4 text-center">
          <span className="text-left text-gray-400">ⓒcodeit - 2025</span>
          <div className="flex text-gray-200 justify-between ">
            <div className="flex gap-10">
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ic_facebook} alt="Facebook" className="w-6 h-6" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ic_twitter} alt="Twitter" className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ic_youtube} alt="YouTube" className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={ic_instagram} alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
