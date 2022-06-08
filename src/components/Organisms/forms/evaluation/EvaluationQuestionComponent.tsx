import { Editor } from '@tiptap/react';
import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { evaluationStore } from '../../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../../types';
import {
  ICreateEvaluationQuestions,
  IEvaluationQuestionsInfo,
  IQuestionaireTypeEnum,
  IQuestionType,
} from '../../../../types/services/evaluation.types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import FileUploader from '../../../Atoms/Input/FileUploader';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import Tiptap from '../../../Molecules/editor/Tiptap';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

export default function EvaluationQuestionComponent() {
  const history = useHistory();

  const { evaluationId } = useParams<{ evaluationId: string }>();

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  let evaluationQuestions: IEvaluationQuestionsInfo[] | ICreateEvaluationQuestions[] = [];

  evaluationQuestions =
    evaluationStore.getEvaluationQuestions(evaluationId).data?.data.data || [];

  const initialState: ICreateEvaluationQuestions = {
    evaluation_id: evaluationId,
    mark: 0,
    parent_question_id: '',
    choices: [],
    id: '',
    question: '',
    question_type: IQuestionType.OPEN,
    sub_questions: [],
    submitted: false,
    answer: '',
  };

  const [file, setFile] = useState<File | null>(null);
  const [currentId, setCurrentId] = useState('');

  const { mutate: addQuestionDoc, isLoading: uploadLoader } = evaluationStore.addQuestionDoc();

  const handleUpload = (file: FileList | null, id: string) => {
    setFile(file ? file[0] : null);
    setCurrentId(id);
  };

  useEffect(() => {
    const handleSubmittingFile = (id: string) => {
      if (file && !currentId) {
        submitForm();
        return;
      }

      const data = new FormData();

      if (file) data.append('file', file);

      addQuestionDoc(
        {
          id,
          docInfo: data,
        },
        {
          onSuccess() {
            setFile(null);
            setCurrentId('');
            toast.success('File uploaded successfully');
            queryClient.invalidateQueries(['evaluation/questions', evaluationId]);
          },
        },
      );
    };
    if (file) {
      handleSubmittingFile(currentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, file, evaluationId]);

  const [questions, setQuestions] = useState([initialState]);

  useEffect(() => {
    let allQuestions: any[] = [];
    if (evaluationQuestions?.length > 0) {
      evaluationQuestions.forEach((question) => {
        let questionData = { ...initialState };
        questionData.choices = question.multiple_choice_answers || [];
        questionData.evaluation_id = question.evaluation_id;
        questionData.mark = question.mark;
        questionData.question = question.question;
        questionData.question_type = question.question_type;
        questionData.submitted = false;
        questionData.id = question.id;
        questionData.attachments = question.attachments;
        questionData.sub_questions = [];
        allQuestions.push(questionData);
      });
      setQuestions(allQuestions);
    } else {
      setQuestions([initialState]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationQuestions]);

  function handleAddQuestion() {
    let newQuestion = initialState;
    newQuestion.choices = [];
    let questionsClone = [...questions];
    questionsClone.push(newQuestion);
    setQuestions(questionsClone);
  }

  function handleRemoveQuestion(questionId: string, questionIndex: number) {
    let questionsClone = [...questions];

    if (questionsClone.length === 1) {
      toast.error('You must add at least one question');
    }
    if (!questionId) {
      if (questionIndex > -1 && questionsClone.length > 1) {
        questionsClone.splice(questionIndex, 1);
        setQuestions(questionsClone);
      }
    } else {
      if (questionsClone[questionIndex].question) {
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
      }
    }
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

  function handleChangeEditor(editor: Editor, index: number, name: string) {
    let questionInfo = [...questions];

    if (name == 'answer') {
      questionInfo[index].answer = editor.getHTML();
    } else if (name == 'question') {
      questionInfo[index].question = editor.getHTML();
    }

    setQuestions(questionInfo);
  }

  const { mutate, isLoading: createQuestionLoader } =
    evaluationStore.createEvaluationQuestions();
  const { mutate: deleteQuestion } = evaluationStore.deleteEvaluationQuestionById();

  function submitForm(e?: FormEvent) {
    if (e) e.preventDefault();

    mutate(questions, {
      onSuccess: () => {
        toast.success('Questions added', { duration: 5000 });
        history.push(`/dashboard/evaluations/${evaluationId}/settings`);
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

  return (
    <Fragment>
      <div
        className={`${
          evaluationInfo?.total_mark !== currentTotalMarks()
            ? 'bg-error-500'
            : 'bg-primary-400'
        }  sticky top-0 z-50 py-4 px-5 text-main rounded-sm flex justify-evenly`}>
        <span>{evaluationInfo?.name}</span>
        <span className="">
          {questions.length} {questions.length > 1 ? 'questions' : 'question'}
        </span>
        <span>
          {currentTotalMarks()} /{evaluationInfo?.total_mark} marks
        </span>
      </div>

      <form className="flex flex-col" onSubmit={submitForm}>
        {questions.length ? (
          questions.map((question, index) => (
            <Fragment key={index}>
              <div className="flex justify-between w-2/3 bg-main px-6 py-10 mt-8">
                <div className="flex flex-col">
                  <SelectMolecule
                    value={question.question_type}
                    disabled
                    width="64"
                    name="question_type"
                    placeholder="Question type"
                    handleChange={(e) => handleChange(index, e)}
                    options={[
                      { label: 'OPEN', value: IQuestionType.OPEN },
                      { label: 'MULTIPLE CHOICE', value: IQuestionType.MULTIPLE_CHOICE },
                    ]}>
                    Question type
                  </SelectMolecule>

                  <div className="my-2">
                    <div className="my-1">
                      <ILabel size="sm">Question {index + 1}</ILabel>
                    </div>
                    <Tiptap
                      handleChange={(editor) =>
                        handleChangeEditor(editor, index, 'question')
                      }
                      content={question.question}
                    />
                  </div>

                  {question.question_type === IQuestionType.OPEN &&
                    evaluationInfo?.questionaire_type !== IQuestionaireTypeEnum.FIELD && (
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

                  <div className="flex items-center py-5">
                    <FileUploader
                      allowPreview={false}
                      handleUpload={(filelist) => {
                        handleUpload(filelist, question.id);
                      }}
                      accept={'*'}
                      error={''}>
                      <Button styleType="outline" type="button" isLoading={uploadLoader}>
                        {uploadLoader ? 'uploading...' : 'upload file'}
                      </Button>
                    </FileUploader>
                  </div>

                  <div className="flex flex-col py-5">
                    {question.attachments &&
                      question.attachments?.length > 0 &&
                      question.attachments?.map((attachment, index) => (
                        <a
                          className="text-blue-800 hover:underline"
                          href={`${
                            import.meta.env.VITE_API_URL
                          }/evaluation-service/api/evaluationQuestions/${
                            attachment.id
                          }/loadAttachment`}
                          key={attachment.id}
                          target="_blank"
                          download
                          rel="noreferrer">
                          {index + 1}. {attachment.name}
                        </a>
                      ))}
                  </div>

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
                  {/* <div>
                  {!question.submitted ? (
                    <Button type="submit" onSubmit={submitForm}>
                      save question
                    </Button>
                  ) : null}
                </div> */}

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
            </Fragment>
          ))
        ) : (
          <Heading>No questions created for this evaluation</Heading>
        )}
        <div>
          <Button
            styleType="text"
            color="gray"
            className="mt-6"
            onClick={() => {
              history.goBack();
            }}>
            Back
          </Button>{' '}
          <Button
            styleType="text"
            color="gray"
            className="mt-6"
            onClick={() => {
              history.push(`/dashboard/evaluations/${evaluationId}/settings`);
            }}>
            Skip
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
              <Button
                onSubmit={(e: FormEvent) => submitForm(e)}
                disabled={createQuestionLoader || uploadLoader}>
                save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
