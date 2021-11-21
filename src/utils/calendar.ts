import { frequencyType, ScheduleInfo } from '../types/services/schedule.types';
import { getWeekBorderDays } from './date-helper';

export function formatCalendarEvents(schedules: ScheduleInfo[]) {
  let events: any[] = [];
  let monday = new Date(getWeekBorderDays().monday);

  for (let i = 0; i < schedules.length; i++) {
    const s = schedules[i];
    if (s.frequencyType == frequencyType.RECURRING) {
      for (let j = 0; j < 7; j++) {
        let day = monday;
        day.setDate(day.getDate() + j);

        events.push({
          id: s.id,
          title: s.event.name,
          start: new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            s.start_hour[0],
            s.start_hour[1],
          ),
          end: new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            s.end_hour[0],
            s.end_hour[1],
          ),
        });
      }
    } else {
      let day = new Date(s.schedule_date || s.schedural_start_date);

      events.push({
        id: s.id,
        title: s.event.name,
        start: new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          s.start_hour[0],
          s.start_hour[1],
        ),
        end: new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          s.end_hour[0],
          s.end_hour[1],
        ),
      });
    }
  }

  return events;
}
