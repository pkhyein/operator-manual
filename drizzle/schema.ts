import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 매뉴얼 카테고리 테이블
 * 이벤트 준비, 이벤트 통계, GTT Show, 운영진 메뉴 등의 카테고리를 저장
 */
export const manualCategories = mysqlTable("manual_categories", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ManualCategory = typeof manualCategories.$inferSelect;
export type InsertManualCategory = typeof manualCategories.$inferInsert;

/**
 * 매뉴얼 항목 테이블
 * 각 카테고리 내의 세부 항목들을 저장
 */
export const manualItems = mysqlTable("manual_items", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ManualItem = typeof manualItems.$inferSelect;
export type InsertManualItem = typeof manualItems.$inferInsert;

/**
 * 파일 메타데이터 테이블
 * S3에 저장된 파일의 정보를 관리
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 512 }).notNull().unique(),
  url: text("url").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  size: int("size"),
  uploadedBy: int("uploadedBy").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * 검색 기록 테이블
 * 사용자의 검색 쿼리와 결과를 추적하여 분석
 */
export const searchLogs = mysqlTable("search_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  query: varchar("query", { length: 255 }).notNull(),
  resultCount: int("resultCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SearchLog = typeof searchLogs.$inferSelect;
export type InsertSearchLog = typeof searchLogs.$inferInsert;

/**
 * 매뉴얼 항목 이미지 테이블
 * 각 항목에 첨부된 이미지들을 관리
 */
export const manualItemImages = mysqlTable("manual_item_images", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull(),
  imageKey: varchar("imageKey", { length: 512 }).notNull(),
  imageUrl: text("imageUrl").notNull(),
  imageName: varchar("imageName", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  size: int("size"),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ManualItemImage = typeof manualItemImages.$inferSelect;
export type InsertManualItemImage = typeof manualItemImages.$inferInsert;