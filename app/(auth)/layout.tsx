import { LayoutChildren } from "@/tsconfig/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Image from "next/image";
// import AuthForm from "./auth-form";

import bgImage from "@/public/images/auth-illustration.png";

async function AuthLayout({ children }: LayoutChildren) {
  const session = await auth();

  // console.log(session);

  if (session) redirect("/");
  return (
    <div className=" flex  justify-center xl:justify-start xl:grid xl:grid-cols-2  gap-4 min-h-screen">
      <div className="flex items-center justify-center w-full">{children}</div>

      <div className="h-full xl:w-full xl:flex hidden   relative">
        <Image src={bgImage} alt="Background image" fill />
      </div>
    </div>
  );
}

export default AuthLayout;
