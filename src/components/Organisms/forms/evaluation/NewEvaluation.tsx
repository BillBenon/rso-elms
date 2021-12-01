import React, { useState } from 'react';
import { useLocation } from 'react-router';

import { evaluationStore } from '../../../../store/administration/evaluation.store';
import { Link as LinkList } from '../../../../types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../utils/getLocalStorageItem';
import Heading from '../../../Atoms/Text/Heading';
import BreadCrumb from '../../../Molecules/BreadCrumb';
import Stepper from '../../../Molecules/Stepper/Stepper';
import EvaluationInfoComponent from './EvaluationInfoComponent';
import EvaluationQuestionComponent from './EvaluationQuestionComponent';
import EvaluationSettings from './EvaluationSettings';

export default function NewEvaluation() {
  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: '/dashboard/evaluations', title: 'evaluations' },
    { to: 'new', title: 'new evaluation' },
  ];

  const [currentStep, setCurrentStep] = useState(getLocalStorageData('currentStep'));
  const { search } = useLocation();
  const [evaluationId] = useState(new URLSearchParams(search).get('evaluation'));

  function handleSubmit() {
    setCurrentStep(currentStep + 1);
    setLocalStorageData('currentStep', currentStep);
  }

  function handleBack() {
    if (currentStep >= 1) setCurrentStep(currentStep - 1);
    setLocalStorageData('currentStep', currentStep);
  }

  let evaluationInfo;

  if (evaluationId) {
    evaluationInfo = evaluationStore.getEvaluationById(evaluationId).data?.data.data;
  }

  return (
    <div>
      <section>
        <BreadCrumb list={list}></BreadCrumb>
      </section>

      {/* stepper section */}

      <div className="w-full pt-9">
        <Heading fontWeight="semibold" fontSize="2xl" color="primary" className="pb-4">
          {evaluationInfo?.name || 'New evaluation'}
        </Heading>
        <Stepper
          currentStep={currentStep}
          completeStep={currentStep}
          width="w-64"
          isVertical={false}
          isInline={false}
          navigateToStepHandler={() => {}}>
          <div className="w-2/4">
            <EvaluationInfoComponent
              evaluationId={evaluationId}
              evaluationInfo={evaluationInfo}
              handleNext={handleSubmit}
              handleGoBack={handleBack}
            />
          </div>

          <div>
            <EvaluationQuestionComponent
              handleNext={handleSubmit}
              handleGoBack={handleBack}
              evaluationId={evaluationId}
            />
          </div>
          <EvaluationSettings
            handleNext={handleSubmit}
            handleGoBack={handleBack}
            evaluationId={evaluationId}
          />
        </Stepper>
      </div>
    </div>
  );
}
