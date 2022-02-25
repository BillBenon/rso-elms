import React from 'react';

import { CommonFormProps, CommonStepProps } from '../../../../../../types';
import NextOfKinDetails from './NextOfKinDetails';

interface INextOfKinStep<E> extends CommonStepProps, CommonFormProps<E> {
  skip?: () => void;
}

function NextOfKinStep<E>({
  isVertical,
  nextStep,
  prevStep,
  display_label,
  type,
}: INextOfKinStep<E>) {
  return (
    <NextOfKinDetails
      type={type}
      isVertical={isVertical}
      display_label={display_label}
      nextStep={nextStep}
      prevStep={prevStep}
      fetched_id={''}
    />
  );
}

export default NextOfKinStep;
