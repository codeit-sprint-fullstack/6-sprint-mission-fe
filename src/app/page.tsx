import { HomeLayout } from "@/components/layout/Layout";
import { FEATURE_IMG_OPTIONS } from "@/constant";
import Banner from "@/components/landing/Banner";
import LandingContent from "@/components/landing/LandingContent";
import React from "react";

function HomePage() {
  return (
    <HomeLayout>
      <Banner isTop={true} />
      {FEATURE_IMG_OPTIONS.map((feature, index) => (
        <LandingContent
          key={index}
          index={index}
          alt={feature.alt}
          tag={feature.tag}
          title={feature.title}
          content={feature.content}
        />
      ))}
      <Banner />
    </HomeLayout>
  );
}

export default HomePage;
