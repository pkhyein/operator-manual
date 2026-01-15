/**
 * 매뉴얼 API 호출을 위한 커스텀 훅
 * 현재는 로컬 상태 관리로 구현되어 있습니다
 * 실제 구현에서는 tRPC 클라이언트를 통해 서버 API를 호출해야 합니다
 */
export function useManualApi() {
  return {
    isLoading: false,
    error: null,
    createCategory: async () => ({}),
    updateCategory: async () => ({}),
    deleteCategory: async () => ({}),
    createItem: async () => ({}),
    updateItem: async () => ({}),
    deleteItem: async () => ({}),
  };
}
