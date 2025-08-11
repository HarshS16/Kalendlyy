export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  description?: string;
  category?: 'work' | 'personal' | 'important';
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

export type ViewMode = 'grid' | 'list';
export type Theme = 'light' | 'dark' | 'system';

export interface CalendarPreferences {
  theme: Theme;
  defaultView: ViewMode;
  timeFormat: '12h' | '24h';
}

export interface CalendarStorage {
  events: CalendarEvent[];
  preferences: CalendarPreferences;
  version: string;
}