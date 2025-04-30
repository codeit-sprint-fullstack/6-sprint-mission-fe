import Link from "next/link";
import React from "react";

function CrossSite({ text, linkTo, textClick }) {
  return (
    <div className="flex flex-row text-[14px] mt-[24px]">
      <div className="pr-[4px]">{text}</div>

      <Link href={linkTo} className="text-blue-600">
        {textClick}
      </Link>
    </div>
  );
}

export default CrossSite;
