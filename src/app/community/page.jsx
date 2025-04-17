import ArticleList from "./_components/Articles/ArticleList";
import BestArticleList from "./_components/BestArticles/BestArticleList";
import NavBar from "./_components/NavBar/NavBar";

export default function CommunityPage() {
  return (
    <>
      <div className="flex justify-center items-center p-[16px] sm:p-[24px]">
        <div className="flex flex-col w-full max-w-[1200px] ">
          <BestArticleList />
          <NavBar />
          <ArticleList />
        </div>
      </div>
    </>
  );
}
