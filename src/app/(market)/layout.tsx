import { UserLayout } from "@/components/common/Layout";
import { ChildrenProps } from "@/types";
import React from "react";

function Layout({ children }: ChildrenProps) {
  return <UserLayout>{children}</UserLayout>;
}

export default Layout;
