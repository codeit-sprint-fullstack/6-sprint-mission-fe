import { useEffect, useState } from "react";
import { getItemsList } from "../db/api";

const UseFetchItemList = ({ keyword, sort }) => {
  const [item, setItem] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    keyword,
    sort,
  };

  useEffect(() => {
    const fetchItmeList = async () => {
      try {
        const items = await getItemsList(options);
        setItem(items);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItmeList();
  }, [keyword]);

  return { item, isLoading };
};

export default UseFetchItemList;
