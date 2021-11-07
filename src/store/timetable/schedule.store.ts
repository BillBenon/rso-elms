import { useMutation, useQuery } from 'react-query';

import { scheduleService } from '../../services/timetable/schedule.service';

class ScheduleStore {
  createSchedule() {
    return useMutation(scheduleService.createSchedule);
  }

  getScheduleById(id: string) {
    return useQuery(['schedules/id', id], () => scheduleService.getSchedule(id));
  }
  getAllSchedules() {
    return useQuery(['schedules'], scheduleService.getAllSchedules);
  }

  updateSchedule() {
    return useMutation(scheduleService.modifySchedule);
  }
}

export const scheduleStore = new ScheduleStore();
