"use client";

import { getItems } from "@/api/itemApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getItems,
  });

  console.log(data);

  if (isPending) {
    return <div>Loading . . .</div>;
  }

  return (
    <section className="max-w-screen-xl w-full mx-auto mt-6">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">판매 중인 상품</p>
        <div className="flex items-center gap-3">
          <label className="relative w-[325px] h-[42px]">
            <svg
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z"
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="w-full h-full bg-gray-100 outline-none border-none rounded-xl pl-11"
            />
          </label>
          <button
            className="w-[133px] h-[42px] rounded-lg text-white bg-blue-500 cursor-pointer"
            onClick={() => router.push("/items/post")}
          >
            상품 등록하기
          </button>
          <select
            name="category"
            id="category"
            className="w-[130px] h-[42px] border border-gray-300 rounded-xl px-5 outline-none cursor-pointer"
          >
            <option value="recent">최신순</option>
            <option value="like">좋아요순</option>
          </select>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-5 gap-x-10 gap-y-6">
        {data.list.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 cursor-pointer"
            onClick={() => router.push(`/items/${item.id}`)}
          >
            <img
              src={`${item.images[0]}`}
              alt="itemImg"
              className="w-[220px] h-[220px] object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-lg font-bold">
                {item.price.toLocaleString()}원
              </p>
              <div className="flex items-center gap-1">
                <img src="/heart.png" alt="" />
                <p className="text-xs font-medium">{item.favoriteCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
