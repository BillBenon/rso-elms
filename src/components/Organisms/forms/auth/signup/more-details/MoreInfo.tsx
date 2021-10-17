import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import Stepper from '../../../../../Molecules/Stepper/Stepper';
import KinAddressDetails from './KinAddressDetails';
import NextOfKinDetails from './NextOfKinDetails';

function MoreInfo(props: any) {
  const [moreInfo, setMoreInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: 'male',
    relationship: '',
    country: '',
    location: '',
    other_location: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  const nextStep = (isComplete?: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  //@ts-ignore
  useEffect(() => setMoreInfo(JSON.parse(localStorage.getItem('moreInfo'))), []);

  //@ts-ignore
  useEffect(() => localStorage.setItem('moreInfo', moreInfo), [moreInfo]);

  async function saveInfo() {
    if (moreInfo) {
      // await mutateAsync(moreInfo, {
      //   onSuccess() {
      //     let personInfo = props.location.state.detail;
      //     toast.success('these information have been successfully updated', {
      //       duration: 1200,
      //     });
      //     setTimeout(() => {
      //       history.push({
      //         pathname: '/complete-profile/other',
      //         state: { detail: personInfo },
      //       });
      //     }, 900);
      //   },
      //   onError() {
      //     toast.error('An error occurred please try again later');
      //   },
      // });
      history.push('/complete-profile/other');
    }
  }
  const handleSubmit = (e: any, data: any) => {
    setMoreInfo({ ...moreInfo, ...data });
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
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={navigateToStepHandler}>
        <NextOfKinDetails
          fetched_id={props.location.state.detail.person_id}
          display_label="Next of kin details"
          onSubmit={handleSubmit}
          nextStep={nextStep}
        />
        <KinAddressDetails
          fetched_id={props.location.state.detail.person_id}
          display_label="Next of kin address details"
          onSubmit={handleSubmit}
          prevStep={prevStep}
          nextStep={saveInfo}
        />
      </Stepper>
    </div>
  );
}

export default MoreInfo;
