import { useMutation, useQuery } from 'react-query';
import { timetableService } from '../../services/timetable/timetable.service';

class TimetableStore {
  createClassTimetable() {
    return useMutation(timetableService.createClassTimetable);
  }

  getClassTimetableByIntakeLevelClass(id: string) {
    return useQuery(['schedules/tt/:id', id], () =>
      timetableService.getClassTimetableByIntakeLevelClass(id),
    );
  }
}

export const timetableStore = new TimetableStore();
