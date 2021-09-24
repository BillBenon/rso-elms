import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ValueType } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

const SignInForm = () => {
  const history = useHistory();
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  return (
    <>
      <div className="py-11">
        <Heading fontSize="lg" className="md:2xl" fontWeight="semibold">
          Sign In
        </Heading>
        <p className="text-txt-secondary text-sm md:text-base pt-2">
          Enter your credentials to continue
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <InputMolecule
          name="username"
          placeholder="Enter your username"
          value={details.username}
          handleChange={handleChange}>
          Username
        </InputMolecule>
        <InputMolecule
          name="password"
          placeholder="Enter your password"
          value={details.password}
          handleChange={handleChange}>
          Password
        </InputMolecule>
      </div>
      <div className="flex justify-end w-80">
        <Link to="/login">
          <span className="text-sm text-primary-500">Forgot password?</span>
        </Link>
      </div>

      <Button onClick={() => history.push('/')}>Sign In</Button>

      <div className="text-txt-secondary py-2">
        <p className="text-base text-txt-secondary">
          Don&apos;t have an account?
          <span className="text-primary-500 px-2">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
