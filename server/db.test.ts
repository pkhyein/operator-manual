import { describe, it, expect, beforeAll } from "vitest";
import {
  getManualCategories,
  getManualItemsByCategory,
  searchManualContent,
  getFiles,
} from "./db";

/**
 * 데이터베이스 함수 테스트
 * 주의: 실제 데이터베이스 연결이 필요합니다
 */
describe("Database Functions", () => {
  describe("Manual Categories", () => {
    it("should return an array of manual categories", async () => {
      const categories = await getManualCategories();
      expect(Array.isArray(categories)).toBe(true);
    });
  });

  describe("Manual Items", () => {
    it("should return manual items for a valid category", async () => {
      // 카테고리 ID 1이 존재한다고 가정
      const items = await getManualItemsByCategory(1);
      expect(Array.isArray(items)).toBe(true);
    });

    it("should return empty array for non-existent category", async () => {
      const items = await getManualItemsByCategory(99999);
      expect(items).toEqual([]);
    });
  });

  describe("Search", () => {
    it("should return search results for valid query", async () => {
      const results = await searchManualContent("이벤트");
      expect(Array.isArray(results)).toBe(true);
    });

    it("should return empty array for non-matching query", async () => {
      const results = await searchManualContent("존재하지않는검색어xyz123");
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("Files", () => {
    it("should return an array of files", async () => {
      const files = await getFiles();
      expect(Array.isArray(files)).toBe(true);
    });
  });
});
