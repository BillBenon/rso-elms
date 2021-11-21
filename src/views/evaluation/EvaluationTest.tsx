import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import { useHistory, useLocation } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { getLocalStorageData } from '../../utils/getLocalStorageItem';
import QuestionContainer from './QuestionContainer';

export default function EvaluationTest() {
  const { search } = useLocation();
  const history = useHistory();
  const [time, SetTime] = useState(0);
  const evaluationId = new URLSearchParams(search).get('evaluation') || '';
  const { data: timeLimit } = evaluationStore.getEvaluationById(
    evaluationId?.toString() || '',
  );
  const {
    data: questions,
    isSuccess,
    isError,
  } = evaluationStore.getEvaluationQuestions(evaluationId.toString());
  useEffect(() => {
    timeLimit && SetTime(timeLimit?.data?.data?.time_limit * 60 * 1000);
  }, [timeLimit]);

  const { mutate } = evaluationStore.submitEvaluation();

  function autoSubmit() {
    mutate(getLocalStorageData('studentEvaluationId'), {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        history.push('/dashboard/modules');
      },
      onError: (error) => {
        toast.error(error + '');
      },
    });
  }

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
              onComplete={autoSubmit}
              renderer={Renderer}
            />
          </Heading>
        </div>
      </div>

      {questions && questions?.data.data.length > 0 ? (
        questions?.data.data.map((question, index: number) => (
          <QuestionContainer
            id={question.id}
            key={question.id}
            isLast={questions.data.data.length - 1 === index}
            question={question.question}
            marks={question.mark}
            isMultipleChoice={question.multipleChoiceAnswers.length > 0}
          />
        ))
      ) : questions?.data.data.length === 0 && isSuccess ? (
        <NoDataAvailable
          icon="faculty"
          buttonLabel="Go back"
          title="No questions attached"
          handleClick={() => history.goBack()}
          description="No questions available for this evaluation at the moment. Come back later!"
        />
      ) : questions?.data.data.length === 0 && isError ? (
        <NoDataAvailable
          icon="faculty"
          buttonLabel="Go back"
          title="No questions attached"
          handleClick={() => history.goBack()}
          description="Something went wrong while loading evaluation questions!"
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

function Renderer({ hours, minutes, seconds }: any) {
  // Render a countdown
  return (
    <span className="text-primary-600">
      {hours}:{minutes}:{seconds}
    </span>
  );
  // }
}
