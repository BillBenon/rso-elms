import React from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';
import { ParamType } from '../../types';

export default function AddEvaluationQuestions() {
  const { id: evaluationId } = useParams<ParamType>();

  return (
    <EvaluationContent evaluationId={evaluationId} actionType="section_based">
      <Button styleType="outline">Finish setting</Button>
      <Button>Save as template</Button>
    </EvaluationContent>
  );
}
