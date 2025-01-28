import { Config } from "@/tsconfig/envconfig";
import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as qstashQlient, resend } from "@upstash/qstash";
import { SendMail } from "@/tsconfig/types";

const client = new qstashQlient({ token: Config.upstash.qstashToken });

export const sendEmail = async ({ email, subject, message }: SendMail) => {
  await client.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: Config.resendToken }),
    },
    body: {
      from: "D mystic <noreply.chukwujekwu.xyz>",
      to: email,
      subject,
      html: message,
    },
  });
};

export const workflow = new WorkflowClient({
  baseUrl: Config.upstash.qstashUrl,
  token: Config.upstash.qstashToken,
  // namespace: "workflow",
});
