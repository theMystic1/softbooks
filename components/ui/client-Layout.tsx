"use client";

import { ClientLayoutProps } from "@/tsconfig/types";
import { usePathname } from "next/navigation";

function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  return (
    <main
      className={`${
        pathname === "/register" || pathname === "/login"
          ? ""
          : "w-full max-w-[1536px] h-full py-6"
      } min-min-h-screen`}
    >
      {children}
    </main>
  );
}

export default ClientLayout;
