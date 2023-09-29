import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, int, varchar, datetime, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const logos = mysqlTable("logos", {
	id: int("id").autoincrement().notNull(),
	companyName: varchar("company_name", { length: 255 }).notNull(),
	// Warning: Can't parse blob from database
	// blobType: blob("logo_image"),
	dateGenerated: datetime("date_generated", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
	userId: int("user_id").notNull(),
},
(table) => {
	return {
		userIdIdx: index("user_id_idx").on(table.userId),
		logosId: primaryKey(table.id),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	dateCreated: datetime("date_created", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		usersId: primaryKey(table.id),
		email: unique("email").on(table.email),
	}
});