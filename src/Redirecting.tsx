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
  const [userNotAllowed, setUserNotAllowed] = useState(false);
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    if (data?.data.data.user_type == 'SUPER_ADMIN') redirectTo('/dashboard/users');
    else if (data?.data.data.user_type == 'ADMIN') {
      console.log(data.data.data);
      if (!data.data.data.academy) setHasNoAcademy(true);
      else redirectTo('/dashboard/programs');
    } else {
      setUserNotAllowed(true);
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

        {/* when academic admin does not have academy assigned to him */}
        {hasNoAcademy &&
          ErrorCard({
            text: 'User %% has no Academy to operate in, please contact admin',
            value: data?.data.data.user_type,
          })}

        {/* when user type is not yet supported in system */}
        {userNotAllowed &&
          ErrorCard({
            text: 'User type %% is not allowed to use this sytem, please contact Admin.',
            value: data?.data.data.user_type,
          })}

        {/* <p>User has no Academy, please contact admin to give you </p> */}
        {!hasNoAcademy && !userNotAllowed && (
          <div className="redirecing-loader full-height grid place-items-center">
            <div className="typewriter text-xl font-bold w-44">
              <h1>Redirecting....</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

interface ErrorCardProp {
  text: string;
  value: string | undefined;
}

function ErrorCard({ text, value }: ErrorCardProp) {
  const spanValue = <span className="bg-error-400 px-2 rounded">{value}</span>;

  const realError = text.split('%%');

  return (
    <div className="full-height w-full grid items-center">
      <div className="flex justify-center">
        <div className=" ">
          <div className="flex items-center px-6 py-1 rounded-lg bg-tertiary">
            <Icon name="alert" stroke="error" />
            <p>
              {' '}
              {realError[0]} {spanValue} {realError[1]}{' '}
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
  );
}
