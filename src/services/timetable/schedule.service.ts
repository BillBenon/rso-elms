import { AxiosResponse } from 'axios';

import { timetableAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { CreateEventSchedule, ScheduleInfo } from '../../types/services/schedule.types';

class ScheduleService {
  public async getAllSchedules(): Promise<AxiosResponse<Response<ScheduleInfo[]>>> {
    return await timetableAxios.get('/schedules');
  }

  public async getSchedule(id: string): Promise<AxiosResponse<Response<ScheduleInfo>>> {
    return await timetableAxios.get(`/schedules/${id}`);
  }

  public async createSchedule(
    schedule: CreateEventSchedule,
  ): Promise<AxiosResponse<Response<ScheduleInfo>>> {
    return await timetableAxios.post('/schedules', schedule);
  }
  public async modifySchedule(
    schedule: ScheduleInfo,
  ): Promise<AxiosResponse<Response<ScheduleInfo>>> {
    return await timetableAxios.put('/schedules', schedule);
  }
}

export const scheduleService = new ScheduleService();
