import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { NotificationInfo } from '../../types/services/notification.types';

class NotificationService {
  public async fetchAll(): Promise<AxiosResponse<Response<NotificationInfo[]>>> {
    return await adminstrationAxios.get('/coursemodules/getAllModules');
  }
}

export const notificationService = new NotificationService();
