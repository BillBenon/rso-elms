import React, { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import toast from 'react-hot-toast';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import StudentQuestionsSectionBased from '../../components/Organisms/evaluation/StudentQuestionsSectionBased';
import useFullscreenStatus from '../../hooks/useFullscreenStatus';
import { evaluationService } from '../../services/evaluation/evaluation.service';
// import { evaluationService } from '../../services/evaluation/evaluation.service';
import { markingStore } from '../../store/administration/marking.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType } from '../../types';
import {
  IEvaluationSettingType,
  StudentEvalParamType,
} from '../../types/services/evaluation.types';
import QuestionContainer from './QuestionContainer';

export default function EvaluationTest() {
  const { evaluationId } = useParams<StudentEvalParamType>();
  const { id: studentEvaluationId } = useParams<ParamType>();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [time, SetTime] = useState(0);
  const [open, setOpen] = useState(true);
  const maximizableElement = React.useRef(null);
  const [isCheating, setIsCheating] = useState(false);
  const [timeLimit, SetTimeLimit] = useState(0);
  const [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement);
  const { data: evaluationData } = evaluationStore.getEvaluationById(evaluationId);
  const {
    data: questions,
    isSuccess,
    isError,
  } = evaluationStore.getEvaluationQuestions(evaluationId);

  const evaluationInfo = evaluationStore.getEvaluationById(evaluationId).data?.data.data;

  const [tickState, seTickState] = useState<any>('');

  const { mutate } = evaluationStore.submitEvaluation();

  let studentEvaluationData = markingStore.getStudentEvaluationById(studentEvaluationId);
  let studentWorkTimer = evaluationStore.getEvaluationWorkTime(studentEvaluationId);

  const autoSubmit = useCallback(() => {
    mutate(studentEvaluationId, {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        window.location.href = '/dashboard/student?forceReload=true';
      },
      onError: (error) => {
        toast.error(error + '');
      },
    });
  }, [mutate, studentEvaluationId]);

  useEffect(() => {
    const workTimeTimer = setInterval(async () => {
      let workTime = timeLimit * 60 * 1000 - time + (time - tickState.total);

      await evaluationService.updateEvaluationWorkTime({
        studentEvaluationId: studentEvaluationId,
        currentTime: (workTime / 1000).toString(),
      });
    }, 60000);

    return () => {
      clearInterval(workTimeTimer);
    };
  }, [studentEvaluationId, tickState.total, time, timeLimit]);

  useEffect(() => {
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
    if (
      !open &&
      isCheating &&
      path === '/dashboard/evaluations/student-evaluation/:id/:evaluationId' &&
      evaluationInfo?.strict
    ) {
      setIsCheating(true);
      autoSubmit();
    }
    const handleTabChange = () => {
      if (
        document['hidden'] &&
        path === '/dashboard/evaluations/student-evaluation/:id/:evaluationId' &&
        evaluationInfo?.strict
      ) {
        setIsCheating(true);
        autoSubmit();
      }
    };

    if (
      path === '/dashboard/evaluations/student-evaluation/:id/:evaluationId' &&
      evaluationInfo?.strict
    ) {
      // Handle page visibility change
      document.addEventListener('visibilitychange', handleTabChange, false);
    }

    return () => window.removeEventListener('visibilitychange', handleTabChange);
  }, [path, open, autoSubmit, isCheating, isFullscreen, evaluationInfo?.strict]);

  return (
    <div ref={maximizableElement} className={`${'bg-secondary p-12 overflow-y-auto'}`}>
      {evaluationInfo?.strict && (
        <PopupMolecule
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

            <div className="flex justify-between pt-3">
              <div>
                <Button onClick={() => setOpen(false)}>Enable</Button>
              </div>
            </div>
          </div>
        </PopupMolecule>
      )}
      <div className="flex justify-between py-4">
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
                onTick={(value) => seTickState(value)}
              />
            ) : null}
          </Heading>
        </div>
      </div>

      {evaluationInfo?.setting_type === IEvaluationSettingType.SECTION_BASED ? (
        <StudentQuestionsSectionBased evaluationInfo={evaluationInfo} />
      ) : evaluationInfo && questions && questions.data.data.length > 0 ? (
        questions?.data.data.map((question, index: number) => (
          <QuestionContainer
            evaluationInfo={evaluationInfo}
            showCorrectAnswer={false}
            index={index}
            id={question.id}
            key={question.id}
            isLast={questions.data.data.length - 1 === index}
            question={question}
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

      {/* :  */}
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
