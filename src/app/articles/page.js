import Articles from "@/components/Article";
import BestArticles from "@/components/BestArticles";

export default function Home() {
  return (
    <section className="flex justify-center flex-col gap-11  mt-6 mb-110 ">
      <BestArticles />
      <Articles />
    </section>
  );
}
