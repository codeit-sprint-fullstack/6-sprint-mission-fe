import React, { useState } from "react";
import styles from "../styles/Item.style";
import UseFetchItemList from "../hooks/UseFetchItemList";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("recent");

  const navigate = useNavigate();

  const options = {
    keyword: keyword,
    sort: sortType,
  };

  const { item, isLoading } = UseFetchItemList(options);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <styles.Section>
      <styles.TitleSearchBox>
        <styles.Title>판매 중인 상품</styles.Title>
        <styles.SearchBox>
          <styles.Search>
            <styles.SearchIcon
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z"
                fill="#9CA3AF"
              />
            </styles.SearchIcon>
            <styles.SearchInput
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </styles.Search>
          <styles.SearchBtn onClick={() => navigate("/registration")}>
            상품 등록하기
          </styles.SearchBtn>
          <styles.SearchSelect
            name="category"
            id="category"
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="recent">최신순</option>
            <option value="like">좋아요순</option>
          </styles.SearchSelect>
        </styles.SearchBox>
      </styles.TitleSearchBox>
      <styles.ItemsBox>
        {item.slice(0, 10).map((i) => (
          <styles.Item key={i.id}>
            <styles.Img src="https://placehold.co/220x220" alt="itemImg" />
            <styles.ItemBottomBox>
              <styles.Name>{i.name}</styles.Name>
              <styles.Price>{i.price.toLocaleString()}원</styles.Price>
              <styles.LikeBox>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.55742 9.31157C3.40771 9.18016 3.28795 9.07475 3.20016 8.99739V8.95147L3.02443 8.77574C2.33062 8.08193 1.9335 7.16547 1.9335 6.2V6.07612C1.99496 4.2062 3.59203 2.66667 5.46683 2.66667C5.74511 2.66667 6.11432 2.76344 6.48237 2.96162C6.8297 3.14864 7.13457 3.40383 7.33701 3.68842C7.6315 4.31494 8.5393 4.30366 8.81169 3.65457C8.97943 3.36092 9.27342 3.0955 9.62574 2.89902C9.99336 2.694 10.3598 2.6 10.6002 2.6C12.5295 2.6 14.0718 4.12742 14.1335 6.07581V6.2C14.1335 7.24201 13.7301 8.14473 13.0614 8.75771L12.8668 8.93606V8.97957C12.7658 9.06525 12.6354 9.17766 12.4835 9.30974C12.1464 9.6029 11.695 9.99999 11.2034 10.4332C11.0457 10.5722 10.8839 10.7149 10.7203 10.8592C9.86406 11.6143 8.95952 12.4119 8.34616 12.9417C8.16963 13.0861 7.89736 13.0861 7.72083 12.9417C6.98862 12.3093 5.82602 11.2962 4.83666 10.4316C4.34104 9.9984 3.88929 9.60286 3.55742 9.31157Z"
                    stroke="#4B5563"
                    stroke-width="1.2"
                  />
                </svg>
                <styles.Like>240</styles.Like>
              </styles.LikeBox>
            </styles.ItemBottomBox>
          </styles.Item>
        ))}
      </styles.ItemsBox>
    </styles.Section>
  );
};

export default Items;
