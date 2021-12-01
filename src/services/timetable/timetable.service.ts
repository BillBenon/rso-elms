import { AxiosResponse } from 'axios';

import { timetableAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  ClassTimeTableInfo,
  ICreateClassTimeTable,
  IUpdateClassTimetable,
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

  public async getClassTimetableById(
    id: string,
  ): Promise<AxiosResponse<Response<ClassTimeTableInfo>>> {
    return await timetableAxios.get(`/class-timetable/${id}`);
  }

  public async updateClassTimetableById(
    tt: IUpdateClassTimetable,
  ): Promise<AxiosResponse<Response<ClassTimeTableInfo>>> {
    return await timetableAxios.put(`/class-timetable/${tt.id}`, tt);
  }

  public async delete(id: string): Promise<AxiosResponse<Response<ClassTimeTableInfo>>> {
    return await timetableAxios.delete(`/class-timetable/${id}`);
  }
}

export const timetableService = new TimetableService();
