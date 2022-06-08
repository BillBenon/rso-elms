import moment from 'moment';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';

import useAuthenticator from '../../../hooks/useAuthenticator';
import usersStore from '../../../store/administration/users.store';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import {
  IEvaluationAction,
  IEvaluationSettingType,
  IMarkingType,
} from '../../../types/services/evaluation.types';
import DisplayClasses from '../../../views/classes/DisplayClasses';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import Panel from '../../Atoms/custom/Panel';
import Heading from '../../Atoms/Text/Heading';
import Accordion from '../../Molecules/Accordion';
import { EvaluationChangeMarker } from './EvaluationChangeMarker';
import EvaluationContentSectionBased from './EvaluationContentSectionBased';
import EvaluationContentSubjectBased from './EvaluationContentSubjectBased';
import EvaluationRemarks from './EvaluationRemarks';

interface IProps {
  evaluationId: string;
  children: ReactNode;
  actionType: IEvaluationAction;
  showActions?: boolean;
  showSetQuestions?: boolean;
}

export default function EvaluationContent({
  evaluationId,
  children,
  actionType,
  showActions = false,
  showSetQuestions = true,
}: IProps) {
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const [classes, setclasses] = useState([' ']);

  useEffect(() => {
    setclasses(evaluationInfo?.intake_level_class_ids.split(',') || [' ']);
  }, [evaluationInfo?.intake_level_class_ids]);

  const { user } = useAuthenticator();

  const markers =
    usersStore.getUsersByAcademy(user?.academy.id.toString() || '').data?.data.data
      .content || [];

  return (
    <div>
      <div className="flex justify-between h-12">
        <div>
          <Heading fontWeight="semibold" className="pt-8">
            Evaluation information
          </Heading>
        </div>

        <div className="flex gap-4">{children}</div>
      </div>

      <div className="pt-6">
        <Accordion>
          <Panel show={false} title="">
            {/*FIXME: Don't touch this fragment
            It will break the accordion component
            Do it for your own risk*/}
            <Fragment />
          </Panel>
          <Panel width="full" bgColor="main" title={'View Evaluation details'}>
            <div className="bg-main px-7 mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3 pt-5">
              <div>
                {/* first column */}
                <div className="flex flex-col gap-4">
                  <ContentSpan title="Evaluation name">
                    {evaluationInfo?.name}
                  </ContentSpan>

                  <ContentSpan
                    title="Total number of questions"
                    subTitle={evaluationInfo?.number_of_questions}
                  />
                  <ContentSpan
                    title="Access type"
                    subTitle={evaluationInfo?.access_type}
                  />
                </div>
              </div>
              {/* second column */}
              <div className="flex flex-col gap-4">
                <ContentSpan
                  title="Evaluation type"
                  subTitle={evaluationInfo?.evaluation_type.replace('_', ' ')}
                />

                <ContentSpan
                  title="Evaluation mode"
                  subTitle={evaluationInfo?.evaluation_mode}
                />

                <ContentSpan
                  title="Time Limit"
                  subTitle={moment
                    .utc()
                    .startOf('year')
                    .add({ minutes: evaluationInfo?.time_limit })
                    .format('H [h ]mm[ mins]')}
                />
              </div>

              {/* third column */}
              <div className="flex flex-col gap-4">
                <ContentSpan
                  title="Start on"
                  subTitle={evaluationInfo?.allow_submission_time}
                />
                <ContentSpan
                  title="Questionaire type"
                  subTitle={evaluationInfo?.questionaire_type}
                />{' '}
                <ContentSpan
                  title="Total marks"
                  subTitle={evaluationInfo?.total_mark.toString()}
                />
              </div>

              {/* third column */}
              <div className="flex flex-col gap-4">
                <ContentSpan title="Due on" subTitle={evaluationInfo?.due_on} />
                <div className="flex flex-col gap-4">
                  <Heading color="txt-secondary" fontSize="base">
                    Eligible Class
                  </Heading>
                  <div className="flex gap-1">
                    {classes.map((cl, index) => (
                      <DisplayClasses
                        isLast={index === classes.length - 1}
                        classId={cl}
                        key={cl}
                      />
                    ))}
                  </div>
                </div>
                <ContentSpan
                  title="Consider on report"
                  subTitle={evaluationInfo?.is_consider_on_report ? 'Yes' : 'No'}
                />
                <ContentSpan
                  title="Strict"
                  subTitle={evaluationInfo?.strict ? 'Yes' : 'No'}
                />

                {/* will be uncommented later */}
                {/* <Button styleType="outline" onClick={() => setShowPopup(true)}>
                  View personal attendees
                </Button> */}
              </div>

              {evaluationInfo?.setting_type === IEvaluationSettingType.SECTION_BASED &&
                evaluationInfo.marking_type === IMarkingType.PER_SECTION &&
                evaluationInfo.evaluation_module_subjects.length > 1 && (
                  <section className="py-6">
                    <Heading color="primary" className="text-sm">
                      Update markers
                    </Heading>

                    <p className="py-4">
                      {evaluationInfo.evaluation_module_subjects.map((module, index) => (
                        <EvaluationChangeMarker
                          key={index}
                          module={module}
                          markers={markers}
                        />
                      ))}
                    </p>
                  </section>
                )}
            </div>
          </Panel>
        </Accordion>
      </div>

      {/* questions */}
      <div className="flex justify-between items-center py-5">
        <Heading fontWeight="semibold" fontSize="base" className="pt-6">
          Evaluation questions
        </Heading>
      </div>

      {evaluationInfo?.setting_type === IEvaluationSettingType.SECTION_BASED ? (
        <EvaluationContentSectionBased
          showActions={showActions}
          evaluation={evaluationInfo}
          showSetQuestions={showSetQuestions}
        />
      ) : evaluationInfo?.setting_type === IEvaluationSettingType.SUBJECT_BASED ? (
        <EvaluationContentSubjectBased evaluation={evaluationInfo} />
      ) : (
        <Heading>Nothing here</Heading>
      )}

      {actionType && <EvaluationRemarks actionType={actionType} />}
    </div>
  );
}
