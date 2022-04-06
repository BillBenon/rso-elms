import moment from 'moment';
import React, { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { queryClient } from '../../../plugins/react-query';
import { evaluationService } from '../../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import {
  IEvaluationAction,
  IEvaluationQuestionsInfo,
  IEvaluationStatus,
} from '../../../types/services/evaluation.types';
import DisplayClasses from '../../../views/classes/DisplayClasses';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import MultipleChoiceAnswer from '../../../views/evaluation/MultipleChoiceAnswer';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Heading from '../../Atoms/Text/Heading';
import InputMolecule from '../../Molecules/input/InputMolecule';
import PopupMolecule from '../../Molecules/Popup';
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

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const { mutate: updateEvaluationQuestion } = evaluationStore.updateEvaluationQuestion();

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestionsByStatus(
      evaluationId,
      IEvaluationStatus.COMPLETED,
    );

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
      <Heading fontWeight="semibold" fontSize="base" className="pt-6">
        Evaluation questions
      </Heading>

      <PopupMolecule
        open={showPopup}
        title="Add private attendee"
        onClose={() => setShowPopup(false)}>
        {evaluationInfo?.private_attendees &&
        evaluationInfo?.private_attendees.length > 0 ? (
          evaluationInfo?.private_attendees.map((attendee) => (
            <p className="py-2" key={attendee.id}>
              Attendees will go here
            </p>
          ))
        ) : (
          <p className="py-2">No private attendees</p>
        )}
        <Button onClick={() => setShowPopup(false)}>Done</Button>
      </PopupMolecule>

      <div
        className={`${
          !loading && 'bg-main'
        }  px-7 pt-4 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
        {evaluationQuestions?.data.data.length ? (
          evaluationQuestions?.data.data.map((question, index: number) =>
            question && question.multiple_choice_answers.length > 0 ? (
              <div key={question.id}>
                <div className="mt-3 flex justify-between">
                  <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                    {question.question}
                  </ContentSpan>

                  <Heading fontWeight="semibold" fontSize="sm">
                    {question.mark} marks
                  </Heading>
                </div>

                {question.multiple_choice_answers.length
                  ? question.multiple_choice_answers.map((choiceAnswer) => (
                      <MultipleChoiceAnswer
                        key={choiceAnswer.id}
                        choiceId={choiceAnswer.id}
                        answer_content={choiceAnswer.answer_content}
                        correct={choiceAnswer.correct}
                      />
                    ))
                  : null}
              </div>
            ) : (
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
              </>
            ),
          )
        ) : (
          <Heading fontWeight="semibold" fontSize="sm">
            No questions attached
          </Heading>
        )}
      </div>

      {actionType && <EvaluationRemarks actionType={actionType} />}
    </div>
  );
}
