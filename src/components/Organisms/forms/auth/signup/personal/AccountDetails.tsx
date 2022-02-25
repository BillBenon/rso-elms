import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import usersStore from '../../../../../../store/administration/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import {
  AccountDetail,
  SendCommunicationMsg,
} from '../../../../../../types/services/user.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../../../utils/getLocalStorageItem';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import PopupMolecule from '../../../../../Molecules/Popup';
import UpdatePassword from './UpdatePassword';

interface Account<E> extends CommonStepProps, CommonFormProps<E> {}

function AccountDetails<E>({
  display_label,
  prevStep,
  isVertical,
  nextStep,
  fetched_id,
}: Account<E>) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const [accountDetails, setAccountDetails] = useState<AccountDetail>({
    username: '',
    pin: 0,
    // password: '',
    // doc_type: '',
    // confirm_password: '',
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
    let data: any = getLocalStorageData('user');
    let newObj = Object.assign({}, data, accountDetails);

    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    setLocalStorageData('user', newObj);
    nextStep(true);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    let personInfo = user.data?.data.data;

    personInfo &&
      setAccountDetails({
        username: personInfo.username,
        pin: personInfo.pin,
        // password: personInfo.password,
        // confirm_password: personInfo.password,
        // doc_type: personInfo.person ? personInfo.person.doc_type : '',
        send_communication_msg: personInfo.send_communication_msg,
      });
  }, [user.data?.data.data]);

  function submited() {}
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
          <Link to={`${url}/update-password`}>
            <Button>Update Password</Button>
          </Link>
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
      <Switch>
        {/* update password */}
        <Route
          exact
          path={`${path}/update-password`}
          render={() => {
            return (
              <PopupMolecule title="Update Password" open={true} onClose={history.goBack}>
                <UpdatePassword onSubmit={submited} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default AccountDetails;
