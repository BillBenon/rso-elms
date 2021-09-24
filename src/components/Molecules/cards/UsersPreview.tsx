import React from 'react';

import Avatar from '../../Atoms/custom/Avatar';
import Icon from '../../Atoms/custom/Icon';
import img from '../../Atoms/custom/img';
import Heading from '../../Atoms/Text/Heading';

type IUserPreview = {
  title: string;
  totalUsers: number;
};

export default function UsersPreview({ title, totalUsers }: IUserPreview) {
  return (
    <div className="flex flex-col gap-6 w-60 py-4 px-6 h-32 bg-main">
      <div className="flex flex-col gap-2">
        <Heading color="txt-secondary" fontSize="base">
          {title}
        </Heading>
        <Heading color="txt-primary" fontSize="base" fontWeight="bold">
          {totalUsers}
        </Heading>
        <div className="flex ">
          <div className="flex items-center">
            <div className="">
              <Avatar
                size="24"
                alt="user1 profile"
                className=" rounded-full  border-2 border-main transform hover:scale-125"
                src="https://randomuser.me/api/portraits/men/1.jpg"
              />
            </div>

            <div className="-m-1">
              <Avatar
                size="24"
                alt="user2 profile"
                className=" rounded-full  border-2 border-main transform hover:scale-125"
                src="https://randomuser.me/api/portraits/women/2.jpg"
              />
            </div>

            <div className="-m-1">
              <Avatar
                size="24"
                alt="user 3 profile"
                className=" rounded-full  border-2 border-main transform hover:scale-125"
                src="https://randomuser.me/api/portraits/men/3.jpg"
              />
            </div>
          </div>

          <div className="flex items-center">
            <Icon name="add" size={12} />
            <Heading color="primary" fontSize="base" fontWeight="bold" className="-m-1">
              {totalUsers - 2}
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
}
