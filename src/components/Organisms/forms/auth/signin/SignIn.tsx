import React, { useState } from 'react';

import { SigninPropTypes } from '../../../../../types';
import AcademyProfileCard from '../../../../Molecules/cards/AcademyProfileCard';
import PopupMolecule from '../../../../Molecules/Popup';
import ProgramList from '../../programs/ProgramList';
import SignInForm from './SignInForm';
import SignInWithRegControl from './SignInWithRegControl';
import SignInWithSearch from './SignInWithSearch';

const SignIn = () => {
  const [openRegistration] = useState(['hello']);
  const [showData, setShowData] = useState<SigninPropTypes>();
  // const [modalOpen, setModalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const closeModel = () => setShowData(undefined); // when this is fired the popup will be closed
  const regData: SigninPropTypes[] = [
    {
      status: { type: 'success', text: 'Active' },
      code: 'RMA Gako',
      title: 'A short description of registration control',
      description: '02 Sep 2021 - 02 Nov 2021',
      programs: [
        { value: 'cadetteprogram', label: 'Cadette Program' },
        { value: 'program', label: 'Program' },
        { value: 'cadette', label: 'Cadette' },
        { value: 'progra', label: 'Progra' },
      ],
    },
    {
      status: { type: 'success', text: 'Active' },
      code: 'RMA Nyakinama',
      title: 'A short desctiption of a registration control',
      description: '17 Aug 2021 - 10 Sep 2021',
      programs: [
        { value: 'cadetteprogram', label: 'Cadette Program' },
        { value: 'program', label: 'Program' },
        { value: 'cadette', label: 'Cadette' },
        { value: 'progra', label: 'Progra' },
      ],
    },
    {
      status: { type: 'error', text: 'Inactive' },
      code: 'CTC Gabiro',
      title: 'A short desctiption of a registration control',
      description: '17 Aug 2021 - 10 Sep 2021',
      programs: [
        { value: 'cadetteprogram', label: 'Cadette Program' },
        { value: 'program', label: 'Program' },
        { value: 'cadette', label: 'Cadette' },
        { value: 'progra', label: 'Progra' },
      ],
    },
  ];

  function submitted() {
    setShowSearch(true);
    setShowData(undefined);
    // setModalOpen(false);
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
        {openRegistration.length ? (
          <div className="hidden lg:block bg-secondary h-screen overflow-auto">
            <SignInWithRegControl
              data={regData}
              handleClick={(regData) => setShowData(regData)}
            />
          </div>
        ) : (
          <div className="items-center justify-center hidden lg:flex bg-secondary">
            <img className="block w-3/4" src={'/icons/login.svg'} alt="img" />
          </div>
        )}
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
