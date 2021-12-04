import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { evaluationService } from '../../services/administration/evaluation.service';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { markingStore } from '../../store/administration/marking.store';
import { ParamType } from '../../types';
import { getLocalStorageData } from '../../utils/getLocalStorageItem';
import QuestionContainer from './QuestionContainer';

export default function EvaluationTest() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const [time, SetTime] = useState(0);
  const [studentEvaluationId, setStudentEvaluationId] = useState('');
  const [timeLimit, SetTimeLimit] = useState(0);
  const { data: evaluationData } = evaluationStore.getEvaluationById(id);
  const {
    data: questions,
    isSuccess,
    isError,
  } = evaluationStore.getEvaluationQuestions(id);

  const { mutate } = evaluationStore.submitEvaluation();

  let studentEvaluationData = markingStore.getStudentEvaluationById(studentEvaluationId);
  let studentWorkTimer = evaluationStore.getEvaluationWorkTime(studentEvaluationId);

  function autoSubmit() {
    mutate(studentEvaluationId, {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        history.push('/dashboard/student');
      },
      onError: (error) => {
        toast.error(error + '');
      },
    });
  }

  async function updateWorkTime(value: any) {
    let workTime = timeLimit * 60 * 1000 - time + (time - value.total);
    await evaluationService.updateEvaluationWorkTime({
      studentEvaluationId: studentEvaluationId,
      currentTime: (workTime / 1000).toString(),
    });
  }

  useEffect(() => {
    setStudentEvaluationId(getLocalStorageData('studentEvaluationId'));

    SetTimeLimit(evaluationData?.data?.data?.time_limit || 0);
    SetTime(
      ((evaluationData?.data?.data?.time_limit || 0) * 60 -
        studentWorkTimer?.data?.data.data) *
        1000,
    );
  }, [
    studentEvaluationData.data?.data.data.workTime,
    studentWorkTimer?.data?.data.data,
    timeLimit,
  ]);

  return (
    <div>
      <div className="flex justify-between">
        <Heading fontWeight="semibold">{evaluationData?.data.data.name}</Heading>
        <div className="pr-28 flex justify-center items-center gap-2">
          <Heading color="txt-secondary" fontSize="base">
            Remaining time:
          </Heading>
          <Heading>
            {time ? (
              <Countdown
                key={time}
                date={Date.now() + time}
                onComplete={() => autoSubmit()}
                renderer={Renderer}
                onTick={(value) => updateWorkTime(value)}
              />
            ) : null}
          </Heading>
        </div>
      </div>

      {questions && questions.data.data.length > 0 ? (
        questions?.data.data.map((question, index: number) => (
          <QuestionContainer
            showCorrectAnswer={false}
            index={index}
            id={question.id}
            key={question.id}
            isLast={questions.data.data.length - 1 === index}
            question={question.question}
            marks={question.mark}
            // previousAnswers={previousAnswers}
            choices={question.multiple_choice_answers}
            isMultipleChoice={
              question.multiple_choice_answers &&
              question.multiple_choice_answers.length > 0
            }
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
}
