import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

/**
 * useAuth Hook
 * 사용자 인증 상태를 관리하는 훅
 * 풀스택 프로젝트에서 자동으로 제공되는 인증 정보를 활용합니다
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 사용자 정보 조회
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "인증 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그아웃 오류 발생");
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
  };
}
