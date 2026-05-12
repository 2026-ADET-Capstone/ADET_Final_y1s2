export type AuthState = {
  email: string;
  isAdmin: boolean;
} | null;

const AUTH_KEY = 'mm_auth';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Client-side authentication management using localStorage
export function getAuth(): AuthState {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}
export function setAuth(auth: AuthState) {
  if (typeof window === 'undefined') return;
  if (auth) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function logout() {
  setAuth(null);
}
// Login function that calls the backend API and updates auth state
export async function login(email: string, password: string): Promise<AuthState> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login request failed');

  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Login failed');
  
// Store the email and admin status in localStorage for session persistence
  const auth: AuthState = { email: data.email, isAdmin: data.isAdmin };
  setAuth(auth);
  return auth;
}