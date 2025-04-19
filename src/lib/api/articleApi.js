export const getArticle = async () => {
  const res = await fetch(`http://localhost:5050/article`);

  if (!res.ok) {
    throw new Error("데이터를 가져오지 못 했습니다");
  }

  return res.json();
};
