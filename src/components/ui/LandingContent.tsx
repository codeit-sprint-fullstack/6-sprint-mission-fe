"use client";

import { BREAKPOINTS } from "@/constant";
import { useViewport } from "@/lib/hooks/useViewport";
import React from "react";

interface LandingContentProps {
  index: number;
  src: string;
  alt: string;
  tag: string;
  title: string[];
  content: string[];
}

function LandingContent({ index, src, alt, tag, title, content }: LandingContentProps) {
  const windowWidth = useViewport();

  return (
    <section
      className={`flex flex-col justify-center px-4 break-keep md:px-6 lg:h-[720px] lg:flex-row lg:items-center lg:gap-16 ${
        index === 1 ? "text-right" : ""
      }`}
    >
      {index === 1 && windowWidth >= BREAKPOINTS.lg ? (
        <>
          <div>
            <h2 className="text-primary-100 mt-6 font-bold">{tag}</h2>
            <h1 className="mt-2 mb-4 text-2xl font-bold text-gray-700 md:text-[32px] lg:text-[40px]">
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
            <p className="mb-10 font-semibold text-gray-700 md:text-[18px] lg:text-[24px]">
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
            <h2 className="text-primary-100 mt-6 font-bold">{tag}</h2>
            <h1 className="mt-2 mb-4 text-2xl font-bold text-gray-700 md:text-[32px] lg:text-[40px]">
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
            <p className="mb-10 font-semibold text-gray-700 md:text-[18px] lg:text-[24px]">
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
