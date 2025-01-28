"use client";

import { signOutUser } from "@/lib/action";

function Button() {
  async function handleSignout() {
    await signOutUser();
  }
  return <button onClick={handleSignout}>signout</button>;
}

export default Button;
