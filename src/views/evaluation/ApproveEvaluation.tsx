import React from 'react';

import Button from '../../components/Atoms/custom/Button';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';

interface IProps {
  evaluationId: string;
}

export default function ApproveEvaluation({ evaluationId }: IProps) {
  return (
    <EvaluationContent evaluationId={evaluationId}>
      <Button>Approve</Button>
    </EvaluationContent>
  );
}
