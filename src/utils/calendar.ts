import {
  ClassTimeTableInfo,
  daysOfWeek,
  ScheduleInfo,
} from '../types/services/schedule.types';

interface BigCalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
}

export function formatCalendarEvents(schedules: ScheduleInfo[] = []): BigCalendarEvent[] {
  let events: BigCalendarEvent[] = [];

  schedules.forEach((s) => {
    let start = new Date(s.schedule_date || s.schedural_start_date);
    events.push({
      id: s.id,
      title: s.event.name,
      start: new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        s.start_hour ? s.start_hour[0] : new Date().getHours(),
        s.start_hour ? s.start_hour[1] : new Date().getMinutes(),
      ),
      end: new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        s.end_hour ? s.end_hour[0] : new Date().getHours() + 2,
        s.end_hour ? s.end_hour[1] : new Date().getMinutes(),
      ),
    });
  });
  return events;
}

interface IDayTimeTable {
  [index: string]: ClassTimeTableInfo[];
}

export function groupTimeTableByDay(arr: ClassTimeTableInfo[]): IDayTimeTable {
  let grouped: IDayTimeTable = {};

  Object.keys(daysOfWeek)
    .slice(0, 7)
    .forEach((day) => {
      grouped[day] = [...arr.filter((tt) => tt.day_of_week == day)];
    });

  return grouped;
}
