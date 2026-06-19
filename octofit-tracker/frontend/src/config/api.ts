// Codespaces-aware API configuration
const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : (import.meta.env.VITE_API_URL ?? "http://localhost:8000/api");

export async function fetchResource<T>(endpoint: string): Promise<T[]> {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  const data = await res.json();
  
  // Handle both paginated (data.data) and direct array responses
  return Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
}

export async function getApiStatus() {
  const res = await fetch(`${API_BASE_URL.replace('/api', '')}/api`);
  if (!res.ok) throw new Error(`Status ${res.status}`);
  return res.json();
}

export default API_BASE_URL;
