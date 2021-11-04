import { AxiosResponse } from 'axios';

import { timetableAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { CreateEvent, EventInfo } from '../../types/services/event.types';

class EventService {
  public async getAllEvents(): Promise<AxiosResponse<Response<EventInfo[]>>> {
    return await timetableAxios.get('/events');
  }

  public async getEvent(id: string): Promise<AxiosResponse<Response<EventInfo>>> {
    return await timetableAxios.get(`/events/${id}`);
  }

  public async createEvent(
    event: CreateEvent,
  ): Promise<AxiosResponse<Response<EventInfo>>> {
    return await timetableAxios.post('/events', event);
  }
  public async modifyEvent(
    event: EventInfo,
  ): Promise<AxiosResponse<Response<EventInfo>>> {
    return await timetableAxios.put('/events', event);
  }
}

export const eventService = new EventService();
