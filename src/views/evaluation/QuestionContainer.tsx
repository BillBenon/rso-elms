import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Input from '../../components/Atoms/Input/Input';
import Heading from '../../components/Atoms/Text/Heading';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { ValueType } from '../../types';
import { IStudentAnswer } from '../../types/services/evaluation.types';
import ContentSpan from './ContentSpan';

interface IQuestionContainerProps {
  question: string;
  id: string;
  marks: number;
  choices?: [];
  isMultipleChoice: boolean;
}

export default function QuestionContainer({
  question,
  id,
  marks,
  // choices,
  isMultipleChoice,
}: IQuestionContainerProps) {
  const { search } = useLocation();

  const initialState: IStudentAnswer = {
    answerAttachment: '',
    evaluation: new URLSearchParams(search).get('evaluation') || '',
    evaluationQuestion: '',
    markScored: 0,
    multipleChoiceAnswer: '',
    openAnswer: '',
    studentEvaluation: 'fc7bfa35-ce72-4a04-acda-7df1768a817f',
  };

  const [answer, setAnswer] = useState<IStudentAnswer>(initialState);

  function handleChange({ name, value }: ValueType) {
    setAnswer((answer) => ({ ...answer, [name]: value }));
  }

  const { mutateAsync } = evaluationStore.addQuestionAnswer();

  function submitForm(id: string, e: FormEvent) {
    e.preventDefault();
    setAnswer((answer) => ({ ...answer, evaluationQuestion: id }));

    mutateAsync(answer, {
      onSuccess: () => {
        toast.success('Question added', { duration: 5000 });

        //first remove the button for submitted question
        let buttonToRemove = document.getElementById(id);
        buttonToRemove?.remove();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error + '');
      },
    });
  }

  return (
    <form onSubmit={(e) => submitForm(id, e)}>
      <div className="bg-main px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5" id={id}>
        <div className="mt-7 flex justify-between">
          <ContentSpan title="Question 1" className="gap-3">
            {question}
          </ContentSpan>

          <Heading fontWeight="semibold" fontSize="sm">
            {marks} marks
          </Heading>
        </div>
        {isMultipleChoice && (
          <div className="flex flex-col gap-4">
            <div className="flex">
              <div className="w-14 h-14 bg-lightblue text-primary-500 border-primary-500 border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
                A
              </div>
              <div className="w-80 h-14 bg-lightblue text-primary-500 border-primary-500 border-2 rounded-tr-md rounded-br-md flex items-center px-4">
                This is the first answer
              </div>
            </div>
            <div className="flex">
              <div className="w-14 h-14 border-primary-500 border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
                B
              </div>
              <div className="w-80 h-14 border-primary-500 border-2 rounded-tr-md rounded-br-md flex items-center px-4">
                This is the second answer.
              </div>
            </div>
          </div>
        )}
        <Input value={id} name="evaluationQuestion" handleChange={handleChange} hidden />
        <TextAreaMolecule
          style={{ height: '7rem' }}
          value={answer.openAnswer}
          placeholder="Type your answer here"
          name="openAnswer"
          handleChange={handleChange}
        />
        <div className="py-7">
          <Button type="submit" onSubmit={(e: FormEvent) => submitForm(id, e)}>
            submit answer
          </Button>
        </div>
      </div>
    </form>
  );
}
