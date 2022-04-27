import { AxiosResponse } from 'axios';

import { timetableAxios } from '../../plugins/axios';
import { Response } from '../../types';
import {
  ICreateTimeTableActivity,
  ICreateTimeTableWeek,
  ITimeTableActivityInfo,
  ITimeTableWeekInfo,
  IUpdateTimetableActivity,
} from '../../types/services/schedule.types';

class TimetableService {
  public async createLevelTimetable(
    tt: ICreateTimeTableActivity,
  ): Promise<AxiosResponse<Response<ITimeTableActivityInfo>>> {
    return await timetableAxios.post('/weekly-timetable-activity', tt);
  }

  public async getClassTimetableByIntakeLevelClass(
    intakeLevelClassId: string,
  ): Promise<AxiosResponse<Response<ITimeTableActivityInfo[]>>> {
    return await timetableAxios.get(
      `/class-timetable/intake-level-class/${intakeLevelClassId}`,
    );
  }

  public async getTimetableActivityById(
    id: string,
  ): Promise<AxiosResponse<Response<ITimeTableActivityInfo>>> {
    return await timetableAxios.get(`/weekly-timetable-activity/${id}`);
  }

  public async updateTimetableActivityById(
    tt: IUpdateTimetableActivity,
  ): Promise<AxiosResponse<Response<ITimeTableActivityInfo>>> {
    return await timetableAxios.put(`/weekly-timetable-activity/${tt.id}`, tt);
  }

  public async deleteActivity(
    id: string,
  ): Promise<AxiosResponse<Response<ITimeTableActivityInfo>>> {
    return await timetableAxios.delete(`/weekly-timetable-activity/${id}`);
  }

  // timetable weeks

  public async createTimetableWeek(
    tt: ICreateTimeTableWeek,
  ): Promise<AxiosResponse<Response<ITimeTableWeekInfo>>> {
    return await timetableAxios.post('/weekly-timetable', tt);
  }

  public async getActivitiesByWeekId(
    id: string,
  ): Promise<AxiosResponse<Response<ITimeTableWeekInfo>>> {
    return await timetableAxios.get(`/weekly-timetable/${id}`);
  }

  public async getCurrentWeek(
    currentDate: string,
    intakeLevelId: string,
  ): Promise<AxiosResponse<Response<ITimeTableWeekInfo>>> {
    return await timetableAxios.put(`/weekly-timetable/getCurrent/${intakeLevelId}`, {
      currentDate,
    });
  }

  public async getWeeksByIntakeLevel(
    intakeLevelId: string,
  ): Promise<AxiosResponse<Response<ITimeTableWeekInfo[]>>> {
    return await timetableAxios.get(`/weekly-timetable/intakeLevel/${intakeLevelId}`);
  }
}

export const timetableService = new TimetableService();
