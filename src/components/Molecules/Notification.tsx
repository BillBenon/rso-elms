import React from 'react';

import { NotificationInfo } from '../../types/services/notification.types';
import Heading from '../Atoms/Text/Heading';

type NotificationProps = {
  notifications: NotificationInfo[];
};

export default function Notification({ notifications }: NotificationProps) {
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
        notifications?.map((notification) => (
          <React.Fragment key={notification.id}>
            <div className="flex flex-col gap-1 pb-4 pt-4">
              <Heading color="txt-primary" fontSize="base" fontWeight="semibold">
                {notification.title}
              </Heading>

              <Heading fontSize="sm" color="txt-secondary">
                {notification.message}
              </Heading>
            </div>
            <hr className="bg-tertiary border-0" style={{ height: '2px' }} />
          </React.Fragment>
        ))
      ) : (
        <div className="text-center pb-4 pt-4">
          <Heading fontSize="sm" color="txt-secondary">
            No new notifications
          </Heading>
        </div>
      )}
    </div>
  );
}
