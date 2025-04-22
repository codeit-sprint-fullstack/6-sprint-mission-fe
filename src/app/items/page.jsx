export default function ItemsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* 헤더 배너 */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold">판다마켓 중고거래</h1>
        <p className="mb-6">믿을 수 있는 중고거래, 지금 시작해보세요!</p>
        <button className="rounded-md bg-white px-6 py-2 font-medium text-blue-600 transition-colors hover:bg-gray-100">
          판매하기
        </button>
      </div>

      {/* 카테고리 및 검색 */}
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 flex w-full space-x-2 overflow-x-auto pb-2 md:mb-0 md:w-auto">
          <button className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">
            전체
          </button>
          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
            디지털기기
          </button>
          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
            가구/인테리어
          </button>
          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
            의류
          </button>
          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
            도서/음반
          </button>
          <button className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
            기타
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full rounded-full border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      {/* 정렬 옵션 */}
      <div className="mb-4 flex justify-end">
        <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm">
          <option>최신순</option>
          <option>인기순</option>
          <option>저가순</option>
          <option>고가순</option>
        </select>
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={`https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202`}
                alt="상품 이미지"
                className="h-full w-full object-cover"
              />
              {index % 3 === 0 && (
                <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs text-white">
                  인기
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="mb-1 text-xs text-gray-500">디지털기기</div>
              <h3 className="mb-1 line-clamp-2 text-sm font-medium">
                맥북 프로 16인치 M1 Pro 512GB 실버 아주 깨끗함
              </h3>
              <div className="mb-1 font-bold">1,450,000원</div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>서울 강남구</span>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-1 h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  25
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-1">
          <button className="rounded border px-3 py-1 text-gray-600 hover:bg-gray-100">
            이전
          </button>
          <button className="rounded bg-blue-500 px-3 py-1 text-white">
            1
          </button>
          <button className="rounded border px-3 py-1 text-gray-600 hover:bg-gray-100">
            2
          </button>
          <button className="rounded border px-3 py-1 text-gray-600 hover:bg-gray-100">
            3
          </button>
          <button className="rounded border px-3 py-1 text-gray-600 hover:bg-gray-100">
            4
          </button>
          <button className="rounded border px-3 py-1 text-gray-600 hover:bg-gray-100">
            5
          </button>
          <button className="rounded border px-3 py-1 text-gray-600 hover:bg-gray-100">
            다음
          </button>
        </div>
      </div>
    </section>
  );
}
