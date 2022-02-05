import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import AcademyProfileCard from '../../components/Molecules/cards/AcademyProfileCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SignInForm from '../../components/Organisms/forms/auth/signin/SignInForm';
import SignInWithSearch from '../../components/Organisms/forms/auth/signin/SignInWithSearch';
import { institutionStore } from '../../store/administration/institution.store';

function SignIn() {
  const { path } = useRouteMatch();
  const institution = institutionStore.getAll();

  return (
    <>
      {/* {institution.isLoading ? (
        <Loader />
      ) :  */}
      {institution.data?.data.data.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <NoDataAvailable
            icon="academy"
            title={'No institution available'}
            showButton={false}
            fill={false}
            description={
              'Sorry, looks like the institution has not setup the platform yet! Try again later'
            }
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 h-screen grid-cols-1 bg-main">
          <div className="items-center justify-center hidden lg:flex bg-secondary">
            <img className="block w-5/6" src={'/icons/login.svg'} alt="img" />
          </div>
          <div className="px-5 py-8 md:rounded-md mx-auto lg:py-20 h-screen">
            <AcademyProfileCard
              src="/images/rdf-logo.png"
              alt="institution logo"
              size="80"
              bgColor="none"
              txtSize="lg"
              fontWeight="semibold"
              color="primary"
              subtitle={institution.data?.data.data[0].moto}>
              {institution.data?.data.data[0].name}
            </AcademyProfileCard>
            <Switch>
              <Route exact path={`${path}`} render={() => <SignInForm />} />
              <Route exact path={`${path}/search`} render={() => <SignInWithSearch />} />
            </Switch>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
