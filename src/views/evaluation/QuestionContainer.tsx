import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

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
  showCorrectAnswer: boolean;
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
  const history = useHistory();

  const initialState: IStudentAnswer = {
    answer_attachment: '',
    evaluation_question: id || '',
    mark_scored: 0,
    multiple_choice_answer: '',
    open_answer: '',
    student_evaluation: getLocalStorageData('studentEvaluationId'),
  };

  const [answer, setAnswer] = useState<IStudentAnswer>(initialState);
  const [questionToSubmit, setQuestionToSubmit] = useState('');
  const [questionChoices, setChoices] = useState(choices);

  function handleChange({ name, value }: ValueType) {
    setAnswer((answer) => ({ ...answer, [name]: value }));
  }

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

  function handleChoiceSelect(choice: string, index: number) {
    let choicesClone = [...(questionChoices || [])];
    choicesClone[index].highlight = true;
    choicesClone.forEach((ch) => {
      if (ch.id !== choice) {
        ch.highlight = false;
      }
    });
    setChoices(choicesClone);

    setAnswer((answer) => ({ ...answer, ['multiple_choice_answer']: choice }));
    submitForm();
  }

  function disableCopyPaste(e: any) {
    e.preventDefault();
    return false;
  }

  function submitForm(previousValue?: string, choiceId?: string) {
    if (
      previousValue !== answer?.open_answer ||
      answer.multiple_choice_answer !== choiceId
    ) {
      mutate(answer, {
        onSuccess: () => {
          // toast.success('submitted');
          setQuestionToSubmit('');
        },
        onError: () => {
          // toast.error(error + '');
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
    <form onSubmit={submitEvaluation}>
      <div className="bg-main px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5 unselectable">
        <div className="mt-7 flex justify-between">
          <ContentSpan title={`Question ${index + 1}`} className="gap-3">
            {question || question}
          </ContentSpan>

          <Heading fontWeight="semibold" fontSize="sm">
            {marks} marks
          </Heading>
        </div>
        {isMultipleChoice && (
          <div className="flex flex-col gap-4">
            {questionChoices && questionChoices?.length > 0 ? (
              questionChoices?.map((choiceAnswer, index) => (
                <MultipleChoiceAnswer
                  key={choiceAnswer.id}
                  choiceId={choiceAnswer.id}
                  handleChoiceSelect={() => handleChoiceSelect(choiceAnswer.id, index)}
                  answer_content={choiceAnswer.answer_content}
                  highlight={
                    choiceAnswer?.id ===
                    (previousAnswers[index]?.multiple_choice_answer.id ||
                      answer?.multiple_choice_answer)
                  }
                />
              ))
            ) : (
              <TextAreaMolecule
                onPaste={(e: any) => disableCopyPaste(e)}
                onCopy={(e: any) => disableCopyPaste(e)}
                autoComplete="off"
                style={{ height: '7rem' }}
                value={previousAnswers[index]?.open_answer || answer?.open_answer}
                placeholder="Type your answer here"
                onBlur={() => submitForm(previousAnswers[index]?.open_answer)}
                name="openAnswer"
                onFocus={() => setQuestionToSubmit(id)}
                handleChange={handleChange}
              />
            )}
          </div>
        )}
        <Input value={id} name="evaluationQuestion" handleChange={handleChange} hidden />
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
