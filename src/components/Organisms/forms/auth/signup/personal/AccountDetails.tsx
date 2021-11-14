import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/administration/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import {
  AccountDetail,
  SendCommunicationMsg,
} from '../../../../../../types/services/user.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

interface Account<E> extends CommonStepProps, CommonFormProps<E> {}

function AccountDetails<E>({
  display_label,
  prevStep,
  isVertical,
  nextStep,
  fetched_id,
}: Account<E>) {
  const [accountDetails, setAccountDetails] = useState<AccountDetail>({
    username: '',
    pin: '',
    password: '',
    confirm_password: '',
    send_communication_msg: SendCommunicationMsg.EMAIL,
  });
  const handleChange = (e: ValueType) => {
    setAccountDetails({ ...accountDetails, [e.name]: e.value });
  };
  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = (e: any) => {
    e.preventDefault();
    let data: any = JSON.parse(localStorage.getItem('user') || '{}');
    let newObj = Object.assign({}, data, accountDetails);

    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    localStorage.setItem('user', JSON.stringify(newObj));
    nextStep(true);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    let personInfo = user.data?.data.data;
    personInfo &&
      setAccountDetails({
        username: personInfo.username,
        pin: personInfo.pin,
        password: personInfo.password,
        confirm_password: personInfo.password,
        send_communication_msg: personInfo.send_communication_msg,
      });
  }, [user.data?.data.data]);

  return (
    <div className="flex flex-col gap-4">
      {!isVertical && (
        <Heading fontSize="base" fontWeight="semibold">
          {display_label}
        </Heading>
      )}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            handleChange={handleChange}
            name="send_communication_msg"
            placeholder="Select way of communication"
            defaultValue={getDropDownStatusOptions(SendCommunicationMsg).find(
              (msg) => msg.value === accountDetails.send_communication_msg,
            )}
            options={getDropDownStatusOptions(SendCommunicationMsg)}>
            How would you like to be communicated?
          </DropdownMolecule>
          <InputMolecule
            name="username"
            placeholder="username"
            value={accountDetails.username}
            handleChange={handleChange}>
            Username
          </InputMolecule>
          {/* <InputMolecule
            name="pin"
            type="password"
            placeholder="Enter pin of 5 numbers"
            value={accountDetails.pin}
            handleChange={handleChange}>
            Pin
          </InputMolecule> */}
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
