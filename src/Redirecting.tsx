import './styles/redirecting.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authenticatorStore } from './store/administration';
import { experienceStore } from './store/administration/experience.store';
import { UserType } from './types/services/user.types';
import NotApproved from './views/NotApproved';

export default function Redirecting() {
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { data, isLoading } = authenticatorStore.authUser();
  // const moreData = experienceStore.getAll();
  const { mutateAsync } = experienceStore.getAll();
  const history = useHistory();
  useEffect(() => {
    const notAllowed =
      data?.data.data.user_type === UserType.SUPER_ADMIN ||
      data?.data.data.user_type === UserType.ADMIN ||
      data?.data.data.user_type === UserType.INSTRUCTOR
        ? false
        : true;
    if (data?.data.data.user_type === UserType.SUPER_ADMIN)
      redirectTo('/dashboard/users');

    if (data?.data.data.user_type === UserType.ADMIN) {
      let val = !data?.data.data.academy ? true : false;
      setHasNoAcademy(val && !isLoading);
      redirectTo('/dashboard/users');
    } else if (data?.data.data.user_type === UserType.INSTRUCTOR) {
      mutateAsync().then((resp) => {
        let experienceFound = false;
        for (const i in resp.data.data) {
          // @ts-ignore
          if (resp.data.data[i].person_id == data?.data.data.person_id) {
            experienceFound = true;
            break;
          }
        }
        if (!experienceFound) redirectTo('/complete-profile/experience');
        else redirectTo('/dashboard/evaluations');
      });
    } else if (data?.data.data.user_type === UserType.STUDENT) {
      mutateAsync().then((resp) => {
        let experienceFound = false;
        for (const i in resp.data.data) {
          // @ts-ignore
          if (resp.data.data[i].person_id == data?.data.data.person_id) {
            experienceFound = true;
            break;
          }
        }
        if (!experienceFound) redirectTo('/complete-profile/experience');
        else redirectTo('/dashboard/modules');
      });
    }

    setUserNotAllowed(notAllowed && !isLoading);
  }, [data?.data.data, isLoading]);

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
