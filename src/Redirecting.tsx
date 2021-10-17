import './styles/redirecting.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Button from './components/Atoms/custom/Button';
import Icon from './components/Atoms/custom/Icon';
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
        {hasNoAcademy && (
          <div className="full-height w-full grid items-center">
            <div className="flex justify-center">
              <div className=" ">
                <div className="flex items-center px-6 py-1 rounded-lg bg-tertiary">
                  <Icon name="alert" stroke="error" />
                  <p>
                    User{' '}
                    <span className="bg-error-400 px-2 rounded">
                      {data?.data.data.username}
                    </span>{' '}
                    has no Academy, please contact admin
                  </p>
                </div>

                <div className="flex justify-center pt-5 pb-3">
                  <Link to="/login">
                    <Button>Go Back Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <p>User has no Academy, please contact admin to give you </p> */}
        {!hasNoAcademy && (
          <div className="redirecing-loader">
            <div className="body full-height">
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
