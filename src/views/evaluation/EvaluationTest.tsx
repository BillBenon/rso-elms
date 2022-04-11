import React, { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { evaluationService } from '../../services/evaluation/evaluation.service';
import { markingStore } from '../../store/administration/marking.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType } from '../../types';
import { getLocalStorageData } from '../../utils/getLocalStorageItem';
import QuestionContainer from './QuestionContainer';

export default function EvaluationTest() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [time, SetTime] = useState(0);
  const [open, setOpen] = useState(true);
  const maximizableElement = React.useRef(null);
  const [studentEvaluationId, setStudentEvaluationId] = useState('');
  const [, setIsCheating] = useState(false);
  const [timeLimit, SetTimeLimit] = useState(0);
  // const [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement);
  const { data: evaluationData } = evaluationStore.getEvaluationById(id);
  const {
    data: questions,
    isSuccess,
    isError,
  } = evaluationStore.getEvaluationQuestions(id);

  const evaluationInfo = evaluationStore.getEvaluationById(id).data?.data.data;

  const { mutate } = evaluationStore.submitEvaluation();

  let studentEvaluationData = markingStore.getStudentEvaluationById(studentEvaluationId);
  let studentWorkTimer = evaluationStore.getEvaluationWorkTime(studentEvaluationId);

  const autoSubmit = useCallback(() => {
    mutate(studentEvaluationId, {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        history.push({ pathname: '/dashboard/student', search: '?forceReload=true' });
      },
      onError: (error) => {
        toast.error(error + '');
      },
    });
  }, [history, mutate, studentEvaluationId]);

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
    evaluationData?.data?.data?.time_limit,
    studentEvaluationData?.data?.data.data,
    studentWorkTimer?.data?.data.data,
    timeLimit,
  ]);

  useEffect(() => {
    if (!open && path === '/dashboard/evaluations/student-evaluation/:id') {
      setIsCheating(true);
      autoSubmit();
    }
    const handleTabChange = () => {
      if (
        document['hidden'] &&
        path === '/dashboard/evaluations/student-evaluation/:id'
      ) {
        setIsCheating(true);
        autoSubmit();
      }
    };

    if (path === '/dashboard/evaluations/student-evaluation/:id') {
      // Handle page visibility change
      document.addEventListener('visibilitychange', handleTabChange, false);
    }

    return () => window.removeEventListener('visibilitychange', handleTabChange);
  }, [path, open, autoSubmit]);

  return (
    <div ref={maximizableElement} className={`${'bg-secondary p-12 overflow-y-auto'}`}>
      {/* <PopupMolecule
        closeOnClickOutSide={false}
        open={open}
        title="Do you want to continue?"
        onClose={setIsFullscreen as () => void}>
        <div>
          <Heading fontWeight="semibold">Enable Full screen</Heading>
          <p className="course-card-description leading-5 pb-6 w-96 text-txt-secondary text-sm mt-4">
            You are about to attempt this evaluation test.Full screeen should be enabled
            to avoid cheating. If you disable it or change tabs/desktop then you&apos;ll
            get zero
          </p>

          <div className="flex justify-between">
            <div>
              <Button onClick={() => setOpen(false)}>Enable</Button>
            </div>
          </div>
        </div>
      </PopupMolecule> */}
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

      {evaluationInfo && questions && questions.data.data.length > 0 ? (
        questions?.data.data.map((question, index: number) => (
          <QuestionContainer
            evaluationInfo={evaluationInfo}
            showCorrectAnswer={false}
            index={index}
            id={question.id}
            key={question.id}
            isLast={questions.data.data.length - 1 === index}
            question={question.question}
            marks={question.mark}
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
