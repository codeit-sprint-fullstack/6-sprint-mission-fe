import React from "react";
import TopSection from "./TopSection";
import MiddleSections from "./MiddleSections";
import BottomSection from "./BottomSection";
import '../../styles/global.css'
import '../../styles/style.css'

const HomePage = () => {
  return (
    <>
      <TopSection />
      <MiddleSections />
      <BottomSection />
    </>
  );
};

export default HomePage;
