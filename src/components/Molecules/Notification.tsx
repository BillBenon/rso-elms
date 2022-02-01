/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  NotificationInfo,
  NotificationType,
} from '../../types/services/notification.types';
import { linkConstructor } from '../../utils/linkConstructor';
import Heading from '../Atoms/Text/Heading';

type NotificationProps = {
  notifications: NotificationInfo[];
};

export default function Notification({ notifications }: NotificationProps) {
  const history = useHistory();

  function navigator(notificationType: string, id: string) {
    //@ts-ignore
    const url = linkConstructor(NotificationType[notificationType], id);

    if (url) history.push(url, id);
  }
  return (
    <div className="flex flex-col pb-6 w-72">
      <Heading fontWeight="semibold" color="txt-primary">
        Notifications
      </Heading>

      {/* <div className="pt-7 pb-4">
        <Heading fontSize="base" fontWeight="semibold" color="txt-secondary">
          Today
        </Heading>
      </div> */}

      {notifications && notifications?.length > 0 ? (
        notifications?.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <div
              role="button"
              tabIndex={index}
              onClick={() =>
                navigator(
                  notification.notification_type,
                  notification.notification_entity_beneficiary_uuid,
                )
              }>
              <div className="flex justify-between items-center gap-6">
                <span className="h-2 w-4 bg-primary-400 rounded-full"></span>
                <div className="flex flex-col gap-1 pb-4 pt-4">
                  <Heading color="txt-primary" fontSize="base" fontWeight="semibold">
                    {notification.title}
                  </Heading>

                  <Heading fontSize="sm" color="txt-secondary">
                    {notification.message}
                  </Heading>
                </div>
              </div>
            </div>
            <hr className="bg-tertiary border-0" style={{ height: '2px' }} />
          </React.Fragment>
        ))
      ) : (
        <div className="flex flex-col gap-1 pb-4 pt-4">
          <Heading fontSize="sm" color="txt-secondary">
            No new notifications
          </Heading>
        </div>
      )}
    </div>
  );
}
