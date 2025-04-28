import React from "react";

export default function AllItemsSection() {
  return (
    //wrapper
    <div className="flex flex-col justify-center items-center gap-10 bg-amber-100 w-full">
      {/* header */}
      <div className="flex flex-col">
        <h1 className="text-secondary-900 font-bold text-xl leading-8">판매 중인 상품</h1>
      </div>
      {/* items */}
      <div>items list section</div>
      {/* pagination bar */}
      <div>
        <p>pagination bar</p>
      </div>
    </div>
  );
}
