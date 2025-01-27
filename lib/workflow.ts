import { Config } from "@/tsconfig/envconfig";
import { Client as WorkflowClient } from "@upstash/workflow";

export const workflow = new WorkflowClient({
  baseUrl: Config.upstash.qstashUrl,
  token: Config.upstash.qstashToken,
  // namespace: "workflow",
});
