"use client";

import React from "react";
import HotItemImg from "@/assets/svgs/home_01.svg";
import RegisterImg from "@/assets/svgs/home_02.svg";
import SearchImg from "@/assets/svgs/home_03.svg";
import { BREAKPOINTS } from "@/constant";
import { useViewport } from "@/hooks/useViewport";

interface LandingContentProps {
  index: number;
  alt: string;
  tag: string;
  title: string[];
  content: string[];
}

const featureImgClass = "lg:h-[444px] lg:w-[584px]";
const tagClass = "text-primary-100 mt-6 font-bold";
const titleClass = "mt-2 mb-4 text-2xl font-bold text-gray-700 md:text-[32px] lg:text-[40px]";
const contentClass = "mb-10 font-semibold text-gray-700 md:text-[18px] lg:text-[24px]";

export default function LandingContent({ index, alt, tag, title, content }: LandingContentProps) {
  const windowWidth = useViewport();

  return (
    <section
      className={`flex flex-col justify-center px-4 break-keep md:px-6 lg:h-[720px] lg:flex-row lg:items-center lg:gap-16 ${
        index === 1 ? "text-right" : ""
      }`}
    >
      {index === 1 ? (
        <>
          <SearchImg alt={alt} className={`${featureImgClass} lg:order-1`} />
          <div>
            <h2 className={tagClass}>{tag}</h2>
            <h1 className={titleClass}>
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
            <p className={contentClass}>
              {content.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </>
      ) : (
        <>
          {index === 0 && <HotItemImg alt={alt} className={featureImgClass} />}
          {index === 2 && <RegisterImg alt={alt} className={featureImgClass} />}
          <div>
            <h2 className={tagClass}>{tag}</h2>
            <h1 className={titleClass}>
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
            <p className={contentClass}>
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
