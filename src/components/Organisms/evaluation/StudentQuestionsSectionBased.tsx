import React, { useEffect, useState } from 'react';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { ValueType } from '../../../types';
import {
  IEvaluationInfo,
  IStudentAnswer,
  ISubjects,
} from '../../../types/services/evaluation.types';
import { StudentMarkingAnswer } from '../../../types/services/marking.types';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import Loader from '../../Atoms/custom/Loader';
import Panel from '../../Atoms/custom/Panel';
import Heading from '../../Atoms/Text/Heading';
import Accordion from '../../Molecules/Accordion';
import TextAreaMolecule from '../../Molecules/input/TextAreaMolecule';

export default function StudentQuestionsSectionBased({
  evaluationInfo,
  question,
  marks,
  previousAnswers,
  answer,
  submitForm,
  setQuestionToSubmit,
  questionId,
  handleChange,
}: {
  evaluationInfo: IEvaluationInfo;
  question: string;
  marks: number;
  questionId: string;
  previousAnswers: StudentMarkingAnswer[];
  answer: IStudentAnswer;
  submitForm: (answer: string) => void;
  setQuestionToSubmit: (id: string) => void;
  handleChange: ({ name, value }: ValueType) => void;
}) {
  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);

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
  }, [evaluationInfo.evaluation_module_subjects]);

  function disableCopyPaste(e: any) {
    e.preventDefault();
    return false;
  }

  if (isLoadingSubjects) return <Loader />;

  return (
    <div>
      <Accordion>
        {subjects.map((subject, index) => (
          <Panel title={subject.subject} key={index} width="full" bgColor="main">
            {subject.questions &&
              subject.questions.map((question, index) => (
                <div key={index}>
                  <div className=" flex justify-between">
                    <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.question,
                        }}
                        className="py-5"
                      />
                    </ContentSpan>

                    <Heading fontWeight="semibold" fontSize="sm">
                      {marks} marks
                    </Heading>
                  </div>

                  <TextAreaMolecule
                    onPaste={(e: any) => disableCopyPaste(e)}
                    onCopy={(e: any) => disableCopyPaste(e)}
                    autoComplete="off"
                    style={{ height: '7rem' }}
                    value={previousAnswers[index]?.open_answer || answer?.open_answer}
                    placeholder="Type your answer here"
                    onBlur={() => submitForm(previousAnswers[index]?.open_answer)}
                    name="open_answer"
                    onFocus={() => setQuestionToSubmit(questionId)}
                    handleChange={handleChange}
                  />
                </div>
              ))}
          </Panel>
        ))}
      </Accordion>
    </div>
  );
}
