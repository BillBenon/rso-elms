import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthenticator from '../../../hooks/useAuthenticator';
import { subjectService } from '../../../services/administration/subject.service';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../store/instructordeployment.store';
import { EvaluationParamType, ParamType } from '../../../types';
import { ISubjects } from '../../../types/services/evaluation.types';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import Button from '../../Atoms/custom/Button';
import Panel from '../../Atoms/custom/Panel';
import Heading from '../../Atoms/Text/Heading';
import Accordion from '../../Molecules/Accordion';
import PopupMolecule from '../../Molecules/Popup';
import { TabType } from '../../Molecules/tabs/TabNavigation';
import EvaluationSubjects from './EvaluationSubjects';

export default function ModuleSubjectQuestion() {
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

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestionsBySubject(evaluationId, subjectId);

  const subjectsPanel: TabType[] = [];

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
          filteredSubjects.push({
            subject: subject.data.data.title,
            id: subject.data.data.id.toString(),
          });
        }

        setSubjects(filteredSubjects);
      }
    }

    getSubjects();
  }, [evaluationId, evaluationInfo?.evaluation_module_subjects, moduleId]);

  subjects.map((subj) => {
    subjectsPanel.push({
      label: `${subj.subject}`,
      href: `/dashboard/evaluations/details/${evaluationId}/section/${moduleId}/${subj.id}`,
    });
  });

  return (
    <Accordion>
      {subjectsPanel.map((panel) => (
        <Panel key={panel.label} title={panel.label} width="full" bgColor="main">
          <div
            className={`${
              !loading && 'bg-main'
            }  px-7 pt-4 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
            {evaluationQuestions?.data.data.length ? (
              evaluationQuestions?.data.data.map(
                (question, index: number) => (
                  <Fragment key={index}>
                    <div className="mt-3 flex justify-between">
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

                      <Heading fontWeight="semibold" fontSize="sm">
                        {question.mark} marks
                      </Heading>
                    </div>

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
        </Panel>
      ))}
    </Accordion>
  );
}
