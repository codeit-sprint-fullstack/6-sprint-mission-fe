import React from "react";

function LandingContent({ src, alt, tag, title, content }) {
  return (
    <section className="flex flex-col justify-center lg:items-center lg:flex-row lg:h-[720px] lg:gap-16 break-keep">
      <img src={src} alt={alt} className="lg:h-[444px]" />
      <div>
        <h2 className="font-bold text-primary-100 mt-6">{tag}</h2>
        <h1 className="text-2xl font-bold text-gray-700 mt-2 mb-4">{title}</h1>
        <p className="font-semibold text-gray-700 mb-10">{content}</p>
      </div>
    </section>
  );
}

export default LandingContent;
