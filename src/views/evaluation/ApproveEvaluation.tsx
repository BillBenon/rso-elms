import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import EvaluationContent from '../../components/Organisms/evaluation/EvaluationContent';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { ValueType } from '../../types';
import {
  IEvaluationOwnership,
  UpdateEvaluationApprovalStatusEnum,
} from '../../types/services/evaluation.types';

interface IProps {
  evaluationId: string;
}

export default function ApproveEvaluation({ evaluationId }: IProps) {
  const history = useHistory();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data[0];
  const evaluationApprovals =
    evaluationStore.getEvaluationApprovalByEvaluationAndInstructor(
      evaluationId,
      instructorInfo?.id + '',
    ).data?.data.data;

  const [remarks, setRemarks] = useState('');
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('');

  const { mutateAsync } = evaluationStore.approveEvaluation();

  const approve = () => {
    setOpen(true);
    let udpateEvaluationStatus = {
      evaluation_id: evaluationId,
      evaluation_approval_status:
        action === 'approve'
          ? UpdateEvaluationApprovalStatusEnum.APPROVED
          : UpdateEvaluationApprovalStatusEnum.REJECTED,
      instructor_id: instructorInfo?.id + '',
      remarks: remarks,
    };

    // if ((remarks && action === 'reject') || (action === 'approve' && !remarks)) {
    mutateAsync(udpateEvaluationStatus, {
      onSuccess: () => {
        toast.success('Feedback is recorded');
        queryClient.invalidateQueries([
          'evaluations',
          instructorInfo?.id,
          IEvaluationOwnership.FOR_APPROVING,
        ]);
        history.goBack();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
    // } else toast.error('A remark is needed when rejecting!');
  };

  function changeAction(action: string) {
    setOpen(true);
    setAction(action);
  }

  function closePopup() {
    setOpen(false);
    setRemarks('');
  }

  return (
    <>
      <EvaluationContent evaluationId={evaluationId}>
        <Button
          disabled={evaluationApprovals?.evaluation_approval_status + '' !== 'PENDING'}
          onClick={() => changeAction('approve')}>
          Mark as approved
        </Button>
        <Button
          disabled={evaluationApprovals?.evaluation_approval_status + '' !== 'PENDING'}
          styleType="outline"
          onClick={() => changeAction('reject')}>
          Mark as rejected
        </Button>
      </EvaluationContent>

      <PopupMolecule open={open} title="Evaluation Feedback" onClose={closePopup}>
        <TextAreaMolecule
          required
          name="remarks"
          value={remarks}
          handleChange={(e: ValueType) => setRemarks(e.value + '')}>
          Remarks {action === 'approve' && '(Optional)'}
          <div></div>
        </TextAreaMolecule>
        <Button onClick={approve}>Save</Button>
      </PopupMolecule>
    </>
  );
}
