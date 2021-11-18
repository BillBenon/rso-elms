import './styles/redirecting.scss';

// import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authenticatorStore } from './store';
// import { experienceStore } from './store/experience.store';
// import { Response } from './types';
// import { ExperienceInfo } from './types/services/experience.types';
import { UserType } from './types/services/user.types';
import NotApproved from './views/NotApproved';

export default function Redirecting() {
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { data, isLoading } = authenticatorStore.authUser();
  const history = useHistory();
  // let experiences: AxiosResponse<Response<ExperienceInfo[]>> | undefined;

  // let person: PersonInfo | undefined = data?.data.data.person;

  // ({ data: experiences } = experienceStore.getPersonExperiences(
  //   person?.id.toString() || '',
  // ));

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

      redirectTo('/dashboard/divisions');
    } else if (data?.data.data.user_type === UserType.INSTRUCTOR) {
      redirectTo('/dashboard/evaluations');
    } else if (data?.data.data.user_type === UserType.STUDENT) {
      redirectTo('/dashboard/student/evaluations');
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
