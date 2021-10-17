import './styles/redirecting.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { authenticatorStore } from './store';

export default function Redirecting() {
  const history = useHistory();
  const [hasNoAcademy, setHasNoAcademy] = useState(false);
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    if (data?.data.data.user_type == 'SUPER_ADMIN') redirectTo('/dashboard/users');
    if (data?.data.data.user_type == 'ADMIN') {
      console.log(data.data.data);
      if (!data.data.data.academy) setHasNoAcademy(true);
      // redirectTo('/dashboard/programs');
    }
  }, [data?.data.data]);

  const redirectTo = (path: string) => {
    history.push(path);
  };
  return (
    <>
      <div>
        {/* <p>User has no Academy, please contact admin to give you </p> */}
        {!hasNoAcademy && (
          <div className="redirecing-loader">
            <div className="body">
              <span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div className="base">
                <span></span>
                <div className="face"></div>
              </div>
            </div>
            <div className="longfazers">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="text-xl">Redirecting</h1>
          </div>
        )}
      </div>
    </>
  );
}
