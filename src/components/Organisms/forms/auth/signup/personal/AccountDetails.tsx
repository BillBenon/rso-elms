import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import { AccountDetail } from '../../../../../../types/services/user.types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

interface Account<E> extends CommonStepProps, CommonFormProps<E> {}

function AccountDetails<E>({
  display_label,
  prevStep,
  isVertical,
  nextStep,
  fetched_id,
  onSubmit,
}: Account<E>) {
  const [accountDetails, setAccountDetails] = useState<AccountDetail>({
    username: '',
    email: '',
    pin: '',
    password: '',
    confirm_password: '',
  });
  const handleChange = (e: ValueType) => {
    setAccountDetails({ ...accountDetails, [e.name]: e.value });
  };
  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = (e: any) => {
    e.preventDefault();
    nextStep(true);
    if (onSubmit) onSubmit(e, accountDetails);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    user.data?.data.data &&
      setAccountDetails({
        username: user.data.data.data.username,
        email: user.data.data.data.email,
        pin: user.data.data.data.pin,
        password: user.data.data.data.password,
        confirm_password: user.data.data.data.password,
      });
  }, [user.data]);

  return (
    <div className="flex flex-col gap-4">
      {!isVertical && (
        <Heading fontSize="base" fontWeight="semibold">
          {display_label}
        </Heading>
      )}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="email"
            value={accountDetails.email}
            type="email"
            placeholder="username@example.com"
            handleChange={handleChange}>
            Email
          </InputMolecule>
          <InputMolecule
            name="username"
            placeholder="username"
            value={accountDetails.username}
            handleChange={handleChange}>
            Username
          </InputMolecule>
          <InputMolecule
            name="pin"
            placeholder="Enter pin of 5 numbers"
            value={accountDetails.pin}
            handleChange={handleChange}>
            Pin
          </InputMolecule>
          <InputMolecule
            name="password"
            placeholder="password"
            type="password"
            value={accountDetails.password}
            handleChange={handleChange}>
            Password
          </InputMolecule>
          <InputMolecule
            name="confirm_password"
            placeholder="confirm password"
            type="password"
            value={accountDetails.confirm_password}
            handleChange={handleChange}>
            Confirm Password
          </InputMolecule>
        </div>
        <div className="flex justify-between w-80">
          {prevStep && (
            <Button
              styleType="text"
              hoverStyle="no-underline"
              color="txt-secondary"
              onClick={() => moveBack()}>
              Back
            </Button>
          )}
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default AccountDetails;