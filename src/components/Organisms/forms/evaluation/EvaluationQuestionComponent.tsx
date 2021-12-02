import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { evaluationStore } from '../../../../store/administration/evaluation.store';
import { SelectData, ValueType } from '../../../../types';
import {
  ICreateEvaluationQuestions,
  IEvaluationProps,
  IEvaluationQuestionsInfo,
  IMultipleChoice,
  IQuestionType,
} from '../../../../types/services/evaluation.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../../../utils/getLocalStorageItem';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationQuestionComponent({
  handleGoBack,
  handleNext,
  evaluationId,
}: IEvaluationProps) {
  const multipleChoiceContent: IMultipleChoice = {
    answer_content: '',
    correct: false,
  };

  const initialState: ICreateEvaluationQuestions = {
    evaluation_id: evaluationId || getLocalStorageData('evaluationId'),
    mark: 0,
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

  const [questions, setQuestions] = useState([initialState]);

  useEffect(() => {
    let allQuestions: any[] = [];
    if (evaluationQuestions?.length > 0) {
      evaluationQuestions.forEach((question) => {
        console.log(question.question_type);

        let questionData = { ...initialState };
        //@ts-ignore
        questionData.choices = question.multiple_choice_answers || [];
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

  function handleAddQuestion() {
    let newQuestion = initialState;
    let questionsClone = [...questions];
    questionsClone.push(newQuestion);
    setQuestions(questionsClone);
  }

  //To be used after
  function handleAddMultipleMultipleChoiceAnswer(index: number) {
    let questionsClone = [...questions];
    let questionChoices = questionsClone[index];
    questionChoices.choices.push(multipleChoiceContent);
    setQuestions(questionsClone);
  }

  function handleChange(index: number, { name, value }: ValueType) {
    let questionInfo = [...questions];
    questionInfo[index] = { ...questionInfo[index], [name]: value };
    setQuestions(questionInfo);
  }

  function handleCorrectAnswerCahnge(index: number, e: ValueType) {
    let questionsClone = [...questions];
    const question = questionsClone[index];
    let choiceIndex = question.choices.findIndex(
      (choice) => choice.answer_content === e.value,
    );
    question.choices.forEach((choice) => (choice.correct = false));
    question.choices[choiceIndex].correct = true;

    setQuestions(questionsClone);
  }

  function handleChoiceChange(questionIndex: number, choiceIndex: number, e: ValueType) {
    let questionsClone = [...questions];
    let question = questionsClone[questionIndex];

    let choiceToUpdate = question.choices[choiceIndex];
    choiceToUpdate = { ...choiceToUpdate, [e.name]: e.value };
    question.choices[choiceIndex] = choiceToUpdate;

    questionsClone[questionIndex] = question;

    setQuestions(questionsClone);
  }

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
        setLocalStorageData('currentStep', 2);
        handleNext();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <form className="flex flex-col" onSubmit={submitForm}>
      {questions.length ? (
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
                  placeholder={question.question_type || 'Question type'}
                  handleChange={(e: ValueType) => handleChange(index, e)}
                  /*@ts-ignore*/
                  // defaultValue={evaluationQuestions[index]?.question_type || ''}
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
                {question.choices.map((multipleQuestion, choiceIndex) => (
                  <>
                    <TextAreaMolecule
                      key={choiceIndex}
                      readOnly={question.submitted}
                      name={'answer_content'}
                      //@ts-ignore
                      value={multipleQuestion.answerContent}
                      placeholder="Enter answer"
                      handleChange={(e: ValueType) =>
                        handleChoiceChange(index, choiceIndex, e)
                      }>
                      Answer choice {choiceIndex + 1}
                    </TextAreaMolecule>{' '}
                  </>
                ))}

                {question.choices.length ? (
                  <DropdownMolecule
                    key={
                      question?.choices[index]?.answer_content +
                        Math.floor(Math.random() * 300) || index
                    }
                    disabled={question.submitted}
                    width="64"
                    name=""
                    placeholder="Choose correct answer"
                    handleChange={(e: ValueType) => handleCorrectAnswerCahnge(index, e)}
                    /*@ts-ignore*/
                    // defaultValue={evaluationQuestions[index]?.question_type || ''}
                    options={
                      question.choices.map((ch) => ({
                        label: ch.answer_content,
                        value: ch.answer_content,
                      })) as SelectData[]
                    }>
                    Correct answer
                  </DropdownMolecule>
                ) : null}

                {question.question_type === IQuestionType.MULTIPLE_CHOICE ? (
                  <div className="-mt-4 mb-1">
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
                        Add choice
                      </ILabel>
                    </Button>
                  </div>
                ) : null}

                <InputMolecule
                  readonly={question.submitted}
                  type="number"
                  // step=".01"
                  name={'mark'}
                  min={1}
                  style={{ width: '6rem' }}
                  value={question.mark || 0}
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
