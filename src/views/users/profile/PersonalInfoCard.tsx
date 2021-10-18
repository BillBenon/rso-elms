import React from 'react';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Badge from '../../../components/Atoms/custom/Badge';
import Heading from '../../../components/Atoms/Text/Heading';

function PersonalInfoCard() {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md">
      <div className="flex flex-col items-end mb-20">
        <Badge badgetxtcolor="success" badgecolor="success">
          Active
        </Badge>
      </div>
      <div className="bg-secondary py-5 flex flex-col justify-center items-center">
        <Avatar
          className="border-4 border-primary-500 -mt-20"
          size="120"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="photo"
        />
        <div className="flex flex-col justify-center items-center py-7">
          <Heading fontSize="lg" fontWeight="semibold">
            Florin Pop
          </Heading>
          <p className="py-2 font-normal text-xs border-b-2 text-txt-secondary">
            Instructor
          </p>
          <p className="py-2 font-medium text-xs">mushimiyimanake@gmail.com</p>
          <p className="py-2 font-medium text-xs">0743343443</p>
        </div>
      </div>
      <div className="personal-information py-6">
        <Heading fontWeight="semibold" fontSize="base" className="pb-5">
          Personal Information
        </Heading>
        <div className="flex gap-20">
          <div className="text-txt-secondary text-base">
            <p className="py-2">Enter in system</p>
            <p className="py-2">Age</p>
            <p className="py-2">Gender</p>
            <p className="py-2">Nationality</p>
            <p className="py-2">Marital Status</p>
            <p className="py-2">Passport Expiry Date</p>
            <p className="py-2">Place of birth</p>
            <p className="py-2">Birth location</p>
          </div>
          <div className="font-medium text-sm">
            <p className="py-3">23 / Jan / 2015</p>
            <p className="py-2">34</p>
            <p className="py-2">Male</p>
            <p className="py-3">Rwanda</p>
            <p className="py-2">Single</p>
            <p className="py-3">23 / Jan / 2015</p>
            <p className="py-2">Muhima</p>
            <p className="py-3">Rwanda, Kigali</p>
          </div>
        </div>
      </div>
      <div className="other-information bg-secondary py-5">
        <Heading fontWeight="semibold" fontSize="base" className="p-5">
          Languages
        </Heading>
        <div>
          <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
            French
          </Badge>
          <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
            English
          </Badge>
          <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
            Kiswahili
          </Badge>
          <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
            Kinyarwanda
          </Badge>
          <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
            Spanish
          </Badge>
        </div>
        <div className="other-information bg-secondary py-5">
          <Heading fontWeight="semibold" fontSize="base" className="p-5">
            Hobbies
          </Heading>
          <div>
            <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
              Football
            </Badge>
            <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
              Reading
            </Badge>
            <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
              Jumping
            </Badge>
            <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
              Basketball
            </Badge>
            <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
              Writing
            </Badge>
          </div>
        </div>
        <div className="other-information bg-secondary py-5">
          <Heading fontWeight="semibold" fontSize="base" className="p-5">
            Chronic Disease
          </Heading>
          <div>
            <Badge badgecolor="main" badgetxtcolor="txt-secondary" className="mx-2">
              HIV / AIDS
            </Badge>
            <p className="text-txt-secondary text-sm font-medium p-5">
              I usually take medicine every after amonth and hence makes me take some
              regumes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoCard;
