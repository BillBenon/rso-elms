import { ClassTimeTableInfo, ScheduleInfo } from '../types/services/schedule.types';

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

export function groupTimeTableByDay(arr: ClassTimeTableInfo[]): any {
  let group = arr.reduce((r, a) => {
    // @ts-ignore
    r[a.day_of_week] = [...(r[a.day_of_week] || []), a];
    return r;
  }, {});

  return group;
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
