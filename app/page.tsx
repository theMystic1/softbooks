import { redirect } from "next/navigation";
import { auth } from "../auth";
import Dummy from "@/components/ui/dummy";
import Button from "@/components/ui/btn";

async function page() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div>
      <Button />
    </div>
  );
}

export default page;
