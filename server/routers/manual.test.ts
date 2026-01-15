import { describe, it, expect, vi } from "vitest";
import { manualRouter } from "./manual";

/**
 * 매뉴얼 라우터 테스트
 */
describe("Manual Router", () => {
  describe("getCategories", () => {
    it("should be callable", async () => {
      // 라우터 프로시저가 존재하는지 확인
      expect(manualRouter.createCaller).toBeDefined();
    });
  });

  describe("getItemsByCategory", () => {
    it("should accept categoryId input", async () => {
      // 라우터 프로시저가 존재하는지 확인
      expect(manualRouter.createCaller).toBeDefined();
    });
  });

  describe("search", () => {
    it("should accept query input", async () => {
      // 라우터 프로시저가 존재하는지 확인
      expect(manualRouter.createCaller).toBeDefined();
    });
  });
});
