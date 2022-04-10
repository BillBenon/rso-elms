import React, { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAuthenticator from '../../../hooks/useAuthenticator';
import { subjectService } from '../../../services/administration/subject.service';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../store/instructordeployment.store';
import { EvaluationParamType, ParamType, ValueType } from '../../../types';
import {
  IEvaluationQuestionsInfo,
  IEvaluationStatus,
  ISubjects,
} from '../../../types/services/evaluation.types';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Panel from '../../Atoms/custom/Panel';
import Heading from '../../Atoms/Text/Heading';
import Accordion from '../../Molecules/Accordion';
import InputMolecule from '../../Molecules/input/InputMolecule';
import PopupMolecule from '../../Molecules/Popup';
import { TabType } from '../../Molecules/tabs/TabNavigation';
import EvaluationSubjects from './EvaluationSubjects';

export default function ModuleSubjectQuestion({
  showSetQuestions,
  showActions,
}: {
  showSetQuestions?: boolean;
  showActions?: boolean;
}) {
  const [showSubjects, setshowSubjects] = useState(false);

  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const { id: evaluationId } = useParams<ParamType>();
  const { moduleId } = useParams<EvaluationParamType>();
  const { subjectId } = useParams<EvaluationParamType>();

  const userInfo = useAuthenticator();
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    userInfo?.user?.id + '',
  ).data?.data.data[0];
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationByIdAndInstructor(evaluationId, instructorInfo?.id + '')
      .data?.data || {};

  const [marks, setMarks] = useState(0);
  const { mutate: updateEvaluationQuestion } = evaluationStore.updateEvaluationQuestion();

  const subjectsPanel: TabType[] = [];

  const [refetchQuestions, setrefetchQuestions] = useState(true);

  useEffect(() => {
    let filteredSubjects: ISubjects[] = [];

    async function getSubjects() {
      if (evaluationInfo?.evaluation_module_subjects) {
        const subjectData = await evaluationService.getEvaluationModuleSubjectsByModule(
          evaluationId,
          moduleId,
        );

        for (const subj of subjectData.data.data) {
          const subject = await subjectService.getSubject(
            subj.subject_academic_year_period.toString(),
          );

          const questionsData = await evaluationService.getEvaluationQuestionsBySubject(
            evaluationId,
            subject.data.data.id.toString(),
          );

          filteredSubjects.push({
            subject: subject.data.data.title,
            id: subject.data.data.id.toString(),
            questions: questionsData.data.data,
          });
        }

        setSubjects(filteredSubjects);
        setrefetchQuestions(false);
      }
    }

    getSubjects();
  }, [
    evaluationId,
    evaluationInfo?.evaluation_module_subjects,
    moduleId,
    refetchQuestions,
  ]);

  subjects.map((subj) => {
    subjectsPanel.push({
      label: `${subj.subject}`,
      questions: subj.questions,
      href: `/dashboard/evaluations/details/${evaluationId}/section/${moduleId}/${subj.id}`,
    });
  });

  function updateStatus(questionId: string, status: IEvaluationStatus) {
    evaluationService
      .updateQuestionChoosen(questionId, status)
      .then(() => {
        toast.success('Successfully updated');
        setrefetchQuestions(true);
      })
      .catch((error: any) => {
        toast.error('Failed to update', error.message);
      });
  }

  function updateMarks({ value }: ValueType) {
    setMarks(parseInt('' + value));
  }

  function saveUpdate(question: IEvaluationQuestionsInfo) {
    // FIXME: Check if backend has been fixed
    const data = {
      ...question,
      mark: marks,
    };

    updateEvaluationQuestion(data, {
      onSuccess() {
        toast.success('marks updated');
      },
      onError(error: any) {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <Accordion>
      {subjectsPanel.map((panel) => (
        <Panel key={panel.label} title={panel.label} width="full" bgColor="main">
          <div className={`px-7 pt-4 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
            {panel.questions?.length ? (
              panel.questions?.map(
                (question, index: number) => (
                  <Fragment key={index}>
                    <div className="mt-3 flex justify-between divide-y">
                      <div className="flex flex-col gap-4">
                        <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                          {question.question}
                        </ContentSpan>

                        <ContentSpan
                          title={`Question ${index + 1} answer`}
                          className="gap-3">
                          {question.answer}
                        </ContentSpan>
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <InputMolecule
                          value={question.mark}
                          name={'marks'}
                          style={{ width: '4rem', height: '2.5rem' }}
                          handleChange={updateMarks}
                        />
                        <Heading fontWeight="semibold" fontSize="sm">
                          {question.mark === 1 ? 'mark' : 'marks'}
                        </Heading>
                      </div>
                    </div>

                    {showActions && (
                      <div className="self-end flex gap-4">
                        <button
                          className={
                            question?.choosen_question === IEvaluationStatus.ACCEPTED
                              ? 'right-button'
                              : 'normal-button'
                          }
                          onClick={() =>
                            updateStatus(question.id, IEvaluationStatus.ACCEPTED)
                          }>
                          <Icon
                            name={'tick'}
                            size={18}
                            stroke={
                              question?.choosen_question === IEvaluationStatus.PENDING ||
                              question?.choosen_question === IEvaluationStatus.REJECTED
                                ? 'none'
                                : 'main'
                            }
                            fill={'none'}
                          />
                        </button>

                        <button
                          className={
                            question?.choosen_question === IEvaluationStatus.REJECTED
                              ? 'wrong-button'
                              : 'normal-button'
                          }
                          onClick={() =>
                            updateStatus(question.id, IEvaluationStatus.REJECTED)
                          }>
                          <Icon
                            name={'cross'}
                            size={18}
                            fill={
                              question?.choosen_question === IEvaluationStatus.PENDING ||
                              question?.choosen_question === IEvaluationStatus.ACCEPTED
                                ? 'none'
                                : 'main'
                            }
                          />
                        </button>

                        <Button onClick={() => saveUpdate(question)}>update marks</Button>
                      </div>
                    )}
                  </Fragment>
                ),
                // ),
              )
            ) : (
              <Heading fontWeight="semibold" fontSize="sm">
                No questions attached
              </Heading>
            )}
          </div>

          {showSetQuestions && (
            <div className="py-4">
              <div>
                <Button styleType="outline" onClick={() => setshowSubjects(true)}>
                  Set questions
                </Button>
              </div>

              <PopupMolecule
                closeOnClickOutSide={false}
                onClose={() => setshowSubjects(false)}
                open={showSubjects}
                title="Select subject to add questions">
                <EvaluationSubjects evaluationId={evaluationId} action="add_questions" />
              </PopupMolecule>
            </div>
          )}
        </Panel>
      ))}
    </Accordion>
  );
}
