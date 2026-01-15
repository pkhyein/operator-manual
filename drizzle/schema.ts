import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = sqliteTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  lastSignedIn: integer("lastSignedIn", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 매뉴얼 카테고리 테이블
 * 이벤트 준비, 이벤트 통계, GTT Show, 운영진 메뉴 등의 카테고리를 저장
 */
export const manualCategories = sqliteTable("manual_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ManualCategory = typeof manualCategories.$inferSelect;
export type InsertManualCategory = typeof manualCategories.$inferInsert;

/**
 * 매뉴얼 항목 테이블
 * 각 카테고리 내의 세부 항목들을 저장
 */
export const manualItems = sqliteTable("manual_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("categoryId").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ManualItem = typeof manualItems.$inferSelect;
export type InsertManualItem = typeof manualItems.$inferInsert;

/**
 * 파일 메타데이터 테이블
 * S3에 저장된 파일의 정보를 관리
 */
export const files = sqliteTable("files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  url: text("url").notNull(),
  name: text("name").notNull(),
  mimeType: text("mimeType"),
  size: integer("size"),
  uploadedBy: integer("uploadedBy").notNull(),
  description: text("description"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * 검색 기록 테이블
 * 사용자의 검색 쿼리와 결과를 추적하여 분석
 */
export const searchLogs = sqliteTable("search_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId").notNull(),
  query: text("query").notNull(),
  resultCount: integer("resultCount").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type SearchLog = typeof searchLogs.$inferSelect;
export type InsertSearchLog = typeof searchLogs.$inferInsert;

/**
 * 매뉴얼 항목 이미지 테이블
 * 각 항목에 첨부된 이미지들을 관리
 */
export const manualItemImages = sqliteTable("manual_item_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  itemId: integer("itemId").notNull(),
  imageKey: text("imageKey").notNull(),
  imageUrl: text("imageUrl").notNull(),
  imageName: text("imageName").notNull(),
  mimeType: text("mimeType"),
  size: integer("size"),
  order: integer("order").default(0).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ManualItemImage = typeof manualItemImages.$inferSelect;
export type InsertManualItemImage = typeof manualItemImages.$inferInsert;
