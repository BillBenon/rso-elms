import React from 'react';
import Countdown from 'react-countdown';
import { useHistory } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import QuestionContainer from './QuestionContainer';
import ViewEvaluations from './ViewEvaluations';

export default function EvaluationTest() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading fontWeight="semibold">Evaluation title</Heading>
        <div className="pr-28 flex justify-center items-center gap-2">
          <Heading color="txt-secondary" fontSize="base">
            Remaining time:
          </Heading>
          <Heading>
            <Countdown date={Date.now() + 5000} renderer={Renderer} />
          </Heading>
        </div>
      </div>

      <QuestionContainer />
      <QuestionContainer />
    </div>
  );
}

// Renderer callback with condition
function Renderer({ hours, minutes, seconds, completed }: any) {
  // const history = useHistory();

  if (completed) {
    window.location.href = '/dashboard/evaluations';
  } else {
    // Render a countdown
    return (
      <Heading color="success">
        {hours}:{minutes}:{seconds}
      </Heading>
    );
  }
}
