import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type InitialData = {
  email: string;
  name: string;
};

type UserState = "active" | "non-active";
const session = await auth();

const ONE_DAY_IN_MILISEC = 24 * 60 * 60 * 1000;
const THREE_DAY_IN_MILISEC = 3 * ONE_DAY_IN_MILISEC;
const THIRTY_DAY_IN_MILISEC = 30 * ONE_DAY_IN_MILISEC;

const getUserState = async (email: string): Promise<UserState> => {
  // Implement user state logic here

  const curUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable?.email, email))
    .limit(1);

  if (curUser?.length === 0) return "non-active";
  const loginDate = new Date();
  const lastDateActive = new Date(curUser[0]?.lastActivityDate!);
  const diffInMilliseconds = loginDate.getTime() - lastDateActive.getTime();

  if (
    diffInMilliseconds > THREE_DAY_IN_MILISEC &&
    diffInMilliseconds > THIRTY_DAY_IN_MILISEC
  )
    return "non-active";
  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to our website",
      message: `Welcome ${name}, thank you for joining our community. Please make sure to verify your email address to access all the features`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you well",
          message: "You still there? we miss you",
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back",
          message: "We're glad to see you again",
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
