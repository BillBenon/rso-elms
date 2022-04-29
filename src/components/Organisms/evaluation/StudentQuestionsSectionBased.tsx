import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ParamType } from '../../../types';
import { IEvaluationInfo, ISubjects } from '../../../types/services/evaluation.types';
import Button from '../../Atoms/custom/Button';
import Loader from '../../Atoms/custom/Loader';
import Panel from '../../Atoms/custom/Panel';
import Accordion from '../../Molecules/Accordion';
import { SingleQuestionSectionBased } from './../../SingleQuestionSectionBased';

export default function StudentQuestionsSectionBased({
  evaluationInfo,
}: {
  evaluationInfo: IEvaluationInfo;
}) {
  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const history = useHistory();
  const { id: studentEvaluationId } = useParams<ParamType>();
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const { mutateAsync } = evaluationStore.submitEvaluation();

  useEffect(() => {
    let filteredSubjects: ISubjects[] = [];

    async function getSubjects() {
      if (evaluationInfo?.evaluation_module_subjects) {
        for (const subj of evaluationInfo.evaluation_module_subjects) {
          const questionsData = await evaluationService.getEvaluationQuestionsBySubject(
            evaluationInfo.id,
            subj.module_subject?.adminId.toString() + '',
          );

          filteredSubjects.push({
            subject: subj.module_subject?.title || '',
            id: subj.module_subject?.adminId || '',
            questions: questionsData.data.data,
          });
        }

        setSubjects(filteredSubjects);
        setIsLoadingSubjects(false);
      }
    }

    getSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationInfo.evaluation_module_subjects]);

  if (isLoadingSubjects) return <Loader />;

  function submitEvaluation() {
    mutateAsync(studentEvaluationId, {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        localStorage.removeItem('studentEvaluationId');
        history.push('/dashboard/student');
      },
      onError: (error) => {
        toast.error(error + '');
      },
    });
  }

  return (
    <div>
      <Accordion>
        {subjects.map((subject, index) => (
          <Panel
            title={subject.subject}
            key={index}
            width="full"
            bgColor="main"
            className="px-12 py-8">
            {subject.questions &&
              subject.questions.map((question, index) => (
                <SingleQuestionSectionBased
                  evaluation={evaluationInfo}
                  question={question}
                  key={index}
                  {...{ index }}
                />
              ))}
          </Panel>
        ))}
      </Accordion>
      <div className="py-7">
        <Button onClick={submitEvaluation}>End evaluation</Button>
      </div>
    </div>
  );
}
