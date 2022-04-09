import moment from 'moment';
import React, { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { queryClient } from '../../../plugins/react-query';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import {
  IEvaluationAction,
  IEvaluationQuestionsInfo,
  IEvaluationSettingType,
  IEvaluationStatus,
} from '../../../types/services/evaluation.types';
import DisplayClasses from '../../../views/classes/DisplayClasses';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import Heading from '../../Atoms/Text/Heading';
import EvaluationContentSectionBased from './EvaluationContentSectionBased';
import EvaluationContentSubjectBased from './EvaluationContentSubjectBased';
import EvaluationRemarks from './EvaluationRemarks';

interface IProps {
  evaluationId: string;
  children: ReactNode;
  actionType: IEvaluationAction;
  showActions?: boolean;
}

export default function EvaluationContent({
  evaluationId,
  children,
  actionType,
  showActions = false,
}: IProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [marks, setMarks] = useState(0);
  const history = useHistory();

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const { mutate: updateEvaluationQuestion } = evaluationStore.updateEvaluationQuestion();

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestions(evaluationId);

  const [classes, setclasses] = useState([' ']);

  useEffect(() => {
    setclasses(evaluationInfo?.intake_level_class_ids.split(',') || [' ']);
  }, [evaluationInfo?.intake_level_class_ids]);

  function updateStatus(questionId: string, status: IEvaluationStatus) {
    evaluationService
      .updateQuestionChoosen(questionId, status)
      .then(() => {
        toast.success('Successfully updated');
        queryClient.invalidateQueries(['evaluation/questionsbystatus', evaluationId]);
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
    <div>
      <div className="flex justify-between h-12">
        <div>
          <Heading fontWeight="semibold" className="pt-8">
            Evaluation information
          </Heading>
        </div>

        <div className="flex gap-4">{children}</div>
      </div>
      <div className="bg-main px-7 mt-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-3 pt-5">
        <div>
          {/* first column */}
          <div className="flex flex-col gap-4">
            <ContentSpan title="Evaluation name">{evaluationInfo?.name}</ContentSpan>

            <ContentSpan
              title="Total number of questions"
              subTitle={evaluationInfo?.number_of_questions}
            />
            <ContentSpan title="Access type" subTitle={evaluationInfo?.access_type} />

            {/* <div className="flex flex-col gap-4">
              <Heading color="txt-secondary" fontSize="base">
                Eligible Class
              </Heading>
              <div className="flex flex-col gap-2">
                <div className="flex gap-9">
                  <div>class A</div>
                  <div>class B</div>
                </div>

                <div className="flex gap-9">
                  <div>class A</div>
                  <div>class B</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* second column */}
        <div className="flex flex-col gap-4">
          <ContentSpan
            title="Evaluation type"
            subTitle={evaluationInfo?.evaluation_type.replace('_', ' ')}
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
          {/* <Button styleType="outline" onClick={() => setShowPopup(true)}>
            View personal attendees
          </Button> */}
        </div>
      </div>

      {/* questions */}
      <div className="flex justify-between items-center py-5">
        <Heading fontWeight="semibold" fontSize="base" className="pt-6">
          Evaluation questions
        </Heading>
      </div>

      {evaluationInfo?.setting_type === IEvaluationSettingType.SECTION_BASED ? (
        <EvaluationContentSectionBased evaluation={evaluationInfo} />
      ) : evaluationInfo?.setting_type === IEvaluationSettingType.SUBJECT_BASED ? (
        <EvaluationContentSubjectBased evaluation={evaluationInfo} />
      ) : (
        <Heading>Nothing here</Heading>
      )}

      {actionType && <EvaluationRemarks actionType={actionType} />}
    </div>
  );
}
