import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Atoms/custom/Button';
import Heading from '../components/Atoms/Text/Heading';
import AcademyProfileCard from '../components/Molecules/cards/AcademyProfileCard';
import useAuthenticator from '../hooks/useAuthenticator';
import usePickedRole from '../hooks/usePickedRole';
import academyStore from '../store/administration/academy.store';
import { institutionStore } from '../store/administration/institution.store';
import { RoleType } from '../types';
import { usePicture } from '../utils/file-util';

function NotApproved() {
  const { user } = useAuthenticator();
  const picked_role = usePickedRole();
  const { data: academy } = academyStore.getAcademyById(picked_role?.academy_id + '');
  const institution = institutionStore.getAll().data?.data.data;

  const display_attach_id =
    picked_role?.type === RoleType.ACADEMY
      ? academy?.data.data?.logo_attachment_id
      : institution?.find((ac) => ac.id === picked_role?.institution_id)
          ?.logo_attachment_id || undefined;

  const display_id =
    picked_role?.type === RoleType.ACADEMY
      ? academy?.data.data?.id
      : institution?.find((ac) => ac.id === picked_role?.institution_id)?.id + '';

  const display_name =
    picked_role?.type === RoleType.ACADEMY
      ? academy?.data.data?.name
      : institution?.find((ac) => ac.id === picked_role?.institution_id)?.name;

  return (
    <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
      <div className="items-center justify-center hidden lg:flex bg-secondary">
        <img className="block w-5/6" src={'/icons/login.svg'} alt="img" />
      </div>
      <div className="flex flex-col px-5 py-8 md:rounded-md lg:p-20 justify-center">
        {picked_role?.academy_id ? (
          <div className="py-4">
            <AcademyProfileCard
              src={usePicture(
                display_attach_id,
                display_id,
                '/images/rdf-logo.png',
                'logos',
              )}
              alt="academy logo"
              bgColor="none">
              <span className="font-semibold text-lg text-primary-500">
                {display_name ||
                  user?.institution_name ||
                  'National Intelligence and Security Service'}
              </span>
            </AcademyProfileCard>
          </div>
        ) : (
          <div className="py-4">
            <AcademyProfileCard
              src="/images/rdf-logo.png"
              alt="academy logo"
              bgColor="none">
              <span className="font-semibold text-lg text-primary-500">
                National Intelligence and Security Service
              </span>
            </AcademyProfileCard>
          </div>
        )}
        <div className="pt-20 px-4">
          <Heading fontWeight="medium" fontSize="2xl">
            Welcome,
          </Heading>
          <Heading className="pt-2" fontWeight="semibold" fontSize="2xl">
            {user?.username}
          </Heading>
          {academy?.data.data ? (
            <p className="text-primary-500 pt-5 pb-11">
              Its our pleasure to be with you here! Please wait for your approval as{' '}
              {user?.user_type.replaceAll('_', ' ').toLowerCase()} to{' '}
              <span className="underline">{academy?.data.data.name}</span>.
            </p>
          ) : user?.user_roles?.length === 0 ? (
            <p className="text-primary-500 pt-5 pb-11">
              Its our pleasure to be with you here! Please wait for your academy to give
              you a role to <span className="underline">{academy?.data.data.name}</span>.
            </p>
          ) : (
            <p className="text-primary-500 pt-5 pb-11">
              Its our pleasure to be with you here! unfortunately you currently
              <span className="underline"> don&apos;t belong in any academy</span>.
            </p>
          )}
          <div className="flex justify-evenly">
            <Button styleType="outline">
              <Link to="/login">Move Back</Link>
            </Button>
            <Button styleType="text">
              <Link to="/complete-profile">Update Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotApproved;
