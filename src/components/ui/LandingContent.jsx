"use client";

import { BREAKPOINTS } from "@/const";
import { useViewport } from "@/hooks/useViewport";
import React from "react";

function LandingContent({ index, src, alt, tag, title, content }) {
  const windowWidth = useViewport();

  return (
    <section
      className={`flex flex-col justify-center px-4 md:px-6 lg:items-center lg:flex-row lg:h-[720px] lg:gap-16 break-keep ${
        index === 1 ? "text-right" : ""
      }`}
    >
      {index === 1 && windowWidth >= BREAKPOINTS.lg ? (
        <>
          <div>
            <h2 className="font-bold text-primary-100 mt-6">{tag}</h2>
            <h1 className="text-2xl font-bold text-gray-700 mt-2 mb-4 md:text-[32px] lg:text-[40px]">
              {windowWidth >= BREAKPOINTS.lg ? (
                <>
                  {title.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>{title}</>
              )}
            </h1>
            <p className="font-semibold text-gray-700 mb-10 md:text-[18px] lg:text-[24px]">
              {content.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <img src={src} alt={alt} className="lg:h-[444px]" />
        </>
      ) : (
        <>
          <img src={src} alt={alt} className="lg:h-[444px]" />
          <div>
            <h2 className="font-bold text-primary-100 mt-6">{tag}</h2>
            <h1 className="text-2xl font-bold text-gray-700 mt-2 mb-4 md:text-[32px] lg:text-[40px]">
              {windowWidth >= BREAKPOINTS.lg ? (
                <>
                  {title.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>{title}</>
              )}
            </h1>
            <p className="font-semibold text-gray-700 mb-10 md:text-[18px] lg:text-[24px]">
              {content.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default LandingContent;
