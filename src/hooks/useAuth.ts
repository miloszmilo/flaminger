import { ERROR_MESSAGES, ERROR_VARIANTS, ErrorVariant, ROLE_VARIANTS, ROLES, RoleVariant } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

type AuthState = {
  isLoggedIn: boolean
  isLoading: boolean
  role: RoleVariant
  error?: ErrorVariant
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: false,
    role: ROLES[ROLE_VARIANTS.guest]
  });

  const checkAuth = useCallback(async () => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch('/api/auth/check', {
        method: "GET",
        credentials: "include",
        signal
      });

      const data = await response.json();
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: response.ok ? data.isLoggedIn : prev.isLoggedIn,
        isLoading: false,
        role: response.ok ? data.role : prev.role,
        error: response.ok ? undefined : ERROR_MESSAGES[data.errorType]
      }));
    }
    catch {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        isLoading: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
    finally {
      controller.abort();
    }
  }, []);

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = useCallback(async (formData: FormData) => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch('/api/login', {
      method: "POST",
      body: formData,
      credentials: "include",
      signal
    })

    const data = await response.json();
    setAuthState((prev) => ({
      ...prev,
      isLoggedIn: response.ok ? true : prev.isLoggedIn,
      isLoading: false,
      role: response.ok ? data.role : prev.role,
      error: response.ok ? undefined : ERROR_MESSAGES[data.errorType]
    }));
    controller.abort();
  }, []);

  const register = useCallback(async (formData: FormData) => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch('/api/register', {
        method: "POST",
        body: formData,
        credentials: "include",
        signal
      })

      const data = await response.json();
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: response.ok ? true : prev.isLoggedIn,
        isLoading: false,
        role: response.ok ? data.role : prev.role,
        error: response.ok ? undefined : ERROR_MESSAGES[data.errorType]
      }));
    }
    catch {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        isLoading: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
    finally {
      controller.abort();
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined
    }));

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch('/api/logout', {
        method: "DELETE",
        credentials: "include",
        signal
      });

      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: response.ok ? false : prev.isLoggedIn,
        isLoading: false,
        role: response.ok ? prev.role : ROLES[ROLE_VARIANTS.guest],
        error: response.ok ? prev.error : ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
    catch {
      setAuthState((prev) => ({
        ...prev,
        isLoggedIn: false,
        isLoading: false,
        role: ROLES[ROLE_VARIANTS.guest],
        error: ERROR_MESSAGES[ERROR_VARIANTS.OTHER]
      }));
    }
    finally {
      controller.abort();
    }
  }, []);

  return {
    ...authState,
    checkAuth,
    login,
    register,
    logout
  }
}
