import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import CompleteProfileHeader from '../../components/Molecules/CompleteProfileHeader';
import Stepper from '../../components/Molecules/Stepper/Stepper';
import AccountDetails from '../../components/Organisms/forms/auth/signup/personal/AccountDetails';
import EmploymentDetails from '../../components/Organisms/forms/auth/signup/personal/EmploymentDetails';
import FamilyDetails from '../../components/Organisms/forms/auth/signup/personal/FamilyDetails';
import NationalDocuments from '../../components/Organisms/forms/auth/signup/personal/NationalDocument';
import PersonalDetails from '../../components/Organisms/forms/auth/signup/personal/PersonalDetails';
import usersStore from '../../store/users.store';
import { UpdateUserInfo } from '../../types/services/user.types';

function CompleteProfile(props: any) {
  const [personalInfo, setPersonalInfo] = useState<UpdateUserInfo>();

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  const { mutateAsync } = usersStore.modifyUser();

  async function saveInfo(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    if (personalInfo) {
      await mutateAsync(personalInfo, {
        onSuccess(data) {
          let personInfo = data.data.data;
          toast.success('personal information successfully updated', { duration: 1200 });
          setTimeout(() => {
            history.push({
              pathname: '/complete-profile/experience',
              state: { detail: personInfo },
            });
          }, 900);
        },
        onError() {
          toast.error('An error occurred please try again later');
        },
      });
    }
  }

  //@ts-ignore
  useEffect(() => setPersonalInfo(JSON.parse(localStorage.getItem('personalInfo'))), []);

  //@ts-ignore
  useEffect(() => localStorage.setItem('personalInfo', personalInfo), [personalInfo]);

  const nextStep = (isComplete: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const handleSubmit = (e: any, data: any) => {
    setPersonalInfo({ ...personalInfo, ...data });
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="bg-main p-8 md:px-20 md:py-14">
      <CompleteProfileHeader />
      <Stepper
        isVertical
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={navigateToStepHandler}>
        <PersonalDetails
          fetched_id={props.location.state.detail.id}
          display_label="Personal details"
          isVertical
          nextStep={nextStep}
          onSubmit={handleSubmit}
        />
        <FamilyDetails
          fetched_id={props.location.state.detail.id}
          display_label="Family details"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
          onSubmit={handleSubmit}
        />
        <NationalDocuments
          fetched_id={props.location.state.detail.id}
          display_label="National documents"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
          onSubmit={handleSubmit}
        />
        <EmploymentDetails
          fetched_id={props.location.state.detail.id}
          display_label="Employment details"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
          onSubmit={handleSubmit}
        />
        <AccountDetails
          fetched_id={props.location.state.detail.id}
          display_label="Account details"
          isVertical
          prevStep={prevStep}
          nextStep={saveInfo}
          onSubmit={handleSubmit}
        />
      </Stepper>
    </div>
  );
}

export default CompleteProfile;
