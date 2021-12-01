import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Input from '../../components/Atoms/Input/Input';
import Heading from '../../components/Atoms/Text/Heading';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { ValueType } from '../../types';
import {
  IMultipleChoiceAnswers,
  IStudentAnswer,
} from '../../types/services/evaluation.types';
import { getLocalStorageData } from '../../utils/getLocalStorageItem';
import ContentSpan from './ContentSpan';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';

interface IQuestionContainerProps {
  question: string;
  id: string;
  marks: number;
  isLast: boolean;
  index: number;
  choices?: IMultipleChoiceAnswers[];
  isMultipleChoice: boolean;
  previousAnswers: any[];
}

export default function QuestionContainer({
  question,
  id,
  isLast,
  index,
  marks,
  previousAnswers,
  choices,
  isMultipleChoice,
}: IQuestionContainerProps) {
  const { search } = useLocation();

  const initialState: IStudentAnswer = {
    answerAttachment: '',
    evaluation: new URLSearchParams(search).get('evaluation') || '',
    evaluationQuestion: '',
    markScored: 0,
    multiple_choice_answers: '',
    openAnswer: '',
    studentEvaluation: getLocalStorageData('studentEvaluationId'),
  };

  const [answer, setAnswer] = useState<IStudentAnswer>(initialState);
  const [questionToSubmit, setQuestionToSubmit] = useState('');

  function handleChange({ name, value }: ValueType) {
    setAnswer((answer) => ({ ...answer, [name]: value }));
  }

  const { mutate, error } = evaluationStore.addQuestionAnswer();
  const { mutateAsync: endEvaluation } = evaluationStore.submitEvaluation();

  function submitEvaluation() {
    endEvaluation(answer.studentEvaluation, {
      onSuccess: () => {
        toast.success('Evaluation submitted', { duration: 5000 });
        localStorage.removeItem('studentEvaluationId');

        window.location.href = '/dashboard/student';
      },
      onError: () => {
        toast.error(error + '');
      },
    });
  }

  function submitForm(previousValue?: string) {
    if (previousValue !== answer?.openAnswer) {
      mutate(answer, {
        onSuccess: () => {
          toast.success('submitted');
          setQuestionToSubmit('');
        },
        onError: (error) => {
          toast.error(error + '');
        },
      });
    }
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
  }, [questionToSubmit]);

  return (
    <form>
      <div className="bg-main px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5">
        <div className="mt-7 flex justify-between">
          <ContentSpan title={`Question ${index + 1}`} className="gap-3">
            {question || question}
          </ContentSpan>

          <Heading fontWeight="semibold" fontSize="sm">
            {marks} marks
          </Heading>
        </div>
        {/* {isMultipleChoice && (
          <div className="flex flex-col gap-4">
            {choices?.length
              ? choices.map((choiceAnswer) => (
                  <MultipleChoiceAnswer
                    key={choiceAnswer.id}
                    answer_content={choiceAnswer.answerContent}
                    correct={choiceAnswer.correct}
                  />
                ))
              : null} */}

        {/* <div className="flex">
              <div className="w-14 h-14 border-primary-500 border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
                B
              </div>
              <div className="w-80 h-14 border-primary-500 border-2 rounded-tr-md rounded-br-md flex items-center px-4">
                This is the second answer.
              </div>
            </div> */}
        {/* </div> */}
        {/* )} */}
        <Input value={id} name="evaluationQuestion" handleChange={handleChange} hidden />
        <TextAreaMolecule
          style={{ height: '7rem' }}
          value={previousAnswers[index]?.open_answer || answer?.openAnswer}
          placeholder="Type your answer here"
          onBlur={() => submitForm(previousAnswers[index]?.open_answer)}
          name="openAnswer"
          onFocus={() => setQuestionToSubmit(id)}
          handleChange={handleChange}
        />
        {/* <div className="py-7">
          <Button type="submit" onSubmit={(e: FormEvent) => submitForm(id, e)}>
            submit answer
          </Button>
        </div> */}
      </div>
      {isLast ? (
        <div className="py-7">
          <Button onClick={submitEvaluation}>End evaluation</Button>
        </div>
      ) : null}
    </form>
  );
}
