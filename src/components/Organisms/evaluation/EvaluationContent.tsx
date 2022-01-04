import moment from 'moment';
import React, { ReactNode } from 'react';

import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import MultipleChoiceAnswer from '../../../views/evaluation/MultipleChoiceAnswer';
import Heading from '../../Atoms/Text/Heading';

interface IProps {
  evaluationId: string;
  children: ReactNode;
}

export default function EvaluationContent({ evaluationId, children }: IProps) {
  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestions(evaluationId);

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

            <div className="flex flex-col gap-4">
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
            </div>
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

        {/* tjird column */}
        <div className="flex flex-col gap-4">
          <ContentSpan
            title="Due on"
            subTitle={moment(evaluationInfo?.due_on).format('MM/DD/YYYY')}
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
          <ContentSpan
            title="Total number of questions"
            subTitle={evaluationInfo?.number_of_questions}
          />
          <ContentSpan
            title="Consider on report"
            subTitle={evaluationInfo?.is_consider_on_report ? 'Yes' : 'No'}
          />{' '}
          <ContentSpan title="Access type" subTitle={evaluationInfo?.access_type} />
        </div>
      </div>

      {/* questions */}
      <Heading fontWeight="semibold" fontSize="base" className="pt-6">
        Evaluation questions
      </Heading>

      <div
        className={`${
          !loading && 'bg-main'
        }  px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5`}>
        {evaluationQuestions?.data.data.length ? (
          evaluationQuestions?.data.data.map((question, index: number) =>
            question && question.multiple_choice_answers.length > 0 ? (
              <>
                <div className="mt-3 flex justify-between" key={question.id}>
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
              </>
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
        ) : evaluationQuestions?.data.data.length === 0 ? (
          <Heading>No questions attached</Heading>
        ) : null}
      </div>
    </div>
  );
}
