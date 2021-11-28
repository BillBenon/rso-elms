import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { evaluationStore } from '../../../../store/administration/evaluation.store';
import { ValueType } from '../../../../types';
import {
  ICreateEvaluationQuestions,
  IEvaluationProps,
  IEvaluationQuestionsInfo,
  IQuestionType,
} from '../../../../types/services/evaluation.types';
import { getLocalStorageData } from '../../../../utils/getLocalStorageItem';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationQuestionComponent({
  handleGoBack,
  handleNext,
  evaluationId,
}: IEvaluationProps) {
  // const multipleChoiceContent: IMultipleChoice = {
  //   answer_content: '',
  //   correct: false,
  // };

  const initialState: ICreateEvaluationQuestions = {
    evaluation_id: evaluationId,
    mark: 1,
    parent_question_id: '',
    choices: [],
    id: '',
    question: '',
    question_type: IQuestionType.OPEN,
    sub_questions: [],
    submitted: false,
  };

  let evaluationQuestions: IEvaluationQuestionsInfo[] | ICreateEvaluationQuestions[] = [];
  if (evaluationId) {
    evaluationQuestions =
      evaluationStore.getEvaluationQuestions(evaluationId).data?.data.data || [];
  }

  console.log(initialState.evaluation_id);

  const [questions, setQuestions] = useState([initialState]);

  useEffect(() => {
    let allQuestions: any[] = [];
    if (evaluationQuestions.length > 0) {
      evaluationQuestions.map((question) => {
        let questionData = { ...initialState };
        questionData.choices = question.multipleChoiceAnswers || [];
        questionData.evaluation_id = question.evaluation_id;
        questionData.mark = question.mark;
        questionData.question = question.question;
        questionData.question_type = question.question_type;
        questionData.submitted = false;
        questionData.id = question.id;
        questionData.sub_questions = [];
        allQuestions.push(questionData);
      });
      setQuestions(allQuestions);
    } else {
      setQuestions([initialState]);
    }
  }, []);
  // console.log('i passed here', questions);

  function handleAddQuestion() {
    let newQuestion = initialState;
    setQuestions([...questions, newQuestion]);
  }

  //To be used after
  // function handleAddMultipleMultipleChoiceAnswer(index: number) {
  //   let choices = questions[index];
  //   choices.choices.push(multipleChoiceContent);
  //   setQuestions([...questions, choices]);
  // }

  function handleChange(index: number, { name, value }: ValueType) {
    let questionInfo = [...questions];
    questionInfo[index] = { ...questionInfo[index], [name]: value };
    setQuestions(questionInfo);
  }

  //To be used after
  // function handleChoiceChange(
  //   questionIndex: number,
  //   choiceIndex: number,
  //   { name, value }: ValueType,
  // ) {
  //   let questionsClone = [...questions];
  //   let question = questionsClone[questionIndex];

  //   let choiceToUpdate = question.choices[choiceIndex];
  //   choiceToUpdate = { ...choiceToUpdate, [name]: value };
  //   question.choices[choiceIndex] = choiceToUpdate;
  //   questionsClone[questionIndex] = question;

  //   setQuestions(questionsClone);
  // }

  const { mutate } = evaluationStore.createEvaluationQuestions();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(questions, {
      onSuccess: () => {
        toast.success('Questions added', { duration: 5000 });

        //first remove the button for submitted question
        // let questionInfo = [...questions];
        // questionInfo[index] = { ...questionInfo[index], submitted: true };
        // setQuestions(questionInfo);
        handleNext();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error + '');
      },
    });
  }

  return (
    <form className="flex flex-col" onSubmit={submitForm}>
      {questions.length > 0 ? (
        questions.map((question, index: number) => (
          <>
            <div
              className="flex justify-between w-2/3 bg-main px-6 py-10 mt-8"
              key={index}>
              <div className="flex flex-col">
                <DropdownMolecule
                  disabled={question.submitted}
                  width="64"
                  name="question_type"
                  placeholder="Question type"
                  handleChange={() => {}}
                  /*@ts-ignore*/
                  // defaultValue={evaluationQuestions[index]?.questionType || ''}
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
                {/* multiple choice answers here */}
                {/* {question.choices.map((multipleQuestion, choiceIndex) => (
                  <>
                    <TextAreaMolecule
                      key={multipleQuestion.answer_content}
                      readOnly={question.submitted}
                      name={'choices'}
                      value={multipleQuestion.answer_content}
                      placeholder="Enter question"
                      handleChange={(e: ValueType) =>
                        handleChoiceChange(index, choiceIndex, e)
                      }>
                      Answer choice {choiceIndex + 1}
                    </TextAreaMolecule>{' '}
                  </>
                ))} */}
                {/* <div className="-mt-4 mb-1">
                  <Button
                    className="flex items-center pl-0"
                    styleType="text"
                    onClick={() => handleAddMultipleMultipleChoiceAnswer(index)}>
                    <Icon
                      name="add"
                      size={17}
                      useheightandpadding={false}
                      stroke="primary"
                    />
                    <ILabel size="sm" className="cursor-pointer">
                      Add answer
                    </ILabel>
                  </Button>
                </div> */}
                <InputMolecule
                  readonly={question.submitted}
                  type="number"
                  name={'mark'}
                  min={0}
                  style={{ width: '6rem' }}
                  value={question.mark}
                  handleChange={(e: ValueType) => handleChange(index, e)}>
                  Question marks
                </InputMolecule>
                {/* <div>
                  {!question.submitted ? (
                    <Button type="submit" onSubmit={submitForm}>
                      save question
                    </Button>
                  ) : null}
                </div> */}
              </div>

              {/* <div className="pr-14">
                <div className="flex items-center">
                  <Icon name="attach" size={17} fill="primary" />
                  <Heading color="primary" fontSize="base">
                    Attach file
                  </Heading>
                </div>
              </div> */}
            </div>
          </>
        ))
      ) : (
        <Heading>No questions created for this evaluation</Heading>
      )}
      <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
        Back
      </Button>
      <div className="pt-6 flex flex-col">
        <div className="pb-6">
          <Button styleType="outline" title="test" onClick={handleAddQuestion}>
            Add question
          </Button>
        </div>

        <div>
          <Button onSubmit={submitForm}>save</Button>
        </div>
      </div>
    </form>
  );
}
