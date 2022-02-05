import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import useAuthenticator from '../../../../../hooks/useAuthenticator';
import { ValueType } from '../../../../../types';
import { LoginInfo } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

const SignInForm = () => {
  const { login, isLoggingIn, logout } = useAuthenticator();
  const { url } = useRouteMatch();

  const [details, setDetails] = useState<LoginInfo>({
    username: '',
    password: '',
  });

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  useEffect(() => logout(), []);
  return (
    <>
      <div className="py-11">
        <Heading
          fontSize="lg"
          className="md:text-2xl"
          fontWeight="semibold"
          color="primary">
          Sign In
        </Heading>
        <p className="text-txt-secondary text-sm md:text-base pt-2">
          Enter your credentials to continue
        </p>
      </div>

      <form onSubmit={(e) => login(e, details)}>
        <div className="flex flex-col gap-2">
          <InputMolecule
            onCopy={(e: any) => {
              e.preventDefault();
              return false;
            }}
            name="username"
            placeholder="Enter your username"
            value={details.username}
            handleChange={handleChange}>
            Usernames
          </InputMolecule>
          <InputMolecule
            type="password"
            name="password"
            placeholder="Enter your password"
            value={details.password}
            handleChange={handleChange}>
            Password
          </InputMolecule>
        </div>
        <div className="flex justify-end w-80">
          <Link to="/">
            <span className="text-sm text-primary-500">Forgot password?</span>
          </Link>
        </div>

        <Button disabled={isLoggingIn} type="submit">
          Sign In
        </Button>
      </form>

      <div className="text-txt-secondary py-2">
        <p className="text-sm text-txt-secondary">
          Not sure you&apos;re registered?
          <span className="text-primary-500 font-bold px-2">
            <Link to={`${url}/search`}>Find out</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
