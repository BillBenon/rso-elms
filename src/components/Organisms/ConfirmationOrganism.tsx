import React from 'react';
import toast from 'react-hot-toast';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { authenticatorStore } from '../../store/administration/authenticator.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType } from '../../types';
import {
  IEvaluationStatus,
  IStudentEvaluationStart,
} from '../../types/services/evaluation.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
import Button from '../Atoms/custom/Button';
import Heading from '../Atoms/Text/Heading';
import PopupMolecule from '../Molecules/Popup';

interface IConfirmationProps {
  onConfirmationClose: () => void;
}

export default function ConfirmationOrganism({
  onConfirmationClose,
}: IConfirmationProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;

  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { search } = useLocation();

  const evaluation = evaluationStore.getEvaluationById(id).data?.data.data;
  const studentEval = new URLSearchParams(search).get('studentEval');

  const { mutate, isLoading } = evaluationStore.studentEvaluationStart();

  function goToNext(id: string) {
    history.push(`/dashboard/evaluations/student-evaluation/${id}`);
  }

  function generateStudentCode() {
    const studentEvaluationStart: IStudentEvaluationStart = {
      attachment: '',
      evaluation_id: id,
      student_id: authUser?.id.toString() || '',
    };

    if (studentEval) {
      setLocalStorageData('studentEvaluationId', studentEval);
      toast.success('Recovered evaluation code', { duration: 5000 });
      goToNext(studentEvaluationStart.evaluation_id);
    } else {
      mutate(studentEvaluationStart, {
        onSuccess: (studentInfo) => {
          setLocalStorageData('studentEvaluationId', studentInfo.data.data.id);
          toast.success('Generated evaluation code', { duration: 5000 });
          goToNext(studentEvaluationStart.evaluation_id);
        },
        onError: () => {
          toast.error("The evaluation isn't already started!");
        },
      });
    }
  }
  return (
    <PopupMolecule
      closeOnClickOutSide={false}
      open
      title="Do you want to continue?"
      onClose={onConfirmationClose}>
      <div>
        <Heading fontWeight="semibold">{evaluation?.name || ''}</Heading>
        <p className="course-card-description leading-5 pb-6 w-96 text-txt-secondary text-sm mt-4">
          You are about to attempt this {evaluation?.name || ''} test. Are you sure you
          want to do it now ? This action is irreversible.
        </p>

        <div className="flex justify-starg">
          <Button disabled={isLoading} onClick={generateStudentCode}>
            <span className="font-semibold">
              {evaluation?.evaluation_status == IEvaluationStatus.ON_GOING
                ? 'Continue evaluation'
                : 'Start Evaluation'}{' '}
            </span>
          </Button>
        </div>
      </div>
    </PopupMolecule>
  );
}
