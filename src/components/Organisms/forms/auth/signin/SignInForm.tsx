import React, { FormEvent, useState } from 'react';
// import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';

import { authenticatorStore } from '../../../../../store/authenticator.store';
import { ValueType } from '../../../../../types';
import { LoginInfo } from '../../../../../types';
import cookie from '../../../../../utils/cookie';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

const SignInForm = () => {
  const history = useHistory();
  const { mutateAsync } = authenticatorStore.login();
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

    await mutateAsync(details, {
      onSuccess(data) {
        cookie.setCookie('jwt_info', JSON.stringify(data?.data.data));
        history.push('/users');
        console.log('success data');
      },
    });
  }

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
          <Link to="/login">
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
