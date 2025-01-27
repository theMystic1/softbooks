"use client";

import { LayoutChildren } from "@/tsconfig/types";
import ClientLayout from "./client-Layout";
import { usePathname } from "next/navigation";

function Body({ children }: LayoutChildren) {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <body
      className={`  ${
        pathname.includes("/register") || pathname.includes("/login")
          ? ""
          : "antialiased px-3 flex flex-col 2xl:items-center"
      } ${
        pathname.includes("/admin")
          ? "bg-white text-dark-500"
          : "bg-dark-1100  text-white"
      } `}
    >
      <ClientLayout>{children}</ClientLayout>
    </body>
  );
}

export default Body;
