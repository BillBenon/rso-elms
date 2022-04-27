import { useMutation, useQuery } from 'react-query';

import { timetableService } from '../../services/timetable/timetable.service';

class TimetableStore {
  createTimetableActivity() {
    return useMutation(timetableService.createLevelTimetable);
  }

  createTimetableActivityFootnote() {
    return useMutation(timetableService.createLevelTimetableFootnote);
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

  createTimetableWeek() {
    return useMutation(timetableService.createTimetableWeek);
  }

  getWeekAndActivitiesByWeekId(id: string) {
    return useQuery(['timetable/week/:id', id], () =>
      timetableService.getActivitiesByWeekId(id),
    );
  }

  getCurrentWeek(currentDate: string, intakeLevelId: string) {
    return useQuery(['timetable/week/current/:id', currentDate, intakeLevelId], () =>
      timetableService.getCurrentWeek(currentDate, intakeLevelId),
    );
  }

  getWeeksByIntakeLevel(intakeLevelId: string) {
    return useQuery(['timetable/weeks', intakeLevelId], () =>
      timetableService.getWeeksByIntakeLevel(intakeLevelId),
    );
  }

  changeWeekStatus() {
    return useMutation(timetableService.changeWeekStatus);
  }
}

export const timetableStore = new TimetableStore();
