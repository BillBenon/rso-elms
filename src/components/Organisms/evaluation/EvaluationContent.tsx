import moment from 'moment';
import React, { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

import { useGetInstructor } from '../../../hooks/useGetInstructor';
import { useStudents } from '../../../hooks/useStudents';
import {
  evaluationStore,
  getEvaluationFeedbacks,
} from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import {
  IAddprivateAttendee,
  IEvaluationFeedback,
} from '../../../types/services/evaluation.types';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import MultipleChoiceAnswer from '../../../views/evaluation/MultipleChoiceAnswer';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import PopupMolecule from '../../Molecules/Popup';

interface IProps {
  evaluationId: string;
  children: ReactNode;
  feedbackType: IEvaluationFeedback;
}

export default function EvaluationContent({
  evaluationId,
  children,
  feedbackType,
}: IProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [privateAttendee, setPrivateAttendee] = useState<IAddprivateAttendee>({
    evaluation: evaluationId,
    id: '',
    private_status: true,
    students: [],
  });
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const feedbacks = getEvaluationFeedbacks(evaluationId, feedbackType).data?.data
    .data || [{ id: '', remarks: '', reviewer: { adminId: '' } }];

  const { mutate } = evaluationStore.addEvaluationAttendee();

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestions(evaluationId);

  function handleChange(e: ValueType) {
    setPrivateAttendee((prev) => {
      return { ...prev, [e.name]: e.value.toString() };
    });
  }

  let classesSelect = evaluationInfo?.intake_level_class_ids
    ? evaluationInfo?.intake_level_class_ids.split(',')
    : ['2'];

  let attendees = classesSelect
    .map((classId) => {
      return useStudents(classId);
    })
    .flat();

  function addAttendee() {
    mutate(privateAttendee, {
      onSuccess: () => {
        toast.success('Succesfully added attendee(s)', { duration: 5000 });
        setShowPopup(false);
      },
      onError: (error: any) => {
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
            subTitle={evaluationInfo?.evaluation_type}
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

        {/* tjird column */}
        <div className="flex flex-col gap-4">
          <ContentSpan title="Due on" subTitle={evaluationInfo?.due_on} />
          {/* <ContentSpan
            title="Questionaire Type"
            subTitle={evaluationInfo?.number_of_questions}
          /> */}
          <ContentSpan
            title="Consider on report"
            subTitle={evaluationInfo?.is_consider_on_report ? 'Yes' : 'No'}
          />
          <Button styleType="outline" onClick={() => setShowPopup(true)}>
            Add personal attendee
          </Button>
        </div>
      </div>

      {/* questions */}
      <Heading fontWeight="semibold" fontSize="base" className="pt-6">
        Evaluation questions
      </Heading>

      {/* don't render it unless it is opened */}
      {/* {showPopup && ( */}
      <PopupMolecule
        open={showPopup}
        title="Add private attendee"
        onClose={() => setShowPopup(false)}>
        <DropdownMolecule
          handleChange={handleChange}
          name={'students'}
          options={attendees}
          isMulti>
          Students
        </DropdownMolecule>
        <Button onClick={addAttendee}>Add students</Button>
      </PopupMolecule>
      {/* )} */}

      <div
        className={`${
          !loading && 'bg-main'
        }  px-7 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
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
              <div className="mt-3 flex justify-between">
                <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                  {question.question}
                </ContentSpan>

                <Heading fontWeight="semibold" fontSize="sm">
                  {question.mark} marks
                </Heading>
              </div>
            ),
          )
        ) : (
          <Heading fontSize="sm">No questions attached</Heading>
        )}
      </div>
      <Heading fontWeight="semibold" fontSize="base" className="pt-6">
        Evaluation remarks
      </Heading>

      {feedbackType && (
        <div
          className={`${
            !loading && 'bg-main'
          }  px-7 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
          <ul>
            {feedbacks.map((feedback) => {
              let instructorInfo = useGetInstructor(feedback?.reviewer?.adminId)?.user;

              return feedback.remarks ? (
                <div className="flex flex-col gap-2 pb-4" key={feedback.id}>
                  <Heading fontSize="base" fontWeight="semibold">
                    {`${instructorInfo?.first_name} ${instructorInfo?.last_name}` || ''}
                  </Heading>
                  <Heading
                    fontSize="sm"
                    fontWeight="normal">{`=> ${feedback.remarks}`}</Heading>
                </div>
              ) : (
                <Heading fontSize="base" fontWeight="semibold">
                  No remarks found
                </Heading>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
