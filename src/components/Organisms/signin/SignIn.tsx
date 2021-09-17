import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AcademyProfileCard from '../../Molecules/cards/AcademyProfileCard';
import SignInForm from './SignInForm';
import SignInWithSearch from './SignInWithSearch';

const SignIn = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
        <div className="items-center justify-center hidden lg:flex bg-secondary">
          <img className="block w-3/4" src={'/icons/login.svg'} alt="img" />
        </div>
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
          <BrowserRouter>
            <Switch>
              <Route path="/" component={SignInForm} />
              <Route path="/by-search" component={SignInWithSearch} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default SignIn;
