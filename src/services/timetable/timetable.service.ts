import { AxiosResponse } from 'axios';

import { timetableAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  ICreateTimeTableActivity,
  IUpdateTimetableActivity,
  WeeklyTimeTableInfo,
} from '../../types/services/schedule.types';

class TimetableService {
  public async createClassTimetable(
    tt: ICreateTimeTableActivity,
  ): Promise<AxiosResponse<Response<WeeklyTimeTableInfo>>> {
    return await timetableAxios.post('/class-timetable', tt);
  }

  public async getClassTimetableByIntakeLevelClass(
    intakeLevelClassId: string,
  ): Promise<AxiosResponse<Response<WeeklyTimeTableInfo[]>>> {
    return await timetableAxios.get(
      `/class-timetable/intake-level-class/${intakeLevelClassId}`,
    );
  }

  public async getClassTimetableById(
    id: string,
  ): Promise<AxiosResponse<Response<WeeklyTimeTableInfo>>> {
    return await timetableAxios.get(`/class-timetable/${id}`);
  }

  public async updateClassTimetableById(
    tt: IUpdateTimetableActivity,
  ): Promise<AxiosResponse<Response<WeeklyTimeTableInfo>>> {
    return await timetableAxios.put(`/class-timetable/${tt.id}`, tt);
  }

  public async delete(id: string): Promise<AxiosResponse<Response<WeeklyTimeTableInfo>>> {
    return await timetableAxios.delete(`/class-timetable/${id}`);
  }
}

export const timetableService = new TimetableService();
