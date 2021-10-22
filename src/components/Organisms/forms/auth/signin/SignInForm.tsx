import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';

import { queryClient } from '../../../../../plugins/react-query';
import { authenticatorStore } from '../../../../../store';
import { ValueType } from '../../../../../types';
import { LoginInfo } from '../../../../../types';
import cookie from '../../../../../utils/cookie';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

const SignInForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = authenticatorStore.login();
  const [details, setDetails] = useState<LoginInfo>({
    username: '',
    password: '',
  });

  const redirectTo = (path: string) => {
    history.push(path);
  };

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  async function login<T>(e: FormEvent<T>) {
    setLoading(true);
    const toastId = toast.loading('Authenticating...');
    e.preventDefault();
    queryClient.clear();
    cookie.eraseCookie('jwt_info');

    await mutateAsync(details, {
      onSuccess(data) {
        setLoading(false);
        cookie.setCookie('jwt_info', JSON.stringify(data?.data.data));
        toast.success(data.data.message, { duration: 1200, id: toastId });
        redirectTo('/redirecting');
      },
      onError(error) {
        setLoading(false);
        console.log(error);
        toast.error('Authentication failed', { duration: 3000, id: toastId });
      },
    });
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
        <div className="flex flex-col gap-2">
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

        <Button disabled={loading} type="submit">
          Sign In
        </Button>
      </form>

      <div className="text-txt-secondary py-2">
        <p className="text-sm text-txt-secondary">
          Not sure you&apos;re registered?
          <span className="text-primary-500 px-2">
            {/* <Link to={`${url}/search`}>Find out</Link> */}
            <Link to={``}>Find out</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
