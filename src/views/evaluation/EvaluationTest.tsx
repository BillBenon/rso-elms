import React from 'react';
import Countdown from 'react-countdown';

import Heading from '../../components/Atoms/Text/Heading';
import { evaluationStore } from '../../store/evaluation.store';
import QuestionContainer from './QuestionContainer';

export default function EvaluationTest() {
  const { data: questions } = evaluationStore.getEvaluationQuestions(
    'b22ee1a0-1da1-4fd1-a91f-011d3e384d9c',
  );

  return (
    <div>
      <div className="flex justify-between">
        <Heading fontWeight="semibold">Evaluation title</Heading>
        <div className="pr-28 flex justify-center items-center gap-2">
          <Heading color="txt-secondary" fontSize="base">
            Remaining time:
          </Heading>
          <Heading>
            <Countdown date={Date.now() + 10000000000} renderer={Renderer} />
          </Heading>
        </div>
      </div>

      {questions?.data.data.map((question) => (
        <QuestionContainer
          key={question.id}
          question={question.question}
          marks={question.mark}
          isMultipleChoice={question.multipleChoiceAnswers.length > 0}
        />
      ))}
      {/* <QuestionContainer /> */}
    </div>
  );
}

// Renderer callback with condition
function Renderer({ hours, minutes, seconds, completed }: any) {
  if (completed) {
    window.location.href = '/dashboard/student/evaluations';
  } else {
    // Render a countdown
    return (
      <Heading color="success">
        {hours}:{minutes}:{seconds}
      </Heading>
    );
  }
}
