import axios from "axios";
import "./Community.module.scss";
import { useEffect, useState } from "react";

const Community = () => {
  const [data, setData] = useState([]);
  const BASE_URL = "http://localhost:3000/articles";
  const instance = axios.create({ baseURL: BASE_URL });
  const articleId = 33;
  const getComments = async (articleId, params) => {
    const res = await instance.get(`/${articleId}/comments`, { params });
    return res.data;
  };

  const handleLoad = async () => {
    const comments = await getComments(articleId);
    setData(comments);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div>Community</div>
      <button onClick={handleLoad}>이것은 버튼입니다.</button>
      {data.map((comment) => {
        return <div>{comment.content}</div>;
      })}
      <div></div>
    </>
  );
};

export default Community;
