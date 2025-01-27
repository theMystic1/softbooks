import { LayoutChildren } from "@/tsconfig/types";
import { ReactNode } from "react";

function AdminLayout({ children }: LayoutChildren) {
  return <div>{children}</div>;
}

export default AdminLayout;
