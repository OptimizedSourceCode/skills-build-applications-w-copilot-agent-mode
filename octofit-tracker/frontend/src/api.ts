export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

export const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : (import.meta.env.VITE_API_URL ?? "http://localhost:8000");

export async function getApiStatus(): Promise<any> {
  const res = await fetch(`${API_URL}/api`);
  if (!res.ok) throw new Error(`Status ${res.status}`);
  return res.json();
}

export default API_URL;
