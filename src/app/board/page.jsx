import BestPosts from "@/components/BestPosts";
import PostList from "@/components/PostList";

export default function BoardPage() {
  return (
    <main className="w-full min-h-screen">
      <section>
        {/* 베스트 게시글 */}
        <BestPosts />
        {/* 게시글 리스트 */}
        <PostList />
      </section>
    </main>
  );
}
