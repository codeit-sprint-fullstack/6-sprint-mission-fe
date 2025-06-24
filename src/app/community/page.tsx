import BestList from "./_components/BestList";
import CommonList from "./_components/CommonList";

export const metadata = {
  title: "커뮤니티 - 판다마켓",
  description: "판다마켓 커뮤니티 페이지입니다.",
};

export default function CommunityPage() {
  return (
    <section className="flex items-center justify-center">
      <div className="flex w-full max-w-[1200px] flex-col gap-10 px-6 py-6">
        <BestList />
        <CommonList />
      </div>
    </section>
  );
}
