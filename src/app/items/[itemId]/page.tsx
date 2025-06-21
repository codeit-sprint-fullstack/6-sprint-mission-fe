import Link from "next/link";
import ItemDetail from "./_components/ItemDetail";
import QuestionForm from "./_components/QuestionForm";
import QuestionList from "./_components/QuestionList";
import { TItem } from "@/types";
import Image from "next/image";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ itemId: TItem["id"] }>;
}) {
  const { itemId } = await params;

  return (
    <div className="px-4 flex justify-center flex-col py-4 items-center md:py-6">
      <ItemDetail itemId={itemId} />
      <QuestionForm itemId={itemId} />
      <QuestionList itemId={itemId} />
      <div className="flex justify-center mt-10 ">
        <Link href="/items">
          <button className="bg-primary-100 text-white flex justify-center items-center w-60 h-12 font-semibold rounded-4xl">
            목록으로 돌아가기
            <Image
              alt="back"
              width={20}
              height={16}
              src="/assets/ic/ic_back.png"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
