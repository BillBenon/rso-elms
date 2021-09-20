import React, { useState } from 'react';

import AcademyProfileCard from '../../../../Molecules/cards/AcademyProfileCard';
import PopupMolecule from '../../../../Molecules/Popup';
import ProgramList from '../../programs/ProgramList';
import SignInForm from './SignInForm';
import SignInWithRegControl from './SignInWithRegControl';
import SignInWithSearch from './SignInWithSearch';

const SignIn = () => {
  const [openRegistration] = useState(['hello']);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const closeModel = () => setModalOpen(false); // when this is fired the popup will be closed
  function submitted() {
    setShowSearch(true);
    setModalOpen(false);
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
        {openRegistration.length ? (
          <div className="hidden lg:block bg-secondary">
            <SignInWithRegControl handleClick={() => setModalOpen(true)} />
          </div>
        ) : (
          <div className="items-center justify-center hidden lg:flex bg-secondary">
            <img className="block w-3/4" src={'/icons/login.svg'} alt="img" />
          </div>
        )}
        <div className="px-5 py-8 md:rounded-md mx-auto lg:py-20 h-auto">
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
          <PopupMolecule open={modalOpen} onClose={closeModel}>
            <ProgramList onSubmit={submitted} />
          </PopupMolecule>
        </div>
      </div>
    </>
  );
};

export default SignIn;
