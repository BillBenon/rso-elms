import moment from 'moment';
import React from 'react';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Badge from '../../../components/Atoms/custom/Badge';
import Button from '../../../components/Atoms/custom/Button';
import Icon from '../../../components/Atoms/custom/Icon';
import Heading from '../../../components/Atoms/Text/Heading';
import hobbiesStore from '../../../store/administration/hobbies.store';
import { UserInfo } from '../../../types/services/user.types';
import { advancedTypeChecker, titleCase } from '../../../utils/getOption';

function PersonalInfoCard({
  user,
  showMine = false,
}: {
  user: UserInfo;
  showMine: boolean;
}) {
  const hobbies = hobbiesStore.getUserHobby(user.person?.id + '').data?.data.data || [];

  const uploadPhoto = () => {};

  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md">
      {user.generic_status && (
        <div className="flex flex-col items-end mb-20">
          <Badge badgecolor={advancedTypeChecker(user.generic_status)}>
            {user.generic_status}
          </Badge>
        </div>
      )}
      <div className="bg-secondary py-5 flex flex-col justify-center items-center">
        <div className="relative">
          <Avatar
            className="border-4 border-primary-500 -mt-20"
            size="120"
            src="https://static.thenounproject.com/png/2643367-200.png"
            alt="photo"
          />
          {showMine && (
            <div className="absolute top-0 right-0">
              <Button styleType="text" onClick={() => uploadPhoto()}>
                <Icon
                  bgColor="main"
                  size={20}
                  useheightandpadding={false}
                  className="rounded-2xl p-5"
                  fill="primary"
                  name="camera"
                />
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center py-7">
          <Heading fontSize="lg" fontWeight="semibold">
            {user.first_name + ' ' + user.last_name}
          </Heading>
          <p className="py-2 font-normal text-sm border-b-2 text-txt-secondary">
            {titleCase(user.user_type).replaceAll('_', ' ')}
          </p>
          <p className="py-2 font-medium text-sm">{user.email}</p>
          <p className="py-2 font-medium text-sm">{user.phone}</p>
        </div>
      </div>
      <div className="personal-information py-6">
        <Heading fontWeight="semibold" fontSize="base" className="pb-5">
          Personal Information
        </Heading>
        <div className="flex gap-8">
          <div className="text-txt-secondary text-base">
            <p className="py-2">Enter in system</p>
            <p className="py-2">Age</p>
            <p className="py-2">Gender</p>
            <p className="py-2">Nationality</p>
            <p className="py-2">Marital Status</p>
            <p className="py-2">Passport Expiry Date</p>
            <p className="py-2">Place of birth</p>
            <p className="py-2">Birth location</p>
            <p className="py-2">Place of Residence</p>
            <p className="py-2">Residence location</p>
          </div>
          <div className="font-medium text-sm">
            <p className="py-3">{new Date(user.created_on).toDateString()}</p>
            <p className="py-2">
              {moment(Date.now()).diff(moment(user.person.birth_date || ''), 'years')}
            </p>
            <p className="py-2">{user.person.sex}</p>
            <p className="py-3">{user.person.nationality || 'Rwanda'}</p>
            <p className="py-2">{titleCase(user.person.marital_status)}</p>
            <p className="py-3">{user.person.document_expire_on || '-----'}</p>
            <p className="py-2">
              {user.person.place_of_birth || '----'} <br />
            </p>
            <p className="py-3">{user.person.place_of_birth_description || '----'}</p>
            <p className="py-2">
              {user.person.place_of_residence || '----'} <br />
            </p>
            <p className="py-3">{user.person.residence_location_id || '----'}</p>
          </div>
        </div>
      </div>
      <div className="other-information bg-secondary py-5">
        <Heading fontWeight="semibold" fontSize="base" className="px-5 py-2">
          Languages
        </Heading>
        <div>
          <Badge
            fontWeight="medium"
            badgecolor="main"
            badgetxtcolor="txt-secondary"
            className="mx-2 text-sm">
            Languages are currently not specificied
          </Badge>
        </div>
      </div>
      <div className="other-information bg-secondary pb-5">
        <Heading fontWeight="semibold" fontSize="base" className="px-5 py-2">
          Hobbies
        </Heading>
        <div>
          {hobbies?.length === 0 ? (
            <Badge
              fontWeight="medium"
              badgecolor="main"
              badgetxtcolor="txt-secondary"
              className="mx-2 text-sm">
              Hobbies are currently not specificied
            </Badge>
          ) : (
            hobbies?.map((hobby) => (
              <Badge
                key={hobby.id}
                badgecolor="main"
                badgetxtcolor="txt-secondary"
                className="mx-2">
                {hobby.name}
              </Badge>
            ))
          )}
        </div>
      </div>
      <div className="other-information bg-secondary pb-3">
        <Heading fontWeight="semibold" fontSize="base" className="px-5 py-2">
          Chronic Disease
        </Heading>
        <div>
          <Badge
            fontWeight="medium"
            badgecolor="main"
            badgetxtcolor="txt-secondary"
            className="mx-2 text-sm">
            Chronic diseases are currently not specificied
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoCard;
