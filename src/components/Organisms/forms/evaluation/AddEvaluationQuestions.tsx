import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { queryClient } from '../../../../plugins/react-query';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import { ParamType, SelectData, ValueType } from '../../../../types';
import {
  ICreateEvaluationQuestions,
  IEvaluationProps,
  IEvaluationQuestionsInfo,
  IMultipleChoice,
  IQuestionType
} from '../../../../types/services/evaluation.types';
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData
} from '../../../../utils/getLocalStorageItem';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';


const multipleChoiceContent: IMultipleChoice = {
  answer_content: '',
  correct: false,
  id: '',
};

export default function AdddEvaluationQuestions({
  handleGoBack,
  evaluationId,
}: IEvaluationProps) {
  const { id: subjectId } = useParams<ParamType>();
  const initialState: ICreateEvaluationQuestions = useMemo(() => {
    return {
      evaluation_id: evaluationId || '',
      mark: 0,
      parent_question_id: '',
      choices: [],
      id: '',
      question: '',
      question_type: IQuestionType.OPEN,
      sub_questions: [],
      submitted: false,
      answer: '',
      evaluation_module_subject_id: subjectId || '',
    };
  }, [evaluationId, subjectId]);

  let evaluationQuestions: IEvaluationQuestionsInfo[] | ICreateEvaluationQuestions[] =
    useMemo(() => {
      return getLocalStorageData('evaluationQuestions') || [];
    }, []);

    evaluationQuestions =
      evaluationStore.getEvaluationQuestions(evaluationId || "").data?.data.data || [];

  const [questions, setQuestions] = useState([initialState]);

  useEffect(() => {
    let allQuestions: any[] = [];
    if (evaluationQuestions?.length > 0) {
      console.log('inside if')
      evaluationQuestions.forEach((question) => {
        let questionData = { ...initialState };
        questionData.choices = question.multiple_choice_answers || [];
        questionData.evaluation_id = question.evaluation_id;
        questionData.mark = question.mark;
        questionData.question = question.question;
        questionData.answer = question.answer;
        questionData.question_type = question.question_type;
        questionData.submitted = false;
        questionData.id = question.id;
        questionData.sub_questions = [];
        allQuestions.push(questionData);
      });
      setQuestions(allQuestions);
      setLocalStorageData('evaluationQuestions', allQuestions);
    } else {
      setQuestions(getLocalStorageData('evaluationQuestions'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationQuestions]);

  function handleAddQuestion() {
    let newQuestion = initialState;
    newQuestion.choices = [];
    let questionsClone = [...questions];
    questionsClone.push(newQuestion);
    setLocalStorageData('evaluationQuestions', questionsClone);
    setQuestions(questionsClone);
  }

  function handleRemoveQuestion(questionId: string, questionIndex: number) {
    let questionsClone = [...questions];

    if (questionsClone.length === 1) {
      toast.error('You must add at least one question');
    }

    if (questionsClone[questionIndex].question) {
      deleteQuestion(questionId, {
        onSuccess: () => {
          toast.success('Question deleted', { duration: 2000 });
          if (questionIndex > -1 && questionsClone.length > 1) {
            questionsClone.splice(questionIndex, 1);
            setLocalStorageData('evaluationQuestions', questionsClone);
            setQuestions(questionsClone);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    }
  }

  function handleRemoveChoice(questionIndex: number, choiceIndex: number) {
    let questionsClone = [...questions];
    let question = questionsClone[questionIndex];

    if (question.choices.length === 2) {
      toast.error('Multiple choice must have at least two choices');
    }

    if (choiceIndex > -1 && question.choices.length > 2) {
      question.choices.splice(choiceIndex, 1);

      questionsClone[questionIndex] = question;

      setLocalStorageData('evaluationQuestions', questionsClone);
      setQuestions(questionsClone);
    }
  }

  function handleAddMultipleMultipleChoiceAnswer(index: number) {
    let questionsClone = [...questions];
    let questionChoices = questionsClone[index];
    questionChoices.choices.push(multipleChoiceContent);
    setLocalStorageData('evaluationQuestions', questionsClone);
    setQuestions(questionsClone);
  }

  function handleChange(index: number, { name, value }: ValueType) {
    let questionInfo = [...questions];
    if (
      name === 'question_type' &&
      value === IQuestionType.OPEN &&
      questionInfo[index].choices.length > 0
    ) {
      questionInfo[index].choices = [];
      return;
    }
    questionInfo[index] = { ...questionInfo[index], [name]: value };

    setLocalStorageData('evaluationQuestions', questionInfo);
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

    setLocalStorageData('evaluationQuestions', questionsClone);
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
    setLocalStorageData('evaluationQuestions', questionsClone);
  }

  const { mutate } = evaluationStore.createEvaluationQuestions();
  const { mutate: deleteQuestion } = evaluationStore.deleteEvaluationQuestionById();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(questions, {
      onSuccess: (createdQuestion) => {
        toast.success('Questions added', { duration: 5000 });

        removeLocalStorageData('evaluationQuestions');
        queryClient.invalidateQueries(['evaluation/questions', createdQuestion.data.data.id]);
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
          <React.Fragment key={`${question.id} ${index}`}>
            <div
              className="flex justify-between w-2/3 bg-main px-6 py-10 mt-8"
              key={index}>
              <div className="flex flex-col">
                <SelectMolecule
                  value={question.question_type}
                  disabled={question.submitted}
                  width="64"
                  name="question_type"
                  placeholder="Question type"
                  handleChange={(e: ValueType) => handleChange(index, e)}
                  options={[
                    { label: 'OPEN', value: IQuestionType.OPEN },
                    { label: 'MULTIPLE CHOICE', value: IQuestionType.MULTIPLE_CHOICE },
                  ]}>
                  Question type
                </SelectMolecule>
                <TextAreaMolecule
                  readOnly={question.submitted}
                  name={'question'}
                  value={question.question}
                  placeholder="Enter question"
                  handleChange={(e: ValueType) => handleChange(index, e)}>
                  Question {index + 1}
                </TextAreaMolecule>

                {question.question_type === IQuestionType.OPEN && (
                  <TextAreaMolecule
                    className="normal-case"
                    readOnly={question.submitted}
                    name={'answer'}
                    value={question.answer}
                    placeholder="Enter question answer"
                    handleChange={(e: ValueType) => handleChange(index, e)}>
                    Question {index + 1} answer
                  </TextAreaMolecule>
                )}
                {/* multiple choice answers here */}
                {question.question_type === IQuestionType.MULTIPLE_CHOICE &&
                  question.choices.map((multipleQuestion, choiceIndex) => (
                    <>
                      <TextAreaMolecule
                        key={`${choiceIndex}`}
                        readOnly={question.submitted}
                        name={'answer_content'}
                        value={multipleQuestion.answer_content}
                        placeholder="Enter answer"
                        handleChange={(e: ValueType) =>
                          handleChoiceChange(index, choiceIndex, e)
                        }>
                        <div className="flex items-center justify-between">
                          Answer choice {choiceIndex + 1}
                          <button
                            type="button"
                            onClick={() => handleRemoveChoice(index, choiceIndex)}>
                            <Icon name="close" size={12} />
                          </button>
                        </div>
                      </TextAreaMolecule>
                    </>
                  ))}

                {question.question_type === IQuestionType.MULTIPLE_CHOICE ? (
                  <div className="-mt-4 mb-1">
                    <Button
                      type="button"
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

                {question.choices.length > 0 &&
                question.question_type === IQuestionType.MULTIPLE_CHOICE ? (
                  <SelectMolecule
                    value={question.choices.find((ch) => ch.correct)?.answer_content}
                    width="64"
                    name="correct_answer"
                    placeholder="Choose correct answer"
                    handleChange={(e: ValueType) => handleCorrectAnswerCahnge(index, e)}
                    options={
                      question.choices.map((ch) => ({
                        label: ch.answer_content,
                        value: ch.answer_content,
                      })) as SelectData[]
                    }>
                    Correct answer
                  </SelectMolecule>
                ) : null}

                <InputMolecule
                  readonly={question.submitted}
                  required={false}
                  type="number"
                  name={'mark'}
                  min={1}
                  style={{ width: '6rem' }}
                  value={question.mark || 0}
                  handleChange={(e: ValueType) => handleChange(index, e)}>
                  Question marks
                </InputMolecule>

                <Button
                  type="button"
                  onClick={() => handleRemoveQuestion(question.id, index)}
                  styleType="text"
                  className="self-start flex justify-center items-center"
                  icon>
                  <Icon name="close" size={12} fill="primary" />
                  Remove question
                </Button>
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
          </React.Fragment>
        ))
      ) : (
        <Heading>No questions created for this evaluation</Heading>
      )}
      <div>
        <Button styleType="text" color="gray" className="mt-6" onClick={handleGoBack}>
          Back
        </Button>
        <div className="pt-6 flex flex-col">
          <div className="pb-6">
            <Button
              styleType="outline"
              type="button"
              title="test"
              onClick={handleAddQuestion}>
              Add question
            </Button>
          </div>

          <div>
            <Button onSubmit={submitForm}>save</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
