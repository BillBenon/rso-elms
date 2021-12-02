/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useState } from 'react';

import { UserView } from '../../../types/services/user.types';
import Avatar from '../../Atoms/custom/Avatar';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import RightSidebar from '../../Organisms/RightSidebar';

type IUserPreview = {
  title: string;
  label: string;
  data: UserView[];
  totalUsers: number;
  hasButton?: boolean;
  linkLabel?: string;
  handleSelect?: (_selected: string[] | null) => void;
  buttonAction?: () => void;
  children?: ReactNode;
  dataLabel: string;
};

export default function UsersPreview({
  title,
  label,
  data,
  children,
  totalUsers,
  dataLabel = '',
}: IUserPreview) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-col gap-6 w-60 py-4 px-6 h-32 z-1 bg-main cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        <div className="flex flex-col gap-2">
          <Heading color="txt-secondary" fontSize="base">
            {title}
          </Heading>
          <div>
            <Heading color="primary" fontSize="base" fontWeight="bold">
              Total {title.toLocaleLowerCase()}: {totalUsers}
            </Heading>
          </div>

          <div className="flex">
            <div className="flex items-center">
              {Array(totalUsers)
                .fill(0)
                .map(
                  (_, i) =>
                    i < 3 && (
                      <div key={i}>
                        <Avatar
                          size="24"
                          alt="user1 profile"
                          className="rounded-full border-2 border-main transform hover:scale-125"
                          src="https://static.thenounproject.com/png/2643367-200.png"
                        />
                      </div>
                    ),
                )}
            </div>

            <div className="flex items-center">
              {totalUsers > 3 ? (
                <>
                  <Icon name="add" size={12} fill="primary" />
                  <Heading
                    color="primary"
                    fontSize="base"
                    fontWeight="bold"
                    className="-m-1">
                    {totalUsers - 3}
                  </Heading>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      {children && children}
      {sidebarOpen && (
        <RightSidebar
          open={sidebarOpen}
          handleClose={() => setSidebarOpen(false)}
          label={label}
          data={data}
          selectorActions={[
            {
              name: 'Change Status',
              handleAction: (data?: string[]) => {
                alert(`changing status ${data}`);
              },
            },
          ]}
          dataLabel={dataLabel}
        />
      )}
    </>
  );
}
