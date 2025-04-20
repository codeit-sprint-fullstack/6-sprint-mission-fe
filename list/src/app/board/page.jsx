import Image from "next/image";
import medal from "@/assets/ic_medal.png";
import Search from "@/components/ui/Search";
import macbook from "@/assets/macbook.png";
import heart from "@/assets/ic_heart.png";
import arrowDown from "@/assets/ic_arrow_down.png";
import profile from "@/assets/ic_profile.png";
import Link from "next/link";

const bestPosts = [
  {
    id: 1,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
  {
    id: 2,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
  {
    id: 3,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
];

const posts = [
  {
    id: 1,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
  {
    id: 2,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
  {
    id: 3,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
  {
    id: 4,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
  {
    id: 5,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    date: "2024.04.16",
    likes: "9999+",
    img: macbook,
    author: "총명한판다",
    profile: profile,
  },
];

export default function Board() {
  return (
    <main className="min-h-screen">
      {/* 베스트 게시글 */}
      <section className="max-w-[1200px] mx-auto mb-10">
        <h2 className="text-base font-semibold mb-4">베스트 게시글</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestPosts.map((post) => (
            <div
              key={post.id}
              className="bg-tertiary rounded-lg px-6 pb-4 flex flex-col gap-2"
            >
              <div className="flex items-center mb-2">
                <span className="flex items-center bg-primary text-white text-xs px-6 py-0.5 rounded-b-2xl mr-2">
                  <Image src={medal} width={14} height={14} alt="베스트" />
                  Best
                </span>
              </div>
              <div className="flex items-center mb-4.5 font-semibold">
                <div className="font-medium text-xl text-black">
                  {post.title}
                </div>
                <Image
                  src={post.img}
                  width={72}
                  height={72}
                  alt="썸네일"
                  className="rounded"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-black">
                <div className="flex items-center">
                  <span>{post.author}</span>
                  <Image src={heart} width={16} height={16} alt="좋아요" />
                  <span> {post.likes}</span>
                </div>
                <span className="text-gray">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 게시글 목록 */}
      <section className="max-w-[1200px] mx-auto bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-black font-semibold">게시글</h3>
          <Link href="/post-write">
            <button className="bg-blue-500 text-white px-[23px] py-[11.5px] rounded-lg cursor-pointer">
              글쓰기
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <Search />
          </div>
          <div className="w-[130px] h-[42px] text-black border border-gray-200 px-5 py-3 rounded">
            <div className="flex items-center justify-between w-[90px] h-[18px] ">
              최신순
              <Image src={arrowDown} width={24} height={24} alt="화살표" />
            </div>
          </div>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className=" border-b py-4 mb-[19px]">
              <div>
                <div className="flex h-18 justify-between">
                  <p className="font-medium text-black flex-1">{post.title}</p>
                  <Image
                    src={post.img}
                    width={72}
                    height={72}
                    alt="썸네일"
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between  mt-4 ">
                  <div className="flex items-center gap-2 text-xs">
                    <Image
                      src={post.profile}
                      width={24}
                      height={24}
                      alt="프로필"
                    />
                    <p className="text-black">{post.author}</p>
                    <p className="text-gray">{post.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={heart} width={24} height={24} alt="좋아요" />
                    <p className="text-gray-500">{post.likes}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
