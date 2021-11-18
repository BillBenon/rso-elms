import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useHistory, useLocation } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import { evaluationStore } from '../../store/evaluation.store';
import QuestionContainer from './QuestionContainer';

export default function EvaluationTest() {
  const { search } = useLocation();
  const history = useHistory();
  const [time, SetTime] = useState(0);
  const evaluationId = new URLSearchParams(search).get('evaluation') || '';
  const { data: timeLimit } = evaluationStore.getEvaluationById(
    evaluationId?.toString() || '',
  );
  const { data: questions } = evaluationStore.getEvaluationQuestions(
    evaluationId.toString(),
  );
  useEffect(() => {
    timeLimit && SetTime(timeLimit?.data?.data?.time_limit * 60 * 1000);
  }, [timeLimit]);

  return (
    <div>
      <div className="flex justify-between">
        <Heading fontWeight="semibold">Evaluation title</Heading>
        <div className="pr-28 flex justify-center items-center gap-2">
          <Heading color="txt-secondary" fontSize="base">
            Remaining time:
          </Heading>
          <Heading>
            <Countdown
              key={time}
              date={Date.now() + time}
              onComplete={() => history.push('/dashboard')}
              renderer={Renderer}
            />
          </Heading>
        </div>
      </div>

      {questions && questions?.data.data.length > 0 ? (
        questions?.data.data.map((question) => (
          <QuestionContainer
            id={question.id}
            key={question.id}
            question={question.question}
            marks={question.mark}
            isMultipleChoice={question.multipleChoiceAnswers.length > 0}
          />
        ))
      ) : (
        <div className="mt-16">No questions attached</div>
      )}
    </div>
  );
}

// Renderer callback with condition
function Renderer({ hours, minutes, seconds }: any) {
  // if (completed) {
  //   window.location.href = '/dashboard/';
  // } else {
  // Render a countdown
  return (
    <span className="text-primary-600">
      {hours}:{minutes}:{seconds}
    </span>
  );
  // }
}
