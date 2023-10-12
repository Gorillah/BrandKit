import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  datetime,
  tinyint,
  unique,
  serial,
  timestamp,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const logos = mysqlTable(
  "logos",
  {
    id: int("id").autoincrement().notNull(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    dateGenerated: datetime("date_generated", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    logoUrl: varchar("logo_url", { length: 2500 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    logoPublicId: varchar("logo_public_id", { length: 255 }),
    logoFormat: varchar("logo_format", { length: 255 }),
  },
  (table) => {
    return {
      logosId: primaryKey(table.id),
    };
  }
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    dateCreated: datetime("date_created", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    credit: tinyint("credit").default(0),
  },
  (table) => {
    return {
      usersId: primaryKey(table.id),
      email: unique("email").on(table.email),
    };
  }
);

export const userSubscriptions = mysqlTable("user_subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  plan: varchar("subscription_plan", { length: 255 }).default("free"),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 })
    .notNull()
    .unique(),
  stripeSubscriptionId: varchar("stripe_subscription_id", {
    length: 255,
  }).unique(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
});
