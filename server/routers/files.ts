import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getFiles, insertFile, deleteFile } from "../db";
import { storagePut, storageGet } from "../storage";

export const filesRouter = router({
  /**
   * 모든 파일 목록 조회
   */
  list: protectedProcedure.query(async () => {
    return await getFiles();
  }),

  /**
   * 파일 업로드
   * 클라이언트에서 파일을 multipart/form-data로 전송
   */
  upload: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        mimeType: z.string().optional(),
        size: z.number().optional(),
        description: z.string().optional(),
        // 실제 파일 데이터는 별도의 multipart 핸들러로 처리
      })
    )
    .mutation(async ({ input, ctx }) => {
      // 파일 메타데이터를 데이터베이스에 저장
      // 실제 파일은 S3에 저장되고, 여기서는 메타데이터만 저장
      const fileKey = `uploads/${ctx.user.id}/${Date.now()}-${input.name}`;
      
      const result = await insertFile({
        key: fileKey,
        url: `https://your-s3-bucket.s3.amazonaws.com/${fileKey}`,
        name: input.name,
        mimeType: input.mimeType,
        size: input.size,
        uploadedBy: ctx.user.id,
        description: input.description,
      });

      return result;
    }),

  /**
   * 파일 다운로드 URL 생성
   */
  getDownloadUrl: protectedProcedure
    .input(z.object({ fileKey: z.string() }))
    .query(async ({ input }) => {
      // S3 presigned URL 생성
      const { url } = await storageGet(input.fileKey);
      return { url };
    }),

  /**
   * 파일 삭제
   */
  delete: protectedProcedure
    .input(z.object({ fileId: z.number() }))
    .mutation(async ({ input }) => {
      return await deleteFile(input.fileId);
    }),
});
