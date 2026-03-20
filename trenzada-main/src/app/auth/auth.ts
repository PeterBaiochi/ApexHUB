import { UserRole } from "./hierarchyTypes";

const SESSION_KEY = "auth.session.v1";

type Session = {
  token: string;
  email: string;
  name: string;
  role: UserRole;
};

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getApiBaseUrl() {
  const fromEnv = (import.meta as any).env?.VITE_API_URL as string | undefined;
  return (fromEnv ?? "http://localhost:3000").replace(/\/+$/, "");
}

async function apiRequest<T>(path: string, init: RequestInit): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await res.text();
  const data = safeJsonParse<any>(text) ?? { message: text || "Erro" };

  if (!res.ok) {
    throw new Error(data?.message ?? "Erro");
  }

  return data as T;
}

export function getSession(): Session | null {
  const parsed = safeJsonParse<Partial<Session>>(
    localStorage.getItem(SESSION_KEY),
  );
  if (!parsed || !parsed.token || !parsed.email) return null;

  return {
    token: parsed.token,
    email: parsed.email,
    name: parsed.name ?? "",
    role: (parsed.role as UserRole) ?? UserRole.AFFILIATE,
  };
}

export function isAuthenticated(): boolean {
  return Boolean(getSession());
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<void> {
  const payload = {
    name: input.name,
    email: input.email,
    password: input.password,
  };
  await apiRequest("/register", { method: "POST", body: JSON.stringify(payload) });
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<void> {
  const payload = {
    email: input.email,
    password: input.password,
  };

  const data = await apiRequest<{
    token: string;
    user: { name: string; email: string; role: UserRole };
  }>("/login", { method: "POST", body: JSON.stringify(payload) });

  const session: Session = {
    token: data.token,
    email: data.user.email,
    name: data.user.name,
    role: data.user.role ?? UserRole.AFFILIATE,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

