import { LayoutChildren } from "@/tsconfig/types";
import FormClient from "./FormClient";
import Logo from "../ui/Logo";

function AuthForm() {
  function handleSubmit(formData: any) {
    console.log(formData);
  }
  return (
    <form
      className="bg-gradient-vertical pt-4 pb-12 px-3 md:max-w-[600px] rounded-lg w-full shadow-2xl"
      // action={handleSubmit}
    >
      <Logo />
      <FormClient />
    </form>
  );
}

export default AuthForm;
