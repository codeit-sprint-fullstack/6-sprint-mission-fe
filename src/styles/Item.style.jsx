import styled from "styled-components";

const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 26px auto 0;
`;

const TitleSearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Search = styled.label`
  position: relative;
  width: 325px;
  height: 42px;
`;

const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: #f3f4f6;
  outline: none;
  border: none;
  border-radius: 12px;
  padding-left: 44px;
`;

const SearchBtn = styled.button`
  width: 133px;
  height: 42px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background: ${({ theme }) => theme.colors.mainBlue};
  cursor: pointer;
`;

const SearchSelect = styled.select`
  width: 130px;
  height: 42px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 20px;
  outline: none;
  cursor: pointer;
`;

const ItemsBox = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px 24px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Img = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
`;

const ItemBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Like = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const styles = {
  Section,
  TitleSearchBox,
  Title,
  SearchBox,
  Search,
  SearchIcon,
  SearchInput,
  SearchBtn,
  SearchSelect,
  ItemsBox,
  Item,
  Img,
  ItemBottomBox,
  Name,
  Price,
  LikeBox,
  Like,
};

export default styles;
