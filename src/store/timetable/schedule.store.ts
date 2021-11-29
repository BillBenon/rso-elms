import { useMutation, useQuery } from 'react-query';

import { scheduleService } from '../../services/timetable/schedule.service';
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
          return scheduleService.createDateRangeEvents(schedule);
        case frequencyType.RECURRING:
          return scheduleService.createRecurringEvents(schedule);
        default:
          return scheduleService.createOneTimeEvents(schedule);
      }
    });
  }

  createClassTimetable() {
    return useMutation(scheduleService.createClassTimetable);
  }

  getScheduleById(id: string) {
    return useQuery(['schedules/id', id], () => scheduleService.getScheduleById(id));
  }

  getAllSchedules() {
    return useQuery(['schedules'], scheduleService.getAll);
  }
  getAllByAcademicProgramIntakeLevel(id: string, range: DateRange) {
    return useQuery(
      ['schedules/level-intake/:id', id],
      () => scheduleService.getAllByAcademicProgramIntakeLevel(id, range),
      { enabled: !!id },
    );
  }
  getAllByAcademicProgramIntakeLevelAndStatus(id: string, status: ScheduleStatus) {
    return useQuery(['schedules/level-intake/:id/:status', id, status], () =>
      scheduleService.getAllByAcademicProgramIntakeLevelAndStatus(id, status),
    );
  }
  getAllByAcademicProgram(id: string, range: DateRange) {
    return useQuery(['schedules/program/:id', id], () =>
      scheduleService.getAllByAcademicProgram(id, range),
    );
  }

  getAllByAcademicProgramAndStatus(id: string, status: ScheduleStatus) {
    return useQuery(['schedules/program/:id/:status', id, status], () =>
      scheduleService.getAllByAcademicProgramAndStatus(id, status),
    );
  }

  getAllByIntakeLevelClass(id: string, range: DateRange) {
    return useQuery(
      ['schedules/intakeclass/:id', id],
      () => scheduleService.getAllByIntakeLevelClass(id, range),
      { enabled: !!id },
    );
  }

  updateSchedule() {
    return useMutation(scheduleService.modifySchedule);
  }
}

export const scheduleStore = new ScheduleStore();
