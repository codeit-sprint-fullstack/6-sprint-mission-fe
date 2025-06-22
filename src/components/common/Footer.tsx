import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="filter brightness-0 invert"
            />
            <span className="text-sm text-gray-400">
              © 2024 판다마켓. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Image
                src="/ic_facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Image
                src="/ic_twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Image
                src="/ic_instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Image
                src="/ic_youtube.svg"
                alt="YouTube"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
