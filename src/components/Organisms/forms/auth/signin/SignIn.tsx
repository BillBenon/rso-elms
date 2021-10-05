import React, { useState } from 'react';

import { SigninPropTypes } from '../../../../../types';
import AcademyProfileCard from '../../../../Molecules/cards/AcademyProfileCard';
import PopupMolecule from '../../../../Molecules/Popup';
import ProgramList from '../../programs/ProgramList';
import SignInForm from './SignInForm';
import SignInWithSearch from './SignInWithSearch';

const SignIn = () => {
  const [showData, setShowData] = useState<SigninPropTypes>();

  const [showSearch, setShowSearch] = useState(false);

  const closeModel = () => setShowData(undefined); // when this is fired the popup will be closed

  function submitted() {
    setShowSearch(true);
    setShowData(undefined);
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
        <div className="items-center justify-center hidden lg:flex bg-secondary">
          <img className="block w-3/4" src={'/icons/login.svg'} alt="img" />
        </div>

        <div className="px-5 py-8 md:rounded-md mx-auto lg:py-20 h-screen">
          <AcademyProfileCard
            src="/icons/police-logo.svg"
            alt="academy logo"
            size="80"
            bgColor="none"
            txtSize="lg"
            fontWeight="semibold"
            color="primary"
            subtitle="Service . Protection . Integrity">
            Rwanda National Police
          </AcademyProfileCard>
          {showSearch ? (
            <SignInWithSearch handleClick={() => setShowSearch(false)} />
          ) : (
            <SignInForm />
          )}
          <PopupMolecule open={showData != undefined} onClose={closeModel}>
            <ProgramList academy={showData} onSubmit={submitted} />
          </PopupMolecule>
        </div>
      </div>
    </>
  );
};

export default SignIn;
