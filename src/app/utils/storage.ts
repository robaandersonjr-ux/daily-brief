export interface DayEntry {
  intentions: string[];
  middayCheckIn?: {
    completed: boolean[];
    note?: string;
  };
  reflection?: string;
  createdAt: string;
  checkedInAt?: string;
  reflectedAt?: string;
}

export interface DailyData {
  [date: string]: DayEntry;
}

const STORAGE_KEY = "daily-brief-data";

export function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

export function getAllData(): DailyData {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
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
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveReflection(reflection: string): void {
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
    reflectedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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