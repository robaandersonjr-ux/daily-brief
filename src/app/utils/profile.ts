import { persist } from "../native/persistence";

export const NAME_KEY = "daily-brief-name";

export function getName(): string {
  try {
    return localStorage.getItem(NAME_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}

export function saveName(name: string): void {
  const value = name.trim().slice(0, 40);
  localStorage.setItem(NAME_KEY, value);
  persist(NAME_KEY, value);
}
