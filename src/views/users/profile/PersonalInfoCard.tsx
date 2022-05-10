import moment from 'moment';
import React from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Badge from '../../../components/Atoms/custom/Badge';
import Button from '../../../components/Atoms/custom/Button';
import Icon from '../../../components/Atoms/custom/Icon';
import Heading from '../../../components/Atoms/Text/Heading';
import useAuthenticator from '../../../hooks/useAuthenticator';
import hobbiesStore from '../../../store/administration/hobbies.store';
import locationStore from '../../../store/administration/location.store';
import { ParamType } from '../../../types';
import { DocType, MaritalStatus, UserInfo } from '../../../types/services/user.types';
import { usePicture } from '../../../utils/file-util';
import { advancedTypeChecker, titleCase } from '../../../utils/getOption';

function PersonalInfoCard({ user }: { user: UserInfo }) {
  const { id } = useParams<ParamType>();

  const { url } = useRouteMatch();
  const history = useHistory();

  const { user: authUser } = useAuthenticator();
  const hobbies = hobbiesStore.getUserHobby(user.person?.id + '').data?.data.data || [];
  const residence = locationStore.getLocationsById(
    user.person?.residence_location_id + '',
  ).data?.data.data;

  const place_of_birth = locationStore.getLocationsById(user.person?.place_of_birth + '')
    .data?.data.data;

  return (
    <>
      <div className="max-w-sm py-4 px-6 bg-main rounded-md">
        {user.generic_status && (
          <div className="grid grid-cols-1 md:grid-cols-2 items-end mb-20">
            <div>
              <Link to={`${url}/edit-compl-prof`}>
                <Button styleType="outline">Edit</Button>
              </Link>
            </div>
            <div className="items-end px-24">
              <Badge badgecolor={advancedTypeChecker(user.generic_status)}>
                {user.generic_status}
              </Badge>
            </div>
          </div>
          //   <div className="flex flex-col items-end mt-8">

          // </div>
        )}
        <div className="bg-secondary py-5 flex flex-col justify-center items-center">
          <div className="relative  border-primary-400">
            <Avatar
              className="border-4 object-cover border-primary-500 -mt-20"
              size="120"
              src={usePicture(user.profile_attachment_id, user.id)}
              alt="photo"
            />

            {authUser?.id === id && (
              <div className="absolute top-0 right-0">
                <Button
                  styleType="text"
                  type="button"
                  onClick={() => history.push(`${url}/edit-prof`)}>
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
              {user.person?.current_rank?.name || ''}{' '}
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
          <div className="flex gap-6">
            <div className="text-txt-secondary text-base">
              <p className="py-2">Enter in system</p>
              <p className="py-2">Date of birth</p>
              <p className="py-2">Place of birth</p>
              <p className="py-2">Birth description</p>
              <p className="py-2">Gender</p>
              <p className="py-2">Origin</p>
              <p className="py-2">Marital Status</p>
              {user.person?.marital_status === MaritalStatus.WIDOWED ||
              MaritalStatus.MARRIED ? (
                <p className="py-2">Spouse Name</p>
              ) : (
                ' '
              )}
              <p className="py-2">{user.person?.doc_type || '-----'}</p>
              {user.person?.doc_type === DocType.PASSPORT ? (
                <p className="py-2">Passport Expiry Date</p>
              ) : (
                ' '
              )}
              <p className="py-2">Place of birth</p>
              <p className="py-2">Religion</p>
              <p className="py-2">Blood group</p>
              <p className="py-2">Father&apos;s names</p>
              <p className="py-2">Mother&apos;s names</p>
              <p className="py-2">Family Address</p>
              <p className="py-2">Family Addresss description</p>
            </div>
            <div className="font-medium text-sm">
              <p className="py-3">{moment(user.created_on).format('ddd, YYYY-MM-DD')}</p>
              <p className="py-2">{user.person?.birth_date || '----'}</p>
              <p className="py-2">{user.person?.place_of_birth || '----'}</p>
              <p className="py-2">{user.person?.place_of_birth_description || '----'}</p>
              <p className="py-2">{user.person?.sex || '----'}</p>
              <p className="py-3">{user.person?.nationality || '------'}</p>
              <p className="py-2">
                {user.person ? titleCase(user.person.marital_status) || '----' : '----'}
              </p>
              {user.person?.marital_status === MaritalStatus.WIDOWED ||
              MaritalStatus.MARRIED ? (
                <p className="py-2">{user.person?.spouse_name || '----'}</p>
              ) : (
                ' '
              )}
              <p className="py-2">{user.person?.nid}</p>
              {user.person?.doc_type === DocType.PASSPORT ? (
                <p className="py-2">{user.person?.document_expire_on || '-----'}</p>
              ) : (
                ''
              )}
              <p className="py-2">
                {place_of_birth?.name || '----'} <br />
              </p>
              <p className="py-2">
                {user.person?.religion || '----'} <br />
              </p>
              <p className="py-2">
                {user.person?.blood_group || '----'} <br />
              </p>
              <p className="py-2">{user.person?.father_names || '----'}</p>
              <p className="py-2">{user.person?.mother_names || '----'}</p>
              <p className="py-3">{residence?.name || '----'}</p>
              <p className="py-2">
                {user.person?.place_of_residence || '----'} <br />
              </p>
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
              fontSize="sm"
              badgecolor="main"
              badgetxtcolor="txt-secondary"
              className="mx-2">
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
                fontSize="sm"
                badgecolor="main"
                badgetxtcolor="txt-secondary"
                className="mx-2">
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
              fontSize="sm"
              badgetxtcolor="txt-secondary"
              className="mx-2">
              Chronic diseases are currently not specificied
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInfoCard;
