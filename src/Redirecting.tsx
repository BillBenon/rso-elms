import './styles/redirecting.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticator from './hooks/useAuthenticator';
import { getPersonExperiences } from './store/administration/experience.store';
import { getHisNextKinById } from './store/administration/usernextkin.store';
import { ProfileStatus, UserType } from './types/services/user.types';
import cookie from './utils/cookie';
import NotApproved from './views/NotApproved';

export default function Redirecting() {
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { user, userLoading } = useAuthenticator();

  const { data: nextOfKin } = getHisNextKinById(user?.id);
  const { data: experiences } = getPersonExperiences(user?.person.id);

  const history = useHistory();

  const redirectTo = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  useEffect(() => {
    const notAllowed = !Object.keys(UserType).includes(user?.user_type + '');

    if (user) {
      // setLocalStorageData('user', user?);
      localStorage.setItem('user', JSON.stringify(user));

      if (user?.profile_status !== ProfileStatus.COMPLETD) {
        redirectTo('/complete-profile');
      } else {
        if (nextOfKin && nextOfKin?.data.data.length === 0) {
          redirectTo('/complete-profile/more');
        } else if (experiences && experiences?.data.data.length === 0) {
          redirectTo('/complete-profile/experience');
        } else if (nextOfKin && experiences) {
          if (user?.user_type != UserType.SUPER_ADMIN && !user?.academy) {
            setHasNoAcademy(true);
          } else if (user.user_roles !== null && user.user_roles.length === 1) {
            cookie.setCookie('user_role', user.user_roles[0].id.toString());
          } else if (user.user_roles !== null && user.user_roles.length > 1) {
            redirectTo('/choose-role');
          } else {
            redirectTo(
              user?.user_type === UserType.INSTRUCTOR
                ? '/dashboard/inst-module'
                : user?.user_type === UserType.STUDENT
                ? '/dashboard/student'
                : '/dashboard/users',
            );
          }
        }
      }
    }

    setUserNotAllowed(notAllowed && !userLoading);
    // }, [user?, isLoading]);
  }, [
    user,
    userLoading,
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
