import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import AcademyProfileCard from '../../components/Molecules/cards/AcademyProfileCard';
import SignInForm from '../../components/Organisms/forms/auth/signin/SignInForm';
import SignInWithSearch from '../../components/Organisms/forms/auth/signin/SignInWithSearch';

function SignIn() {
  const [openRegistration] = useState([]);
  const { path } = useRouteMatch();

  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
        {openRegistration.length ? (
          <div className="hidden lg:block bg-secondary h-screen overflow-auto">
            {/* <SignInWithRegControl
              data={regData}
              handleClick={(regData) => setShowData(regData)}
            /> */}
          </div>
        ) : (
          <div className="items-center justify-center hidden lg:flex bg-secondary">
            <img className="block w-5/6" src={'/icons/login.svg'} alt="img" />
          </div>
        )}
        <div className="px-5 py-8 md:rounded-md mx-auto lg:py-20 h-screen">
          <AcademyProfileCard
            src="/images/nisslogo.png"
            alt="academy logo"
            size="80"
            bgColor="none"
            txtSize="lg"
            fontWeight="semibold"
            color="primary"
            subtitle="Alertness . Reliability . Integrity">
            National Intelligence and Security Service
          </AcademyProfileCard>
          <Switch>
            <Route exact path={`${path}`} render={() => <SignInForm />} />
            <Route exact path={`${path}/search`} render={() => <SignInWithSearch />} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default SignIn;
