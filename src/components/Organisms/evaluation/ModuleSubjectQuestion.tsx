import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAuthenticator from '../../../hooks/useAuthenticator';
import { subjectService } from '../../../services/administration/subject.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../store/instructordeployment.store';
import { EvaluationParamType, ParamType } from '../../../types';
import { ISubjects } from '../../../types/services/evaluation.types';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import PopupMolecule from '../../Molecules/Popup';
import TabNavigation, { TabType } from '../../Molecules/tabs/TabNavigation';
import EvaluationSubjects from './EvaluationSubjects';

export default function ModuleSubjectQuestion() {
  const [showSubjects, setshowSubjects] = useState(false);

  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const { id: evaluationId } = useParams<ParamType>();
  const { moduleId } = useParams<EvaluationParamType>();
  const userInfo = useAuthenticator();
  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    userInfo?.user?.id + '',
  ).data?.data.data[0];
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationByIdAndInstructor(evaluationId, instructorInfo?.id + '')
      .data?.data || {};

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestions(evaluationId);
  // function updateStatus(questionId: string, status: IEvaluationStatus) {
  //   evaluationService
  //     .updateQuestionChoosen(questionId, status)
  //     .then(() => {
  //       toast.success('Successfully updated');
  //       queryClient.invalidateQueries(['evaluation/questions', evaluationId]);
  //     })
  //     .catch((error: any) => {
  //       toast.error('Failed to update', error.message);
  //     });
  // }
  const subjectTabs: TabType[] = [];

  useEffect(() => {
    // let filteredSubjects: ISubjects[] = [];

    async function getSubjects() {
      if (evaluationInfo?.evaluation_module_subjects) {
        const subjectData = await subjectService.getSubjectsByModule(moduleId);

        const filteredSubjects: ISubjects[] = subjectData.data.data.map((subject) => ({
          subject: subject.title,
          id: subject.id.toString(),
        }));

        setSubjects(filteredSubjects);
      }
    }

    getSubjects();
  }, [evaluationInfo?.evaluation_module_subjects, moduleId]);

  subjects.map((subj) => {
    subjectTabs.push({
      label: `${subj.subject}`,
      href: `/dashboard/evaluations/details/${evaluationId}/section/${moduleId}/${subj.id}`,
    });
  });

  return (
    <TabNavigation tabs={subjectTabs}>
      <div
        className={`${
          !loading && 'bg-main'
        }  px-7 pt-4 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
        {evaluationQuestions?.data.data.length ? (
          evaluationQuestions?.data.data.map(
            (question, index: number) => (
              <>
                <div className="mt-3 flex justify-between">
                  <div className="flex flex-col gap-4">
                    <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                      {question.question}
                    </ContentSpan>

                    <ContentSpan title={`Question ${index + 1} answer`} className="gap-3">
                      {question.answer}
                    </ContentSpan>
                  </div>

                  <Heading fontWeight="semibold" fontSize="sm">
                    {question.mark} marks
                  </Heading>
                </div>
                {/* <div className="self-end flex gap-4">
                  <button
                    className={
                      question?.choosen_question === IEvaluationStatus.ACCEPTED
                        ? 'right-button'
                        : 'normal-button'
                    }
                    onClick={() => updateStatus(question.id, IEvaluationStatus.ACCEPTED)}>
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
                    onClick={() => updateStatus(question.id, IEvaluationStatus.REJECTED)}>
                    <Icon
                      name={'cross'}
                      size={18}
                      fill={
                        question?.choosen_question === IEvaluationStatus.PENDING ||
                        question?.choosen_question === IEvaluationStatus.ACCEPTED
                          ? 'none'
                          : 'main'
                      }
                      // fill={'none'}
                    />
                  </button>
                </div> */}

                {/* <>
          <div>
            <Button styleType="outline" onClick={() => setshowSubjects(true)}>
              Set questions
            </Button>
          </div>

          <PopupMolecule
            onClose={() => setshowSubjects(false)}
            open={showSubjects}
            title="Select subject to add questions">
            <EvaluationSubjects
              evaluationId={evaluationId}
              action="add_questions"
            />
          </PopupMolecule>
        </> */}
              </>
            ),
            // ),
          )
        ) : (
          <Heading fontWeight="semibold" fontSize="sm">
            No questions attached
          </Heading>
        )}
      </div>

      <div className="py-4">
        <div>
          <Button styleType="outline" onClick={() => setshowSubjects(true)}>
            Set questions
          </Button>
        </div>

        <PopupMolecule
          onClose={() => setshowSubjects(false)}
          open={showSubjects}
          title="Select subject to add questions">
          <EvaluationSubjects evaluationId={evaluationId} action="add_questions" />
        </PopupMolecule>
      </div>
    </TabNavigation>
  );
}
