import Image from "next/image";
import lodaingImg from "../../assets/loading.png";

export default function GlobalLoading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white">
      <Image src={lodaingImg} width={320} height={320} alt={"loading"} />

      <p className="mt-4 text-lg font-bold">로딩중...</p>
    </div>
  );
}
