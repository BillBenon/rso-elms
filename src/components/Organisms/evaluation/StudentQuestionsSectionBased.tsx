import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { markingStore } from '../../../store/administration/marking.store';
import { IEvaluationInfo, ISubjects } from '../../../types/services/evaluation.types';
import Loader from '../../Atoms/custom/Loader';
import Panel from '../../Atoms/custom/Panel';
import Accordion from '../../Molecules/Accordion';
import { SingleQuestionSectionBased } from './../../SingleQuestionSectionBased';

export default function StudentQuestionsSectionBased({
  evaluationInfo,
}: {
  evaluationInfo: IEvaluationInfo;
  // submitForm: (answer: string) => void;
}) {
  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);

  const { id: studentEvaluationId } = useParams<{ id: string }>();

  let previoustudentAnswers =
    markingStore.getStudentEvaluationAnswers(studentEvaluationId).data?.data.data || [];

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
                  question={question}
                  key={index}
                  previousAnswer={{
                    answer_attachment: '',
                    evaluation_question: question.id,
                    mark_scored: previoustudentAnswers[index].mark_scored,
                    multiple_choice_answer:
                      previoustudentAnswers[index].multiple_choice_answer.answer_content,
                    open_answer: previoustudentAnswers[index].open_answer,
                    student_evaluation: studentEvaluationId,
                  }}
                  {...{ studentEvaluationId, index }}
                />
              ))}
          </Panel>
        ))}
      </Accordion>
    </div>
  );
}
