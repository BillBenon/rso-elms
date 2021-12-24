import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import CompleteProfileHeader from '../../components/Molecules/CompleteProfileHeader';
import Stepper from '../../components/Molecules/Stepper/Stepper';
import AccountDetails from '../../components/Organisms/forms/auth/signup/personal/AccountDetails';
import EmploymentDetails from '../../components/Organisms/forms/auth/signup/personal/EmploymentDetails';
import PersonalDetails from '../../components/Organisms/forms/auth/signup/personal/PersonalDetails';
import usersStore from '../../store/administration/users.store';
import { ProfileStatus, UpdateUserInfo, UserInfo } from '../../types/services/user.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../utils/getLocalStorageItem';

function CompleteProfile() {
  const [personalInfo, setPersonalInfo] = useState({
    academic_program_level_id: '',
    academy_id: '',
    activation_key: '',
    id: '',
    intake_program_id: '',
    password_reset_period_in_days: 0,
    person_id: '',
    reset_date: '',
    profile_status: ProfileStatus.INCOMPLETE,
    residence_location_id: 0,
    user_type: '',
    doc_type: '',
    nid: '',
    phone: '',
    email: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  let foundUser: UserInfo = getLocalStorageData('user');

  if (!foundUser.id) {
    history.push('/login/search');
    return <></>;
  }
  const user = usersStore.getUserById(foundUser.id.toString());
  useEffect(() => {
    const userInfo = user.data?.data.data;
    console.log(userInfo);

    userInfo &&
      setPersonalInfo({
        academic_program_level_id: userInfo.academic_program_level_id,
        academy_id: userInfo.academy_id,
        activation_key: userInfo.activation_key,
        id: userInfo.id.toString(),
        intake_program_id: userInfo.intake_program_id,
        password_reset_period_in_days: userInfo.password_reset_period_in_days,
        person_id: userInfo.person_id,
        reset_date: userInfo.reset_date,
        profile_status:
          userInfo.profile_status == null
            ? ProfileStatus.INCOMPLETE
            : userInfo.profile_status,
        residence_location_id: userInfo.residence_location_id,
        user_type: userInfo.user_type,
        doc_type: userInfo.person ? userInfo.person.doc_type : '',
        nid: userInfo.person ? userInfo.person.nid : '',
        phone: userInfo.person ? userInfo.person.phone_number : '',
        email: userInfo.email,
      });
  }, [user.data]);

  useEffect(() => {
    let data: UpdateUserInfo = getLocalStorageData('user');
    let person = { ...personalInfo };

    Object.keys(person).map((val) => {
      //@ts-ignore
      if (!person[val]) person[val] = '';
    });

    setLocalStorageData('user', { ...data, person });
  }, [personalInfo]);

  const { mutateAsync } = usersStore.updateUser();

  async function saveInfo(isComplete: boolean) {
    let userFromLocalStorage: UpdateUserInfo = getLocalStorageData('user');
    console.log(
      {
        ...userFromLocalStorage,
        profile_status: ProfileStatus.COMPLETD,
        //@ts-ignore
        doc_type: userFromLocalStorage.doc_type,
        nid: userFromLocalStorage.person.id,
      },
      'SAVING',
    );
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    if (personalInfo) {
      console.log(userFromLocalStorage.doc_type);

      await mutateAsync(
        {
          ...userFromLocalStorage,
          profile_status: ProfileStatus.COMPLETD,
          //@ts-ignore
          doc_type: userFromLocalStorage.doc_type,
          nid: userFromLocalStorage.person.id,
        },
        {
          onSuccess() {
            toast.success('personal information successfully updated', {
              duration: 1200,
            });
            setTimeout(() => {
              localStorage.clear();
              history.push('/complete-profile/experience');
            }, 900);
          },
          onError(error: any) {
            toast.error(error.response.data.message);
          },
        },
      );
    }
  }
  const nextStep = (isComplete: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="bg-main p-8 md:px-24 md:py-14">
      <CompleteProfileHeader />
      <Stepper
        isDisabled={false}
        isVertical
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={navigateToStepHandler}>
        <PersonalDetails
          fetched_id={foundUser.id.toString()}
          display_label="Personal details"
          isVertical
          nextStep={nextStep}
        />
        <EmploymentDetails
          fetched_id={foundUser.id.toString()}
          display_label="Employment details"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
        />
        <AccountDetails
          fetched_id={foundUser.id.toString()}
          display_label="Account details"
          isVertical
          prevStep={prevStep}
          nextStep={saveInfo}
        />
      </Stepper>
    </div>
  );
}

export default CompleteProfile;
