import { useMutation, useQuery } from 'react-query';
import { timetableService } from '../../services/timetable/timetable.service';

class TimetableStore {
  createClassTimetable() {
    return useMutation(timetableService.createClassTimetable);
  }

  getClassTimetableByIntakeLevelClass(id: string) {
    return useQuery(['timetable/intakeclassid/:id', id], () =>
      timetableService.getClassTimetableByIntakeLevelClass(id),
    );
  }

  getClassTimetableById(id: string) {
    return useQuery(['timetable/:id', id], () =>
      timetableService.getClassTimetableById(id),
    );
  }

  public async updateClassTimetableById() {
    return useMutation(timetableService.updateClassTimetableById);
  }

  public async delete() {
    return useMutation(timetableService.delete);
  }
}

export const timetableStore = new TimetableStore();
