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
  const [userNoRoles, setUserNoRoles] = useState(false);
  const { user, userLoading } = useAuthenticator();

  const { data: nextOfKin, isFetching: nextOfKinLoading } = getHisNextKinById(user?.id);
  const { data: experiences, isFetching: experiencesLoading } = getPersonExperiences(
    user?.person.id,
  );

  const history = useHistory();

  const redirectTo = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  useEffect(() => {
    if (user) {
      // setLocalStorageData('user', user?);
      localStorage.setItem('user', JSON.stringify(user));

      if (user?.profile_status !== ProfileStatus.COMPLETD) {
        redirectTo('/complete-profile');
      } else if (!nextOfKinLoading && !experiencesLoading) {
        if (nextOfKin && nextOfKin?.data.data.length === 0) {
          redirectTo('/complete-more');
        } else if (experiences && experiences?.data.data.length === 0) {
          redirectTo('/complete-experience');
        } else if (
          nextOfKin?.data.data.length !== 0 &&
          experiences?.data.data.length !== 0
        ) {
          if (user?.user_type != UserType.SUPER_ADMIN && !user?.academy) {
            setHasNoAcademy(true);
          } else if (user.user_roles !== null && user.user_roles.length === 1) {
            cookie.setCookie('user_role', user.user_roles[0].id + '');
            redirectTo(
              user?.user_type === UserType.INSTRUCTOR
                ? '/dashboard/inst-module'
                : user?.user_type === UserType.STUDENT
                ? '/dashboard/student'
                : user.user_type === UserType.ADMIN
                ? '/dashboard/admin'
                : '/dashboard/users',
            );
          } else if (user.user_roles !== null && user.user_roles.length > 1) {
            redirectTo('/choose-role');
          } else if (
            user.user_roles === null
            // && user.user_type !== UserType.SUPER_ADMIN
          ) {
            setUserNoRoles(true);
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

    // }, [user?, isLoading]);
  }, [
    user,
    userLoading,
    experiences?.data.data,
    nextOfKin?.data.data,
    experiences,
    redirectTo,
    nextOfKin,
    nextOfKinLoading,
    experiencesLoading,
  ]);

  return (
    <>
      {userNoRoles ? (
        <NotApproved />
      ) : hasNoAcademy ? (
        <NotApproved />
      ) : !hasNoAcademy ? (
        <div className="redirecing-loader full-height grid place-items-center">
          <div className="typewriter text-xl font-bold w-44">
            <h1>Redirecting....</h1>
          </div>
        </div>
      ) : null}
    </>
  );
}
