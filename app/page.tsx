import { redirect } from "next/navigation";
import { auth } from "../auth";
import Dummy from "@/components/ui/dummy";

async function page() {
  const session = await auth();

  return (
    <div>
      <Dummy session={session} />
    </div>
  );
}

export default page;
