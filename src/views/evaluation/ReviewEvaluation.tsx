import React from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';
import { queryClient } from '../../plugins/react-query';
import { evaluationStore } from '../../store/evaluation/evaluation.store';

interface IProps {
  evaluationId: string;
}

export default function ReviewEvaluation({ evaluationId }: IProps) {
  const history = useHistory();
  const { mutateAsync } = evaluationStore.publishEvaluation();

  const review = () => {
    mutateAsync(
      { evaluationId, status: 'REVIEWED_TO_APPROVE' },
      {
        onSuccess: () => {
          toast.success('Marked as reviewed. Ready to be approved');
          queryClient.invalidateQueries(['evaluation']);
          history.goBack();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  };
  return (
    <EvaluationContent evaluationId={evaluationId}>
      <Button onClick={review}>Mark as reviewed</Button>
    </EvaluationContent>
  );
}
