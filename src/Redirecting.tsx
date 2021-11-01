import './styles/redirecting.scss';

import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from './components/Atoms/custom/Button';
import Icon from './components/Atoms/custom/Icon';
import { authenticatorStore } from './store';
import { experienceStore } from './store/experience.store';
import { Response } from './types';
import { ExperienceInfo } from './types/services/experience.types';
import { PersonInfo, UserType } from './types/services/user.types';
import NotApproved from './views/NotApproved';

export default function Redirecting() {
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { data, isLoading } = authenticatorStore.authUser();
  const history = useHistory();
  let experiences: AxiosResponse<Response<ExperienceInfo[]>> | undefined;

  let person: PersonInfo | undefined = data?.data.data.person;

  ({ data: experiences } = experienceStore.getPersonExperiences(
    person?.id.toString() || '',
  ));

  useEffect(() => {
    const notAllowed =
      data?.data.data.user_type === UserType.SUPER_ADMIN ||
      data?.data.data.user_type === UserType.ADMIN ||
      data?.data.data.user_type === UserType.INSTRUCTOR
        ? false
        : true;

    if (data?.data.data.user_type === UserType.SUPER_ADMIN)
      redirectTo('/dashboard/users');
    if (experiences?.data.data) {
      if (data?.data.data.user_type === UserType.ADMIN) {
        let val = !data?.data.data.academy ? true : false;
        console.log(val);
        setHasNoAcademy(val && !isLoading);
        // if (experiences?.data.data.length === 0)
        //   redirectTo('/complete-profile/experience');
        // else redirectTo('/dashboard/divisions');
        redirectTo('/dashboard/divisions');
      } else if (data?.data.data.user_type === UserType.INSTRUCTOR) {
        redirectTo('/dashboard/view-evaluation');
      }
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

// interface ErrorCardProp {
//   text: string;
//   value: string | undefined;
// }

// function ErrorCard({ text, value }: ErrorCardProp) {
//   const spanValue = <span className="bg-error-400 px-2 rounded">{value}</span>;

//   const realError = text.split('%%');

//   return (
//     <div className="full-height w-full grid items-center">
//       <div className="flex justify-center">
//         <div className=" ">
//           <div className="flex items-center px-6 py-1 rounded-lg bg-tertiary">
//             <Icon name="alert" stroke="error" />
//             <p>
//               {' '}
//               {realError[0]} {spanValue} {realError[1]}{' '}
//             </p>
//           </div>

//           <div className="flex justify-center pt-5 pb-3">
//             <Link to="/login">
//               <Button>Go Back Home</Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
