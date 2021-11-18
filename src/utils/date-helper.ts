import moment from 'moment';
import { frequencyType, ScheduleInfo } from '../types/services/schedule.types';

export const monthNum: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const numMonth = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const unit = {
  day: 'day',
  month: 'month',
  year: 'year',
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export function formatDateToYyMmDd(date: string) {
  let formatedDate = new Date(date);

  const month = formatedDate.getMonth() + 1;
  const day = formatedDate.getDate();

  return `${formatedDate.getFullYear()}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
}

export function formatDateToIso(date: string | Date): string {
  let formatedDate = moment(new Date(`${date} UTC`))
    .toISOString()
    .split('T')
    .join(' ');

  return formatedDate.substring(0, formatedDate.length - 5);
}

export function getCalendarEvents(schedules: ScheduleInfo[] = []) {
  let localSchedules: ScheduleInfo[] = [];

  schedules.forEach((s) => {
    if (
      s.frequencyType == frequencyType.RECURRING ||
      s.frequencyType == frequencyType.DATE_RANGE
    ) {
      let date = new Date();

      for (let i = date.getDay(); i < 7; i++) {
        localSchedules.push({
          ...s,
          planned_schedule_start_date: new Date(
            date.setDate(date.getDate() + 1),
          ).toLocaleDateString(),
        });
      }
      for (let i = 0; i < date.getDay(); i++) {
        localSchedules.push({
          ...s,
          planned_schedule_start_date: new Date(
            date.setDate(date.getDate() - i),
          ).toLocaleDateString(),
        });
      }
    } else localSchedules.push(s);
  });

  console.log('====================================');
  console.log(localSchedules);
  console.log('====================================');

  return localSchedules.map((schedule) => ({
    id: schedule.id,
    title: schedule.event.name,
    start: getEventStartDate(schedule),
    end: getEventEndDate(schedule),
  }));
}

function getEventStartDate(schedule: ScheduleInfo) {
  let date = new Date(schedule.planned_schedule_start_date);

  if (schedule.planned_start_hour) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      schedule.planned_start_hour[0],
      schedule.planned_start_hour[1],
    );
  } else return new Date();
}

function getEventEndDate(schedule: ScheduleInfo) {
  let date = new Date(schedule.planned_schedule_start_date);
  if (schedule.planned_end_hour) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      schedule.planned_end_hour[0],
      schedule.planned_end_hour[1],
    );
  } else return new Date();
}