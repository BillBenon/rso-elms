import { useMutation, useQuery } from 'react-query';

import { scheduleService } from '../../services/timetable/schedule.service';
import { ScheduleStatus } from '../../types/services/schedule.types';

class ScheduleStore {
  createDateRangeEvents() {
    return useMutation(scheduleService.createDateRangeEvents);
  }
  createOneTimeEvents() {
    return useMutation(scheduleService.createOneTimeEvents);
  }
  createRecurringEvents() {
    return useMutation(scheduleService.createRecurringEvents);
  }

  getScheduleById(id: string) {
    return useQuery(['schedules/id', id], () => scheduleService.getScheduleById(id));
  }

  getAllSchedules() {
    return useQuery(['schedules'], scheduleService.getAll);
  }
  getAllByAcademicProgramIntakeLevel(id: string) {
    return useQuery(['schedules/level-intake/:id', id], () =>
      scheduleService.getAllByAcademicProgramIntakeLevel(id),
    );
  }
  getAllByAcademicProgramIntakeLevelAndStatus(id: string, status: ScheduleStatus) {
    return useQuery(['schedules/level-intake/:id/:status', id, status], () =>
      scheduleService.getAllByAcademicProgramIntakeLevelAndStatus(id, status),
    );
  }
  getAllByAcademicProgram(id: string) {
    return useQuery(['schedules/program/:id', id], () =>
      scheduleService.getAllByAcademicProgram(id),
    );
  }
  getAllByAcademicProgramAndStatus(id: string, status: ScheduleStatus) {
    return useQuery(['schedules/program/:id/:status', id, status], () =>
      scheduleService.getAllByAcademicProgramAndStatus(id, status),
    );
  }

  updateSchedule() {
    return useMutation(scheduleService.modifySchedule);
  }
}

export const scheduleStore = new ScheduleStore();
