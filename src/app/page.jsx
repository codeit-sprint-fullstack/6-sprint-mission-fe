import { HomeLayout } from "@/components/common/Layout";
import Banner from "@/components/ui/Banner";
import LandingContent from "@/components/ui/LandingContent";
import { FEATURE_OPTIONS } from "@/const";
import React from "react";

function HomePage() {
  return (
    <HomeLayout>
      <Banner isTop={true} />
      {FEATURE_OPTIONS.map((feature, index) => (
        <LandingContent
          key={index}
          index={index}
          src={feature.src}
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
