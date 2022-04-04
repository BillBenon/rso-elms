import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { subjectService } from '../../../services/administration/subject.service';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import { IEvaluationStatus } from '../../../types/services/evaluation.types';
import { SubjectInfo } from '../../../types/services/subject.types';
import { getDropDownOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import SelectMolecule from '../../Molecules/input/SelectMolecule';

type IEvaluationSubjectsProps = { evaluationId: string; action: string };

export default function EvaluationSubjects({
  evaluationId,
  action,
}: IEvaluationSubjectsProps) {
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};
  const history = useHistory();

  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    let filteredInfo: SubjectInfo[] = [];

    async function get() {
      if (evaluationInfo?.evaluation_module_subjects) {
        //   alert('we fetched');
        for (let [index, subj] of evaluationInfo.evaluation_module_subjects.entries()) {
          // request one
          const subjectData = await subjectService.getSubject(
            subj.subject_academic_year_period.toString(),
          );

          let temp = {
            id: '',
            subject: '',
            section: '',
            instructor: '',
            status: IEvaluationStatus.ACCEPTED,
          };
          temp.subject = subjectData.data.data.title;
          temp.section = `section ${index + 1}`;
          temp.status = subj.questionaire_setting_status;
          temp.id = subj.id;
          //@ts-ignore
          filteredInfo.push(temp);
        }

        setSubjects(filteredInfo);
        setIsloading(false);
      }
    }
    get();
    setIsloading(false);
  }, [evaluationInfo?.evaluation_module_subjects]);

  function handleChange(e: ValueType) {
    setSubjectId(
      evaluationInfo?.evaluation_module_subjects.find(
        (mod) => mod.subject_academic_year_period === e.value.toString(),
      )?.id || '',
    );
  }

  function handleAction() {
    if (action === 'finish_setting') {
      console.log('calling the right api');
      evaluationService
        .updateEvaluationModuleSubject(subjectId, IEvaluationStatus.COMPLETED)
        .then(() => {
          toast.success('Marked setting status to completed');
          history.goBack();
        })
        .catch((err) => {
          toast.error(err);
        });
    } else if (action === 'add_questions') {
      history.push(
        `/dashboard/evaluations/details/${evaluationId}/section/${subjectId}/add-questions`,
      );
    } else {
      console.log('calling else');
      return;
    }
  }

  return (
    <>
      <SelectMolecule
        handleChange={handleChange}
        loading={isLoading}
        name="subjectId"
        placeholder="select subject"
        options={getDropDownOptions({ inputs: subjects, labelName: ['title'] })}>
        Select subject
      </SelectMolecule>

      <div className="py-6">
        {/* <Link
          to={`/dashboard/evaluations/details/${evaluationId}/section/${subjectId}/add-questions`}> */}
        <Button onClick={handleAction} disabled={subjectId == ''}>
          Continue
        </Button>
        {/* </Link> */}
      </div>
    </>
  );
}
