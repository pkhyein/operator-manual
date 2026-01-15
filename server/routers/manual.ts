import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { 
  getManualCategories, 
  getManualItemsByCategory, 
  searchManualContent, 
  logSearch,
  createCategory,
  updateCategory,
  deleteCategory,
  createItem,
  updateItem,
  deleteItem,
} from "../db";

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

  /**
   * 카테고리 생성 (관리자만)
   */
  createCategory: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await createCategory(input);
    }),

  /**
   * 카테고리 수정 (관리자만)
   */
  updateCategory: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateCategory(id, data);
    }),

  /**
   * 카테고리 삭제 (관리자만)
   */
  deleteCategory: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await deleteCategory(input.id);
    }),

  /**
   * 항목 생성 (관리자만)
   */
  createItem: adminProcedure
    .input(
      z.object({
        categoryId: z.number(),
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await createItem(input);
    }),

  /**
   * 항목 수정 (관리자만)
   */
  updateItem: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().min(1).optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await updateItem(id, data);
    }),

  /**
   * 항목 삭제 (관리자만)
   */
  deleteItem: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await deleteItem(input.id);
    }),
});
