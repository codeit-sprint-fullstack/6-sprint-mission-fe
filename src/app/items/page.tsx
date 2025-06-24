"use client";

import BestProductList from "./_components/BestProductList";
import CommonProductList from "./_components/CommonProductList";

export default function ItemsPage() {
  return (
    <main className="flex w-full justify-center px-5 py-7">
      <section className="flex w-full max-w-[1200px] flex-col gap-10">
        <BestProductList />
        <CommonProductList />
      </section>
    </main>
  );
}
