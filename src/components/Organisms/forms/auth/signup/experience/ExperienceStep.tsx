import React, { useEffect } from 'react';

import { experienceStore } from '../../../../../../store/experience.store';
import { CommonFormProps, CommonStepProps } from '../../../../../../types';
import { ExperienceInfo } from '../../../../../../types/services/experience.types';
import { saveData } from '../../../../../../utils/save-step';
import ExperienceForm from './ExperienceForm';

interface IExperienceStep<E> extends CommonStepProps, CommonFormProps<E> {
  experience: ExperienceInfo;
  setExperience: React.Dispatch<React.SetStateAction<ExperienceInfo>>;
}

function ExperienceStep<E>({
  experience,
  isVertical,
  setExperience,
  nextStep,
  prevStep,
  display_label,
  fetched_id,
}: IExperienceStep<E>) {
  const { mutateAsync } = experienceStore.create();

  useEffect(() => {
    setExperience({
      ...experience,
      person_id: fetched_id.toString(),
    });
  }, [fetched_id]);
  return (
    <ExperienceForm
      isVertical={isVertical}
      experience={experience}
      setExperience={setExperience}
      fetched_id={fetched_id}
      display_label={display_label}
      nextStep={nextStep}
      prevStep={prevStep}
      saveData={() => saveData(experience, mutateAsync, fetched_id)}
    />
  );
}

export default ExperienceStep;
