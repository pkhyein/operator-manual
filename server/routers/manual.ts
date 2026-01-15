import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getManualCategories, getManualItemsByCategory, searchManualContent, logSearch } from "../db";

export const manualRouter = router({
  /**
   * 모든 매뉴얼 카테고리 조회
   */
  getCategories: publicProcedure.query(async () => {
    return await getManualCategories();
  }),

  /**
   * 특정 카테고리의 매뉴얼 항목 조회
   */
  getItemsByCategory: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      return await getManualItemsByCategory(input.categoryId);
    }),

  /**
   * 매뉴얼 콘텐츠 검색
   */
  search: publicProcedure
    .input(z.object({ query: z.string().min(1).max(255) }))
    .query(async ({ input, ctx }) => {
      const results = await searchManualContent(input.query);
      
      // 검색 로그 기록 (사용자가 있는 경우)
      if (ctx.user?.id) {
        await logSearch(ctx.user.id, input.query, results.length);
      }
      
      return results;
    }),
});
