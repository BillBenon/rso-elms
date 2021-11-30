import { AxiosResponse } from 'axios';

import { timetableAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  ClassTimeTableInfo,
  ICreateClassTimeTable,
} from '../../types/services/schedule.types';

class TimetableService {
  public async createClassTimetable(
    tt: ICreateClassTimeTable,
  ): Promise<AxiosResponse<Response<ClassTimeTableInfo>>> {
    return await timetableAxios.post('/class-timetable', tt);
  }

  public async getClassTimetableByIntakeLevelClass(
    intakeLevelClassId: string,
  ): Promise<AxiosResponse<Response<ClassTimeTableInfo[]>>> {
    return await timetableAxios.get(
      `/class-timetable/intake-level-class/${intakeLevelClassId}`,
    );
  }
}

export const timetableService = new TimetableService();
