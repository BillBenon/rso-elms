import React from 'react';

import Button from '../components/Atoms/custom/Button';
import Heading from '../components/Atoms/Text/Heading';
import AcademyProfileCard from '../components/Molecules/cards/AcademyProfileCard';
import { authenticatorStore } from '../store';

function NotApproved() {
  const authUser = authenticatorStore.authUser().data?.data;
  return (
    <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
      <div className="items-center justify-center hidden lg:flex bg-secondary">
        <img className="block w-5/6" src={'/icons/login.svg'} alt="img" />
      </div>
      <div className="flex flex-col px-5 py-8 md:rounded-md lg:p-20 justify-center">
        <div className="py-4">
          <AcademyProfileCard
            src="/images/nisslogo.png"
            alt="academy logo"
            bgColor="none">
            <span className="font-semibold text-lg text-primary-500">
              {authUser?.data.academy.name
                ? authUser.data.academy.name
                : 'National Intelligence and Security Service'}
            </span>
          </AcademyProfileCard>
        </div>
        <div className="pt-20 px-4">
          <Heading fontWeight="medium" fontSize="2xl">
            Welcome,
          </Heading>
          <Heading className="pt-2" fontWeight="semibold" fontSize="2xl">
            {authUser?.data.username}
          </Heading>
          <p className="text-primary-500 pt-5 pb-11">
            Its our pleasure to be with you here! Please wait for your approval as{' '}
            {authUser?.data.user_type.replaceAll('_', ' ').toLowerCase()} to{' '}
            <span className="underline">{authUser?.data.academy.name}</span>.
          </p>
          <div className="flex justify-evenly">
            <Button styleType="outline">Move Back</Button>
            <Button styleType="text">Update Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotApproved;
