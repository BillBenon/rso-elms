import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Input from '../../components/Atoms/Input/Input';
import Heading from '../../components/Atoms/Text/Heading';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import StudentQuestionsSectionBased from '../../components/Organisms/evaluation/StudentQuestionsSectionBased';
import { markingStore } from '../../store/administration/marking.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ValueType } from '../../types';
import {
  IEvaluationInfo,
  IEvaluationSettingType,
  IMultipleChoiceAnswers,
  IStudentAnswer,
} from '../../types/services/evaluation.types';
import { StudentMarkingAnswer } from '../../types/services/marking.types';
import { getLocalStorageData } from '../../utils/getLocalStorageItem';
import ContentSpan from './ContentSpan';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';

interface IQuestionContainerProps {
  question: string;
  id: string;
  marks: number;
  isLast: boolean;
  index: number;
  showCorrectAnswer: boolean;
  choices?: IMultipleChoiceAnswers[];
  isMultipleChoice: boolean;
  evaluationInfo: IEvaluationInfo;
}

export default function QuestionContainer({
  question,
  id,
  isLast,
  index,
  marks,
  choices,
  isMultipleChoice,
  evaluationInfo,
}: IQuestionContainerProps) {
  const history = useHistory();

  const [studentEvaluationId, setStudentEvaluationId] = useState('');
  const [previousAnswers, setPreviousAnswers] = useState<StudentMarkingAnswer[]>([]);
  let previoustudentAnswers =
    markingStore.getStudentEvaluationAnswers(studentEvaluationId);

  useEffect(() => {
    setPreviousAnswers(previoustudentAnswers.data?.data.data || []);
  }, [previoustudentAnswers.data?.data.data]);

  const initialState: IStudentAnswer = useMemo(() => {
    return {
      answer_attachment: '',
      evaluation_question: id || '',
      mark_scored: 0,
      multiple_choice_answer:
        (previousAnswers[index]?.multiple_choice_answer &&
          previousAnswers[index]?.multiple_choice_answer.id) ||
        '',
      open_answer: '',
      student_evaluation: getLocalStorageData('studentEvaluationId'),
    };
  }, [id, index, previousAnswers]);

  const [questionToSubmit, setQuestionToSubmit] = useState('');
  const [questionChoices, setChoices] = useState(choices);
  const [answer, setAnswer] = useState(initialState);

  const { mutate } = evaluationStore.addQuestionAnswer();
  const { mutateAsync } = evaluationStore.submitEvaluation();

  function submitEvaluation(e: FormEvent) {
    e?.preventDefault();
    mutateAsync(answer.student_evaluation, {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        localStorage.removeItem('studentEvaluationId');
        history.push('/dashboard/student');
      },
      onError: (error) => {
        toast.error(error + '');
      },
    });
  }

  useEffect(() => {
    setStudentEvaluationId(getLocalStorageData('studentEvaluationId'));
    setAnswer(initialState);
    if (previousAnswers[index]?.multiple_choice_answer) {
      setAnswer((answer) => ({
        ...answer,
        ['multiple_choice_answer']: previousAnswers[index]?.multiple_choice_answer.id,
      }));
    }
  }, [index, initialState, previousAnswers]);

  function disableCopyPaste(e: any) {
    e.preventDefault();
    return false;
  }

  function handleChange({ name, value }: ValueType) {
    setAnswer((answer) => ({ ...answer, [name]: value }));
  }

  const submitForm = useCallback(
    (previousValue?: string, choiceId?: string) => {
      if (
        previousValue !== answer?.open_answer ||
        answer.multiple_choice_answer !== choiceId
      ) {
        mutate(answer, {
          onSuccess: () => {
            // toast.success('submitted');
            setQuestionToSubmit('');
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        });
      }
    },
    [answer, mutate],
  );

  function handleChoiceSelect(choiceId: string, index: number) {
    let choicesClone = [...(questionChoices || [])];
    choicesClone[index].highlight = true;
    choicesClone.forEach((ch) => {
      if (ch.id !== choiceId) {
        ch.highlight = false;
      }
    });

    setChoices(choicesClone);

    let choosenAnswer = { ...initialState };
    choosenAnswer.multiple_choice_answer = choiceId;

    setAnswer(choosenAnswer);
    mutate(choosenAnswer, {
      onSuccess: () => {
        setQuestionToSubmit('');
      },
    });
  }

  useEffect(() => {
    if (question !== '') {
      const interval = setInterval(() => {
        if (questionToSubmit) submitForm();
      }, 30000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [question, questionToSubmit, submitForm]);

  return (
    <form onSubmit={submitEvaluation}>
      <div
        className={`bg-main px-16 flex flex-col gap-4 mt-8 w-12/12 border border-primary-400  unselectable ${
          evaluationInfo?.setting_type === IEvaluationSettingType.SUBJECT_BASED
        } ? 'pt - 5 pb - 5' : ''`}>
        {evaluationInfo?.setting_type === IEvaluationSettingType.SUBJECT_BASED && (
          <div className="mt-7 flex justify-between">
            <ContentSpan title={`Question ${index + 1}`} className="gap-3">
              {question || question}
            </ContentSpan>

            <Heading fontWeight="semibold" fontSize="sm">
              {marks} marks
            </Heading>
          </div>
        )}
        {isMultipleChoice ? (
          <div className="flex flex-col gap-4">
            {questionChoices && questionChoices?.length > 0
              ? questionChoices?.map((choiceAnswer, choiceIndex) => (
                  <MultipleChoiceAnswer
                    key={choiceAnswer.id}
                    choiceId={choiceAnswer.id}
                    handleChoiceSelect={() =>
                      handleChoiceSelect(choiceAnswer.id, choiceIndex)
                    }
                    answer_content={choiceAnswer.answer_content}
                    highlight={answer.multiple_choice_answer === choiceAnswer.id}
                  />
                ))
              : null}
          </div>
        ) : evaluationInfo?.setting_type === IEvaluationSettingType.SECTION_BASED ? (
          <StudentQuestionsSectionBased
            // submitForm={submitForm}
            // setQuestionToSubmit={setQuestionToSubmit}
            // handleChange={handleChange}
            {...{ evaluationInfo }}
          />
        ) : (
          <TextAreaMolecule
            onPaste={(e: any) => disableCopyPaste(e)}
            onCopy={(e: any) => disableCopyPaste(e)}
            autoComplete="off"
            style={{ height: '7rem' }}
            value={previousAnswers[index]?.open_answer || answer?.open_answer}
            placeholder="Type your answer here"
            onBlur={() => submitForm(previousAnswers[index]?.open_answer)}
            name="open_answer"
            onFocus={() => setQuestionToSubmit(id)}
            handleChange={handleChange}
          />
        )}
        <Input value={id} name="evaluation_question" handleChange={handleChange} hidden />
        {/* <div className="py-7">
          <Button type="submit" onSubmit={(e: FormEvent) => submitForm(id, e)}>
            submit answer
          </Button>
        </div> */}
      </div>
      {isLast ? (
        <div className="py-7">
          <Button type="submit">End evaluation</Button>
        </div>
      ) : null}
    </form>
  );
}
