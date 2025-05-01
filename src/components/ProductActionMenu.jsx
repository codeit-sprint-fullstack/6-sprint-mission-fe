"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";

const BASE = "https://panda-market-api.vercel.app";

export default function ProductActionMenu({ itemId }) {
  const router = useRouter();

  /* 드롭다운 */
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const outside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", outside);
    return () => window.removeEventListener("click", outside);
  }, []);

  /* 삭제 */
  const remove = async () => {
    if (!confirm("상품을 삭제하시겠습니까?")) return;
    await fetch(`${BASE}/products/${itemId}`, { method: "DELETE" });
    alert("삭제되었습니다.");
    router.push("/products");
  };

  return (
    <div className="flex justify-end">
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
        </button>

        {open && (
          <ul className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow text-sm z-10">
            <li
              onClick={() => router.push(`/products/${itemId}/edit`)}
              className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
            >
              수정하기
            </li>
            <li
              onClick={remove}
              className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
            >
              삭제하기
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
