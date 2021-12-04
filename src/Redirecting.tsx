import './styles/redirecting.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authenticatorStore } from './store/administration';
import { ProfileStatus, UserType } from './types/services/user.types';
import NotApproved from './views/NotApproved';

export default function Redirecting() {
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { data: authUser, isLoading } = authenticatorStore.authUser();
  //const { mutateAsync } = experienceStore.getAll();
  const history = useHistory();
  useEffect(() => {
    const notAllowed =
      authUser?.data.data.user_type === UserType.SUPER_ADMIN ||
      authUser?.data.data.user_type === UserType.ADMIN ||
      authUser?.data.data.user_type === UserType.INSTRUCTOR
        ? false
        : true;
    if (authUser?.data.data) {
      // setLocalStorageData('user', authUser.data.data);
      localStorage.setItem('user', JSON.stringify(authUser.data.data));

      if (authUser.data.data.user_type === UserType.SUPER_ADMIN) {
        redirectTo('/dashboard/users');
      } else if (authUser.data.data.profile_status !== ProfileStatus.COMPLETD) {
        redirectTo('/complete-profile');
        //approach number 1
        // mutateAsync().then((resp) => {
        //   let experienceFound = resp.data.data.length > 0;
        //   if (!experienceFound) redirectTo('/complete-profile/experience');
        // });
      } else if (authUser.data.data.user_type === UserType.ADMIN) {
        let val = !authUser.data.data.academy ? true : false;
        setHasNoAcademy(val && !isLoading);

        redirectTo('/dashboard/users');
      } else if (authUser.data.data.user_type === UserType.INSTRUCTOR) {
        redirectTo('/dashboard/inst-program');
      } else if (authUser.data.data.user_type === UserType.STUDENT) {
        redirectTo('/dashboard/student');
        //approach number 2
        // mutateAsync().then((resp) => {
        //   let experienceFound = false;
        //   for (const i in resp.data.data) {
        //     // @ts-ignore
        //     if (resp.data.data[i].person_id == data?.data.data.person_id) {
        //       experienceFound = true;
        //       break;
        //     }
        //   }
        //   else if (!experienceFound) redirectTo('/complete-profile/experience');
        // redirectTo('/dashboard/student');
        // });
      }
    }

    setUserNotAllowed(notAllowed && !isLoading);
  }, [authUser?.data.data, isLoading]);

  const redirectTo = (path: string) => {
    history.push(path);
  };

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
