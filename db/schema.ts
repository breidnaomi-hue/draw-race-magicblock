import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const rooms = sqliteTable("race_rooms", {
  code: text("code").primaryKey(),
  revision: integer("revision").notNull(),
  data: text("data").notNull(),
  expires: integer("expires").notNull(),
});
