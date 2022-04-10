import React from 'react';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { IEvaluationInfo } from '../../../types/services/evaluation.types';
import ContentSpan from '../../../views/evaluation/ContentSpan';
import MultipleChoiceAnswer from '../../../views/evaluation/MultipleChoiceAnswer';
import Heading from '../../Atoms/Text/Heading';

interface IProps {
  evaluation: IEvaluationInfo;
}

export default function SubjectBasedEvaluationContent({ evaluation }: IProps) {
  const { data: evaluationQuestions, isLoading: loading } =
    evaluationStore.getEvaluationQuestions(evaluation.id);

  return (
    <div>
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
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.question,
                        }}
                      />
                    </ContentSpan>

                    <ContentSpan title={`Question ${index + 1} answer`} className="gap-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: question.answer,
                        }}
                      />
                    </ContentSpan>
                  </div>

                  <div className="w-20">
                    <Heading fontWeight="semibold" fontSize="sm">
                      {question.mark} marks
                    </Heading>
                  </div>
                </div>
              </>
            ),
          )
        ) : (
          <Heading fontWeight="semibold" fontSize="sm">
            No questions attached
          </Heading>
        )}
      </div>
    </div>
  );
}