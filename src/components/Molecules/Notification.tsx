import React from 'react';

import Heading from '../Atoms/Text/Heading';

export default function Notification() {
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

      <div className="flex flex-col gap-1 pb-4 pt-4">
        <Heading color="txt-primary" fontSize="base" fontWeight="semibold">
          Security alert
        </Heading>

        <Heading fontSize="sm" color="txt-secondary">
          Some new students have registered and are waiting for your approval.
        </Heading>
      </div>
      <hr className="bg-tertiary border-0" style={{ height: '2px' }} />
    </div>
  );
}
