import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  ExperienceInfo,
  ExperienceTypeStatus,
} from '../../../../../../types/services/experience.types';
import { UserInfo } from '../../../../../../types/services/user.types';
import CompleteProfileHeader from '../../../../../Molecules/CompleteProfileHeader';
import Stepper from '../../../../../Molecules/Stepper/Stepper';
import ExperienceStep from './ExperienceStep';

function ExperienceDetails() {
  let foundUser: UserInfo = JSON.parse(localStorage.getItem('foundUser') || '{}');

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  const [generalEducation, setGeneralEducation] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    id: 0,
    level: '',
    location: '',
    occupation: '',
    person_id: '',
    proof: '',
    start_date: '',
    type: ExperienceTypeStatus.GENERAL_EDUCATION,
  });

  const [carrierCourse, setCarrierCourse] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    id: 0,
    level: '',
    location: '',
    occupation: '',
    person_id: '',
    proof: '',
    start_date: '',
    type: ExperienceTypeStatus.CURRIER_COURSE_EDUCATION,
  });

  const [internationalCertificate, setInternationalCertificate] =
    useState<ExperienceInfo>({
      attachment_id: '',
      description: '',
      end_date: '',
      id: 0,
      level: '',
      location: '',
      occupation: '',
      person_id: '',
      proof: '',
      start_date: '',
      type: ExperienceTypeStatus.INTERNATIONAL_CERTIFICATION,
    });

  const [internationalMission, setInternationalMission] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    id: 0,
    level: '',
    location: '',
    occupation: '',
    person_id: '',
    proof: '',
    start_date: '',
    type: ExperienceTypeStatus.INTERNATIONAL_MISSION,
  });

  const [training, setTraining] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    id: 0,
    level: '',
    location: '',
    occupation: '',
    person_id: '',
    proof: '',
    start_date: '',
    type: ExperienceTypeStatus.TRAINING,
  });

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

  async function finishSteps(isComplete: boolean) {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    history.push({
      pathname: '/complete-profile/more',
      state: { detail: foundUser },
    });
  }
  return (
    <div className="bg-main p-8 md:px-20">
      <CompleteProfileHeader />
      <Stepper
        isVertical
        currentStep={currentStep}
        completeStep={completeStep}
        navigateToStepHandler={navigateToStepHandler}>
        <ExperienceStep
          isVertical
          experience={generalEducation}
          setExperience={setGeneralEducation}
          fetched_id={foundUser.person.id}
          display_label={'General Education'}
          nextStep={nextStep}
        />
        <ExperienceStep
          isVertical
          experience={carrierCourse}
          setExperience={setCarrierCourse}
          fetched_id={foundUser.person.id}
          display_label={'Carrier Course Education'}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        <ExperienceStep
          isVertical
          experience={internationalCertificate}
          setExperience={setInternationalCertificate}
          fetched_id={foundUser.person.id}
          display_label={'International Certification'}
          nextStep={nextStep}
          prevStep={prevStep}
        />
        <ExperienceStep
          isVertical
          experience={internationalMission}
          setExperience={setInternationalMission}
          fetched_id={foundUser.person.id}
          display_label={'International Mission'}
          nextStep={finishSteps}
          prevStep={prevStep}
        />
        <ExperienceStep
          isVertical
          experience={training}
          setExperience={setTraining}
          fetched_id={foundUser.person.id}
          display_label={'Training'}
          nextStep={finishSteps}
          prevStep={prevStep}
        />
      </Stepper>
    </div>
  );
}

export default ExperienceDetails;
