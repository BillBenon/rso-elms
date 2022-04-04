import moment from 'moment';
import React, { ReactNode, useEffect, useState } from 'react';

import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { IEvaluationAction } from '../../../types/services/evaluation.types';
import DisplayClasses from '../../../views/classes/DisplayClasses';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import MultipleChoiceAnswer from '../../../views/evaluation/MultipleChoiceAnswer';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import PopupMolecule from '../../Molecules/Popup';
import EvaluationRemarks from './EvaluationRemarks';
import EvaluationSubjects from './EvaluationSubjects';

interface IProps {
  evaluationId: string;
  children: ReactNode;
  actionType: IEvaluationAction;
}

export default function EvaluationContent({
  evaluationId,
  children,
  actionType,
}: IProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showSubjects, setshowSubjects] = useState(false);

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestions(evaluationId);

  const [classes, setclasses] = useState([' ']);

  useEffect(() => {
    setclasses(evaluationInfo?.intake_level_class_ids.split(',') || [' ']);
  }, [evaluationInfo?.intake_level_class_ids]);

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
                <div className="mt-3 w-full flex justify-between">
                  <div className="flex flex-col  gap-4">
                    <ContentSpan title={`Question ${index + 1}`} className="gap-3">
                      {question.question}
                    </ContentSpan>

                    <ContentSpan title={`Question ${index + 1} answer`} className="gap-3">
                      {question.answer}
                    </ContentSpan>
                  </div>

                  <div className="w-20">
                    <Heading fontWeight="semibold" fontSize="sm">
                      {question.mark} marks
                    </Heading>
                  </div>
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
              </>
            ),
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

      {actionType && <EvaluationRemarks actionType={actionType} />}
    </div>
  );
}
