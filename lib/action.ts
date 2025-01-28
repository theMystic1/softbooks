"use server";

import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { AuthCredentials } from "@/tsconfig/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflow } from "./workflow";
import { Config } from "@/tsconfig/envconfig";

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = credentials;

  // get user ip address
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) redirect("/toofast");

  try {
    const user: any = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(user);

    if (user?.error) {
      return {
        success: false,
        error: user?.error,
      };
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong" + error,
    };
  }
};

export const signup = async (params: AuthCredentials) => {
  const { email, password, name, profileImage, idNumber } = params;

  // get user ip address
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) redirect("/toofast");

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const hashPassword = await hash(password, 10);

  try {
    await db.insert(usersTable).values({
      name,
      email,
      password: hashPassword,
      idNumber,
      profileImage: profileImage || "",
    });

    await workflow.trigger({
      url: `${Config.prodApiEndPoint}/api/workflow/onboarding`,
      body: {
        email,
        name,
      },
    });

    await signInWithCredentials({ email, password });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
