import { relations } from "drizzle-orm";
import { users, manualCategories, manualItems, files, searchLogs } from "./schema";

/**
 * 테이블 간 관계 정의
 * - manualItems는 manualCategories에 속함
 * - files는 users(업로더)와 연결됨
 * - searchLogs는 users와 연결됨
 */

export const usersRelations = relations(users, ({ many }) => ({
  uploadedFiles: many(files),
  searchLogs: many(searchLogs),
}));

export const manualCategoriesRelations = relations(manualCategories, ({ many }) => ({
  items: many(manualItems),
}));

export const manualItemsRelations = relations(manualItems, ({ one }) => ({
  category: one(manualCategories, {
    fields: [manualItems.categoryId],
    references: [manualCategories.id],
  }),
}));

export const filesRelations = relations(files, ({ one }) => ({
  uploader: one(users, {
    fields: [files.uploadedBy],
    references: [files.id],
  }),
}));

export const searchLogsRelations = relations(searchLogs, ({ one }) => ({
  user: one(users, {
    fields: [searchLogs.userId],
    references: [users.id],
  }),
}));
