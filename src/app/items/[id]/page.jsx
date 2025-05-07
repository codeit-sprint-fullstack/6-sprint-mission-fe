import Link from "next/link";
import CommentForm from "./_components/CommentForm";
import Comments from "./_components/Comments";
import ItemInfo from "./_components/ItemInfo";

const page = () => {
  return (
    <section className="pt-[16px]">
      <ItemInfo />
      <div className="max-w-[743px] mx-auto mb-[140px] px-[16px] m:max-w-[1200px] m:px-[24px] l:w-[1200px]">
        <CommentForm />
        <Comments />
        <div
          className="flex items-center justify-center
        "
        >
          <Link
            href={"/items"}
            className="flex items-center justify-center gap-[8px] w-[240px] h-[48px] bg-[var(--color-main-blue)] rounded-[40px] text-white text-[18px] font-[600]"
          >
            <p>목록으로 돌아가기</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
              className="rotate-90"
            >
              <path d="M240-120v-480q0-100 70-170t170-70q100 0 170 70t70 170v168l64-64 56 56-160 160-160-160 56-56 64 64v-168q0-66-47-113t-113-47q-66 0-113 47t-47 113v480h-80Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
