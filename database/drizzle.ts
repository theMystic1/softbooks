import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { Config } from "@/tsconfig/envconfig";

const sql = neon(Config.databaseurl);
export const db = drizzle({ client: sql });
