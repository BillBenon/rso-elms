import React, { FormEvent, useState } from 'react';
// import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';

import { authenticator } from '../../../../../services/authenticator';
import { ValueType } from '../../../../../types';
import { LoginInfo } from '../../../../../types/dataTypes';
import cookie from '../../../../../utils/cookie';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

const SignInForm = () => {
  const history = useHistory();
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

  async function login<T>(e: FormEvent<T>) {
    e.preventDefault();
    try {
      const res = await authenticator.login(details);
      const userData = JSON.stringify(res.data.data);
      cookie.setCookie('jwt_info', userData);
      history.push('/users');
    } catch (e) {
      console.log(e);
    }
  }

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

      <form onSubmit={login}>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="username"
            placeholder="Enter your username"
            value={details.username}
            handleChange={handleChange}>
            Username
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

        <Button type="submit">Sign In</Button>
      </form>

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
