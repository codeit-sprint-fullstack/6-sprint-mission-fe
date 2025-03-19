import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <HeaderBox>
      <HeaderInner>
        <LeftBox>
          <LogoBox href="/">
            <img
              src="https://67a1772da019bb307bce76e3--relaxed-puppy-88a9cf.netlify.app/imges/Property%201=md.png"
              alt="Logo"
            />
          </LogoBox>
          {location.pathname === "/" ? null : (
            <NavBox>
              <Nav to="/boards" $color={location.pathname === "/boards"}>
                자유게시판
              </Nav>
              <Nav to="/items" $color={location.pathname === "/items"}>
                중고마켓
              </Nav>
            </NavBox>
          )}
        </LeftBox>
        <LoginBtn to="/login">로그인</LoginBtn>
      </HeaderInner>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  border-bottom: 1px solid #dfdfdf;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeaderInner = styled.div`
  max-width: 1120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.mediaSize.tablet} {
    margin: 0 24px;
  }
  @media ${({ theme }) => theme.mediaSize.mobile} {
    margin: 0 16px;
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const LogoBox = styled.a`
  img {
    width: 153px;
    height: 51px;
  }
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Nav = styled(Link)`
  color: ${(props) => props.$color && "#3692ff"};
`;

const LoginBtn = styled(Link)`
  width: 128px;
  height: 48px;
  line-height: 48px;
  border-radius: 8px;
  text-align: center;
  color: #f3f4f6;
  background: ${({ theme }) => theme.colors.mainBlue};
`;

export default Header;
