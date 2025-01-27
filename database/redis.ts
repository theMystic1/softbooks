import { Config } from "@/tsconfig/envconfig";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: Config.upstash.redisUrl,
  token: Config.upstash.redistToken,
});
