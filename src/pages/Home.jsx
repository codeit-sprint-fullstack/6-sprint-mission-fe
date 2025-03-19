import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <MainSectionBox>
        <MainSection>
          <LeftBox>
            <MainTextBox>
              <MainText>일상의 모든 물건을</MainText>
              <MainText>거래해 보세요</MainText>
            </MainTextBox>
            <SeeBtn to="/items">구경하러 가기</SeeBtn>
          </LeftBox>
          <img
            src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/Img_home_top.png"
            alt="fanda"
          />
        </MainSection>
      </MainSectionBox>
    </>
  );
};

const MainSectionBox = styled.div`
  height: 540px;
  background: #cfe5ff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const MainSection = styled.div`
  max-width: 1110px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  margin-top: 40px;
`;

const MainTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MainText = styled.p`
  font-size: 40px;
  font-weight: 700;
`;

const SeeBtn = styled(Link)`
  margin-top: 32px;
  display: inline-block;
  width: 357px;
  height: 56px;
  line-height: 56px;
  text-align: center;
  border-radius: 40px;
  font-size: 20px;
  color: #fff;
  background: ${({ theme }) => theme.colors.mainBlue};
`;

export default Home;
