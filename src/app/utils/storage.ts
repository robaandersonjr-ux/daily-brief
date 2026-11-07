export interface DayEntry {
  intentions: string[];
  middayCheckIn?: {
    completed: boolean[];
    note?: string;
  };
  reflection?: string;
  reflectionWin?: string;
  reflectionChallenge?: string;
  createdAt: string;
  checkedInAt?: string;
  reflectedAt?: string;
}

export interface DailyData {
  [date: string]: DayEntry;
}

import { persist } from "../native/persistence";

export const STORAGE_KEY = "daily-brief-data";

/** YYYY-MM-DD in the device's local time zone (not UTC). */
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getTodayDate(): string {
  return toLocalDateString(new Date());
}

export function getAllData(): DailyData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function writeAllData(data: DailyData): void {
  const json = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, json);
  persist(STORAGE_KEY, json);
}

export function getTodayEntry(): DayEntry | null {
  const data = getAllData();
  return data[getTodayDate()] || null;
}

export function saveIntentions(intentions: string[]): void {
  const data = getAllData();
  const today = getTodayDate();
  
  data[today] = {
    ...data[today],
    intentions,
    createdAt: new Date().toISOString(),
  };
  
  writeAllData(data);
}

export function saveReflection(win: string, challenge: string): void {
  const parts = [
    win.trim() && `Win: ${win.trim()}`,
    challenge.trim() && `Challenge: ${challenge.trim()}`,
  ].filter(Boolean);
  const reflection = parts.join("\n");
  const data = getAllData();
  const today = getTodayDate();
  
  if (!data[today]) {
    data[today] = {
      intentions: [],
      createdAt: new Date().toISOString(),
    };
  }
  
  data[today] = {
    ...data[today],
    reflection,
    reflectionWin: win.trim(),
    reflectionChallenge: challenge.trim(),
    reflectedAt: new Date().toISOString(),
  };
  
  writeAllData(data);
}

export function saveMiddayCheckIn(completed: boolean[], note?: string): void {
  const data = getAllData();
  const today = getTodayDate();
  
  if (!data[today]) {
    data[today] = {
      intentions: [],
      createdAt: new Date().toISOString(),
    };
  }
  
  data[today] = {
    ...data[today],
    middayCheckIn: {
      completed,
      note,
    },
    checkedInAt: new Date().toISOString(),
  };
  
  writeAllData(data);
}

export function getEntryByDate(date: string): DayEntry | null {
  const data = getAllData();
  return data[date] || null;
}

export function getAllEntries(): { date: string; entry: DayEntry }[] {
  const data = getAllData();
  return Object.entries(data)
    .map(([date, entry]) => ({ date, entry }))
    .sort((a, b) => b.date.localeCompare(a.date));
}