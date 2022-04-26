import { Editor } from '@tiptap/react';
import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router-dom';
import { queryClient } from '../../../../plugins/react-query';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import { ParamType, SelectData, ValueType } from '../../../../types';
import {
  ICreateEvaluationQuestions,
  IEvaluationProps,
  IMultipleChoice,
  IQuestionType,
} from '../../../../types/services/evaluation.types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import Tiptap from '../../../Molecules/editor/Tiptap';
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
  const { id: moduleSubject } = useParams<ParamType>();
  const { search } = useLocation();
  const subjectId = new URLSearchParams(String(search)).get('subject') || '';
  const initialState: ICreateEvaluationQuestions = {
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
    evaluation_module_subject_id: moduleSubject || '',
  };

  const evaluationQuestions =
    evaluationStore.getEvaluationQuestionsBySubject(evaluationId || '', subjectId).data
      ?.data.data || [];

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId + '').data?.data || {};

  const [questions, setQuestions] = useState([initialState]);

  useEffect(() => {
    let allQuestions: any[] = [];
    if (evaluationQuestions?.length > 0) {
      evaluationQuestions.forEach((question) => {
        let questionData = { ...initialState };
        questionData.choices = question.multiple_choice_answers || [];
        questionData.evaluation_id = evaluationId ?? question.evaluation_id;
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationId, evaluationQuestions]);

  function handleAddQuestion() {
    setQuestions([
      ...questions,
      {
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
        evaluation_module_subject_id: moduleSubject || '',
      },
    ]);
  }

  function handleRemoveQuestion(questionId: string, questionIndex: number) {
    let questionsClone = [...questions];

    if (questionsClone.length === 1) {
      toast.error('You must add at least one question');
    }

    if (questionId) {
      deleteQuestion(questionId, {
        onSuccess: () => {
          toast.success('Question deleted', { duration: 2000 });
          if (questionIndex > -1 && questionsClone.length > 1) {
            questionsClone.splice(questionIndex, 1);
            setQuestions(questionsClone);
          }
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    } else {
      if (questionIndex > -1 && questionsClone.length > 1) {
        questionsClone.splice(questionIndex, 1);
        setQuestions(questionsClone);
      }
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

      setQuestions(questionsClone);
    }
  }

  function handleAddMultipleMultipleChoiceAnswer(index: number) {
    let questionsClone = [...questions];
    let questionChoices = questionsClone[index];
    questionChoices.choices.push(multipleChoiceContent);
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

    if (name === 'mark') {
      if (parseFloat(value.toString()) > 0) {
        questionInfo[index] = {
          ...questionInfo[index],
          mark: parseFloat(value.toString()) || 0,
        };
        setQuestions(questionInfo);
        return;
      }
      questionInfo[index] = {
        ...questionInfo[index],
        mark: 0,
      };
      setQuestions(questionInfo);
      return;
    }

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

  const { mutate, isLoading: createQuestionsLoader } =
    evaluationStore.createEvaluationQuestions();
  const { mutate: deleteQuestion } = evaluationStore.deleteEvaluationQuestionById();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(questions, {
      onSuccess: () => {
        toast.success('Questions added', { duration: 5000 });
        queryClient.invalidateQueries(['evaluation/questionsBySubject', subjectId]);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  function currentTotalMarks() {
    let totalMarks = 0;
    questions.forEach((question) => {
      totalMarks += Number(question.mark);
    });
    return totalMarks;
  }

  function handleChangeEditor(editor: Editor, index: number, name: string) {
    let questionInfo = [...questions];

    if (name == 'answer') {
      questionInfo[index].answer = editor.getHTML();
    } else if (name == 'question') {
      questionInfo[index].question = editor.getHTML();
    }

    setQuestions(questionInfo);
  }

  return (
    <Fragment>
      <div
        className={`${
          evaluationInfo?.evaluation_module_subjects.find(
            (subject) => subject.id === moduleSubject,
          )?.section_total_marks === currentTotalMarks()
            ? 'bg-primary-400'
            : 'bg-red-500'
        } + sticky top-0  z-50 py-4 px-5 text-main rounded-sm flex justify-evenly`}>
        <span>{evaluationInfo?.name}</span>
        <span className="">
          {questions.length} {questions.length > 1 ? 'questions' : 'question'}
        </span>
        <span>
          {currentTotalMarks()}/
          {
            evaluationInfo?.evaluation_module_subjects.find(
              (subject) => subject.id === moduleSubject,
            )?.section_total_marks
          }{' '}
          marks
        </span>
      </div>

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
                  {/* <TextAreaMolecule
                    readOnly={question.submitted}
                    name={'question'}
                    value={question.question}
                    placeholder="Enter question"
                    handleChange={(e: ValueType) => handleChange(index, e)}>
                    Question {index + 1}
                  </TextAreaMolecule> */}
                  <div className="my-2">
                    <div className="mb-2">
                      <ILabel size="sm">Question {index + 1}</ILabel>
                    </div>
                    <Tiptap
                      handleChange={(editor) =>
                        handleChangeEditor(editor, index, 'question')
                      }
                      content={question.question}
                    />
                  </div>

                  {question.question_type === IQuestionType.OPEN && (
                    <div className="my-2 bg-gray-100 rounded-md p-2">
                      <div className="mb-2">
                        <ILabel weight="bold" size="sm">
                          Question {index + 1} answer
                        </ILabel>
                      </div>
                      <Tiptap
                        handleChange={(editor) =>
                          handleChangeEditor(editor, index, 'answer')
                        }
                        content={question.answer}
                      />
                    </div>
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
                    name={'mark'}
                    min={1}
                    style={{ width: '6rem' }}
                    value={question.mark}
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

            <div className="flex gap-2">
              <Button onSubmit={submitForm} disabled={createQuestionsLoader}>
                save
              </Button>
              <Button onClick={handleGoBack}>Finish</Button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
