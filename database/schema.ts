import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { config } from "process";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);
export const borrow_enum = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);

export const usersTable = pgTable("users_table", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: text("full_name").notNull(),
  idNumber: integer("id_number").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  profileImage: text("profile_image").notNull(),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  role: ROLE_ENUM("role").notNull().default("USER"),
  borrowStatus: borrow_enum("borrow_status"),
  lastActivityDate: date("last_activity_date").defaultNow(),
});
// export const postsTable = pgTable("posts_table", {
//   id: uuid("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => usersTable.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
