import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthenticator from '../../../hooks/useAuthenticator';
import { subjectService } from '../../../services/administration/subject.service';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../../store/instructordeployment.store';
import { EvaluationParamType, ParamType } from '../../../types';
import { ISubjects } from '../../../types/services/evaluation.types';
import Loader from '../../Atoms/custom/Loader';
import Panel from '../../Atoms/custom/Panel';
import Heading from '../../Atoms/Text/Heading';
import Accordion from '../../Molecules/Accordion';
import { TabType } from '../../Molecules/tabs/TabNavigation';
import ModuleSubjectQuestionForm from './ModuleSubjectQuestionForm';

export default function ModuleSubjectQuestion({
  showSetQuestions,
  showActions,
}: {
  showSetQuestions?: boolean;
  showActions?: boolean;
}) {
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

  const [marks, setMarks] = useState(0);

  const subjectsPanel: TabType[] = [];

  const [refetchQuestions, setrefetchQuestions] = useState(true);
  const [isLoadingSubjects, setisLoadingSubjects] = useState(true);

  useEffect(() => {
    console.log('refetch triggered');
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
        setisLoadingSubjects(false);
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

  if (isLoadingSubjects) return <Loader />;

  return (
    <Fragment>
      <Accordion>
        {subjectsPanel.map((panel) => (
          <Panel key={panel.label} title={panel.label} width="full" bgColor="main">
            <div className={`px-7 pt-4 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
              {panel.questions?.length ? (
                panel.questions?.map((question, index: number) => (
                  <ModuleSubjectQuestionForm
                    key={index}
                    {...{ showActions, question, index, setrefetchQuestions }}
                  />
                ))
              ) : (
                <Heading fontWeight="semibold" fontSize="sm">
                  No questions attached
                </Heading>
              )}
            </div>
          </Panel>
        ))}
      </Accordion>
    </Fragment>
  );
}
