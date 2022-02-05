import { AxiosResponse } from 'axios';

import { adminstrationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { NotificationInfo } from '../../types/services/notification.types';

class NotificationService {
  public async fetchAll(
    userId: string,
  ): Promise<AxiosResponse<Response<NotificationInfo[]>>> {
    return await adminstrationAxios.get(`/notifications/user/${userId}`);
  }
}

export const notificationService = new NotificationService();
