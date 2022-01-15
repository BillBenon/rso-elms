import './styles/redirecting.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authenticatorStore } from './store/administration';
import { getPersonExperiences } from './store/administration/experience.store';
import { getHisNextKinById } from './store/administration/usernextkin.store';
import { ProfileStatus, UserType } from './types/services/user.types';
import NotApproved from './views/NotApproved';

export default function Redirecting() {
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { data: authUser, isLoading } = authenticatorStore.authUser();

  const { data: nextOfKin } = getHisNextKinById(authUser?.data.data.id);
  const { data: experiences } = getPersonExperiences(authUser?.data.data.person.id);

  const history = useHistory();

  const redirectTo = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  useEffect(() => {
    const notAllowed = !Object.keys(UserType).includes(
      authUser?.data.data.user_type + '',
    );

    if (authUser?.data.data) {
      // setLocalStorageData('user', authUser.data.data);
      localStorage.setItem('user', JSON.stringify(authUser.data.data));

      if (authUser.data.data.profile_status !== ProfileStatus.COMPLETD) {
        redirectTo('/complete-profile');
      } else {
        if (nextOfKin && nextOfKin?.data.data.length === 0) {
          redirectTo('/complete-profile/more');
        } else if (experiences && experiences?.data.data.length === 0) {
          redirectTo('/complete-profile/experience');
        } else if (nextOfKin && experiences) {
          if (
            authUser.data.data.user_type != UserType.SUPER_ADMIN &&
            !authUser.data.data.academy
          ) {
            setHasNoAcademy(true);
          } else {
            redirectTo(
              authUser.data.data.user_type === UserType.INSTRUCTOR
                ? '/dashboard/inst-module'
                : authUser.data.data.user_type === UserType.STUDENT
                ? '/dashboard/student'
                : '/dashboard/users',
            );
          }
        }
      }
    }

    setUserNotAllowed(notAllowed && !isLoading);
    // }, [authUser?.data.data, isLoading]);
  }, [
    authUser?.data.data,
    isLoading,
    experiences?.data.data,
    nextOfKin?.data.data,
    experiences,
    redirectTo,
    nextOfKin,
  ]);

  return (
    <>
      {/* <p>User has no Academy, please contact admin to give you </p> */}
      {!hasNoAcademy && !userNotAllowed && (
        <div className="redirecing-loader full-height grid place-items-center">
          <div className="typewriter text-xl font-bold w-44">
            <h1>Redirecting....</h1>
          </div>
        </div>
      )}

      <div>
        {/* when academic admin does not have academy assigned to him */}
        {hasNoAcademy && <NotApproved />}

        {/* when user type is not yet supported in system */}
        {userNotAllowed && <NotApproved />}
      </div>
    </>
  );
}
