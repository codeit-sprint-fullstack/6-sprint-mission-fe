import { ReactNode } from "react";

export default function ArticleWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-[1200px] bg-white pb-16">{children}</div>
    </div>
  );
}
