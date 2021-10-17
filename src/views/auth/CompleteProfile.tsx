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

function CompleteProfile(props: any) {
  const [personalInfo, setPersonalInfo] = useState({
    academic_program_level_id: '',
    academy_id: '',
    activation_key: '',
    id: '',
    intake_program_id: '',
    next_of_keen_proculation_reason: '',
    password_reset_period_in_days: 0,
    person_id: '',
    relationship_with_next_of_ken: '',
    reset_date: '',
    residence_location_id: 0,
    user_type: '',
  });

  const user = usersStore.getUserById(props.location.state.detail.id.toString());
  useEffect(() => {
    const userInfo = user.data?.data.data;
    userInfo &&
      setPersonalInfo({
        academic_program_level_id: userInfo.academic_program_level_id,
        academy_id: userInfo.academy_id,
        activation_key: userInfo.activation_key,

        id: userInfo.id.toString(),
        intake_program_id: userInfo.intake_program_id,
        next_of_keen_proculation_reason: userInfo.next_of_keen_proculation_reason,
        password_reset_period_in_days: userInfo.password_reset_period_in_days,
        person_id: userInfo.person_id,
        relationship_with_next_of_ken: userInfo.relationship_with_next_of_ken,
        reset_date: userInfo.reset_date,
        residence_location_id: userInfo.residence_location_id,
        user_type: userInfo.user_type,
      });
  }, [user.data]);

  useEffect(() => {
    let data: any = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...data, ...personalInfo }));
  }, [personalInfo]);

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  const { mutateAsync } = usersStore.modifyUser();

  async function saveInfo(isComplete: boolean) {
    let userFromLocalStorage: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    if (personalInfo) {
      console.log('we go: ', userFromLocalStorage);
      await mutateAsync(userFromLocalStorage, {
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
        />
        <FamilyDetails
          fetched_id={props.location.state.detail.id}
          display_label="Family details"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
        />
        <NationalDocuments
          fetched_id={props.location.state.detail.id}
          display_label="National documents"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
        />
        <EmploymentDetails
          fetched_id={props.location.state.detail.id}
          display_label="Employment details"
          isVertical
          prevStep={prevStep}
          nextStep={nextStep}
        />
        <AccountDetails
          fetched_id={props.location.state.detail.id}
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
