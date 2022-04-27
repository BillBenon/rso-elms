import { useMutation, useQuery } from 'react-query';

import { timetableService } from '../../services/timetable/timetable.service';

class TimetableStore {
  createTimetableActivity() {
    return useMutation(timetableService.createLevelTimetable);
  }

  getClassTimetableByIntakeLevelClass(id: string) {
    return useQuery(['timetable/intakeclassid/:id', id], () =>
      timetableService.getClassTimetableByIntakeLevelClass(id),
    );
  }

  getTimetableActivityById(id: string) {
    return useQuery(['timetable/:id', id], () =>
      timetableService.getTimetableActivityById(id),
    );
  }

  public async updateTimetableActivityById() {
    return useMutation(timetableService.updateTimetableActivityById);
  }

  public async deleteActivity() {
    return useMutation(timetableService.deleteActivity);
  }

  // timetable weeks

  public async createTimetableWeek() {
    return useMutation(timetableService.createTimetableWeek);
  }

  public async getWeekAndActivitiesByWeekId(id: string) {
    return useQuery(['timetable/week/:id', id], () =>
      timetableService.getActivitiesByWeekId(id),
    );
  }

  public async getCurrentWeek(currentDate: string, intakeLevelId: string) {
    return useQuery(['timetable/week/current/:id', currentDate, intakeLevelId], () =>
      timetableService.getCurrentWeek(currentDate, intakeLevelId),
    );
  }

  public async getWeeksByIntakeLevel(intakeLevelId: string) {
    return useQuery(['timetable/weeks', intakeLevelId], () =>
      timetableService.getWeeksByIntakeLevel(intakeLevelId),
    );
  }
}

export const timetableStore = new TimetableStore();
