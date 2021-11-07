import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { evaluationStore } from '../../../../store/evaluation.store';
import { ValueType } from '../../../../types';
import {
  ICreateEvaluationQuestions,
  IEvaluationProps,
  IEvaluationQuestion,
  IQuestionType,
} from '../../../../types/services/evaluation.types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationQuestionComponent({
  handleGoBack,
  handleNext,
}: IEvaluationProps) {
  const initialState: ICreateEvaluationQuestions = {
    evaluation_id: JSON.parse(localStorage.getItem('evaluationId') || '{}'),
    mark: '',
    parent_question_id: '',
    question: '',
    question_type: IQuestionType.OPEN,
    sub_questions: [],
    submitted: false,
  };

  const [questions, setQuestions] = useState<ICreateEvaluationQuestions[]>([
    initialState,
  ]);

  function handleAddQuestion() {
    let newQuestion = initialState;
    setQuestions([...questions, newQuestion]);
  }

  function handleChange(index: number, { name, value }: ValueType) {
    let questionInfo = [...questions];
    questionInfo[index] = { ...questionInfo[index], [name]: value };
    setQuestions(questionInfo);
  }

  const { mutate } = evaluationStore.createEvaluationQuestions();

  function submitForm(index: number, e: FormEvent) {
    e.preventDefault();

    //first remove the button for submitted question
    let questionInfo = [...questions];
    questionInfo[index] = { ...questionInfo[index], submitted: true };
    setQuestions(questionInfo);

    mutate(questions[index], {
      onSuccess: () => {
        toast.success('Question added', { duration: 5000 });
      },
      onError: (error) => {
        console.log(error);
        toast.error(error + '');
      },
    });
  }

  return (
    <>
      {questions.map((question: IEvaluationQuestion, index: number) => (
        <>
          <div className="flex justify-between w-2/3 bg-main px-6 py-10 mt-8" key={index}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e: FormEvent) => submitForm(index, e)}>
              <DropdownMolecule
                disabled={question.submitted}
                width="64"
                name="question_type"
                placeholder="Question type"
                handleChange={() => {}}
                options={[
                  { label: 'OPEN', value: IQuestionType.OPEN },
                  { label: 'MULTIPLE CHOICE', value: IQuestionType.MULTIPLE_CHOICE },
                ]}>
                Question type
              </DropdownMolecule>

              <TextAreaMolecule
                readOnly={question.submitted}
                name={'question'}
                value={question.question}
                placeholder="Enter question"
                handleChange={(e: ValueType) => handleChange(index, e)}>
                Question {index + 1}
              </TextAreaMolecule>

              <InputMolecule
                readonly={question.submitted}
                type="number"
                name={'mark'}
                style={{ width: '6rem' }}
                value={question.mark}
                handleChange={(e: ValueType) => handleChange(index, e)}>
                Question marks
              </InputMolecule>
              <div>
                {!question.submitted ? (
                  <Button type="submit" onSubmit={(e: FormEvent) => submitForm(index, e)}>
                    save question
                  </Button>
                ) : null}
              </div>
            </form>

            <div className="pr-14">
              <div className="flex items-center">
                <Icon name="attach" size={17} fill="primary" />
                <Heading color="primary" fontSize="base">
                  Attach file
                </Heading>
              </div>
            </div>
          </div>
        </>
      ))}
      <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
        Back
      </Button>
      <div className="pt-6 flex flex-col">
        <div className="pb-6">
          <Button styleType="outline" onClick={handleAddQuestion}>
            Add question
          </Button>
        </div>

        <div>
          <Button onClick={handleNext}>save</Button>
        </div>
      </div>
    </>
  );
}
