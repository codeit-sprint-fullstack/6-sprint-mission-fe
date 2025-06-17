import { ChildrenProps } from "@/types";
import React from "react";

function PageContainer({ children }: ChildrenProps) {
  return <div className="p-4 md:p-6 lg:px-[12rem]">{children}</div>;
}

export default PageContainer;
