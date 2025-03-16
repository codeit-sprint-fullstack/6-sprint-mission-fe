import { useState } from "react";

function useSelectSort(sortLoad) {
  const [currentSort, setCurrentSort] = useState("최신순");
  const [sortBtn, setSortBtn] = useState(false);

  // 정렬 선택버튼 토글
  const sortPopupOn = () => {
    setSortBtn(!sortBtn);
  };

  const sortPopupOff = (e, orderBy) => {
    setSortBtn(false);
    setCurrentSort(e.target.innerText);
    sortSelect(orderBy);
  };

  // 정렬 선택 시 렌더링
  const sortSelect = (orderBy) => {
    sortLoad(orderBy);
  };

  return [currentSort, sortBtn, sortPopupOn, sortPopupOff];
}

export default useSelectSort;
