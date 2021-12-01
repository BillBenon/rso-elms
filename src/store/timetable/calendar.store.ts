import { useMutation, useQuery } from 'react-query';

import { calendarService } from '../../services/timetable/calendar.service';
import {
  CreateEventSchedule,
  DateRange,
  frequencyType,
  ScheduleStatus,
} from '../../types/services/schedule.types';

class ScheduleStore {
  createEventSchedule() {
    return useMutation((schedule: CreateEventSchedule) => {
      switch (schedule.frequencyType) {
        case frequencyType.DATE_RANGE:
          return calendarService.createDateRangeEvents(schedule);
        case frequencyType.RECURRING:
          return calendarService.createRecurringEvents(schedule);
        default:
          return calendarService.createOneTimeEvents(schedule);
      }
    });
  }

  getScheduleById(id: string) {
    return useQuery(['schedules/id', id], () => calendarService.getScheduleById(id));
  }

  getAllSchedules() {
    return useQuery(['schedules'], calendarService.getAll);
  }
  getAllByAcademicProgramIntakeLevel(id: string, range: DateRange) {
    return useQuery(
      ['schedules/level-intake/:id', id],
      () => calendarService.getAllByAcademicProgramIntakeLevel(id, range),
      { enabled: !!id },
    );
  }
  getAllByAcademicProgramIntakeLevelAndStatus(id: string, status: ScheduleStatus) {
    return useQuery(['schedules/level-intake/:id/:status', id, status], () =>
      calendarService.getAllByAcademicProgramIntakeLevelAndStatus(id, status),
    );
  }
  getAllByAcademicProgram(id: string, range: DateRange) {
    return useQuery(['schedules/program/:id', id], () =>
      calendarService.getAllByAcademicProgram(id, range),
    );
  }

  getAllByAcademicProgramAndStatus(id: string, status: ScheduleStatus) {
    return useQuery(['schedules/program/:id/:status', id, status], () =>
      calendarService.getAllByAcademicProgramAndStatus(id, status),
    );
  }

  getAllByIntakeLevelClass(id: string, range: DateRange) {
    return useQuery(
      ['schedules/intakeclass/:id', id],
      () => calendarService.getAllByIntakeLevelClass(id, range),
      { enabled: !!id },
    );
  }

  updateSchedule() {
    return useMutation(calendarService.modifySchedule);
  }
}

export const scheduleStore = new ScheduleStore();
