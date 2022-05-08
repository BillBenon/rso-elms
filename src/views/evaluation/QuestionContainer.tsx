import React, {
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Atoms/custom/Button';
import FileUploader from '../../components/Atoms/Input/FileUploader';
import Input from '../../components/Atoms/Input/Input';
import Heading from '../../components/Atoms/Text/Heading';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import StudentQuestionsSectionBased from '../../components/Organisms/evaluation/StudentQuestionsSectionBased';
import { queryClient } from '../../plugins/react-query';
import { markingStore } from '../../store/administration/marking.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { ParamType, ValueType } from '../../types';
import {
  IEvaluationInfo,
  IEvaluationQuestionsInfo,
  IEvaluationSettingType,
  IMultipleChoiceAnswers,
  IStudentAnswer,
  ISubmissionTypeEnum
} from '../../types/services/evaluation.types';
import { StudentMarkingAnswer } from '../../types/services/marking.types';
import ContentSpan from './ContentSpan';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';


interface IQuestionContainerProps {
  question: IEvaluationQuestionsInfo;
  id: string;
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
  choices,
  isMultipleChoice,
  evaluationInfo,
}: IQuestionContainerProps) {
  const history = useHistory();

  const { id: studentEvaluationId } = useParams<ParamType>();
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
      student_evaluation: studentEvaluationId,
    };
  }, [id, index, previousAnswers, studentEvaluationId]);

  const [questionToSubmit, setQuestionToSubmit] = useState('');
  const [questionChoices, setChoices] = useState(choices);
  const [answer, setAnswer] = useState(initialState);

  const { mutate } = evaluationStore.addQuestionAnswer();
  const { mutateAsync } = evaluationStore.submitEvaluation();
  const { mutate: addQuestionDocAnswer } = evaluationStore.addQuestionDocAnswer();
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
    setAnswer(initialState);
    if (previousAnswers[index]?.multiple_choice_answer) {
      setAnswer((answer) => ({
        ...answer,
        ['multiple_choice_answer']: previousAnswers[index]?.multiple_choice_answer.id,
      }));
    }
  }, [index, initialState, previousAnswers]);

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (file: FileList | null) => {
    setFile(file ? file[0] : null);
  };

  useEffect(() => {
    const handleSubmittingFile = () => {
      const data = new FormData();

      if (file) data.append('file', file);

      addQuestionDocAnswer(
        {
          id: studentEvaluationId,
          docInfo: data,
        },
        {
          onSuccess(attachmeInfo) {
            setFile(null);

            queryClient.invalidateQueries([
              'studentEvaluation/answers',
              studentEvaluationId,
            ]);

            setAnswer((ans) => ({
              ...ans,
              answer_attachment: attachmeInfo.data.data.id.toString(),
            }));

            let data: IStudentAnswer;

            if (evaluationInfo.submision_type === ISubmissionTypeEnum.FILE) {
              console.log('submission type is file here');
              //remove empty attributes
              data = {
                ...answer,
                answer_attachment: attachmeInfo.data.data.id.toString(),
              };

              Object.keys(data).forEach(
                (key) =>
                  data[key as keyof IStudentAnswer] == null &&
                  delete data[key as keyof IStudentAnswer],
              );
            } else {
              data = answer;
            }

            console.log({ data });

            mutate(data);
            toast.success('File uploaded successfully');
            //TODO: invalidate student answers store
            queryClient.invalidateQueries([
              'studentEvaluation/answers',
              studentEvaluationId,
            ]);
          },
        },
      );
    };
    if (file && evaluationInfo.submision_type === ISubmissionTypeEnum.FILE) {
      handleSubmittingFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

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
    if (question.question !== '') {
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
        className={`bg-main px-16 flex flex-col gap-4 mt-8 w-12/12 border border-primary-400  unselectable ${evaluationInfo?.setting_type === IEvaluationSettingType.SUBJECT_BASED
          } ? 'pt - 5 pb - 5' : ''`}>
        {evaluationInfo?.setting_type === IEvaluationSettingType.SUBJECT_BASED && (
          <div className="mt-7 flex justify-between">
            <ContentSpan title={`Question ${index + 1}`} className="gap-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: question.question,
                }}
                className="py-5"
              />
            </ContentSpan>

            <Heading fontWeight="semibold" fontSize="sm">
              {question.mark} marks
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
          <>
            <StudentQuestionsSectionBased {...{ evaluationInfo }} />
          </>
        ) : (
          evaluationInfo.submision_type === ISubmissionTypeEnum.ONLINE_TEXT && (
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
          )
        )}

        {question.attachments?.length > 0 && (
          <div className="flex flex-col py-5">
            <Heading fontWeight="medium" fontSize="sm">
              Question documents
            </Heading>
            {question.attachments &&
              question.attachments?.map((attachment, index) => (
                <a
                  href={`${import.meta.env.VITE_API_URL
                    }/evaluation-service/api/evaluationQuestions/${attachment.id
                    }/loadAttachment`}
                  key={attachment.id}
                  target="_blank"
                  download
                  className="text-blue-500 hover:underline py-2"
                  rel="noreferrer">
                  {index + 1}. {attachment.name}
                </a>
              ))}
          </div>
        )}

        {evaluationInfo.submision_type === ISubmissionTypeEnum.FILE && (
          <Fragment>
            <div className="flex items-center py-5">
              <FileUploader
                multiple
                allowPreview={false}
                handleUpload={(filelist) => {
                  handleUpload(filelist);
                }}
                accept={evaluationInfo?.content_format}
                error={''}>
                <Button styleType="outline" type="button">
                  upload answer file
                </Button>
              </FileUploader>
            </div>

            {previousAnswers[index]?.student_answer_attachments.map((ans) => (
              <a
                href={`${import.meta.env.VITE_API_URL
                  }/evaluation-service/api/evaluationQuestions/${ans.attachment.id
                  }/loadAttachment`}
                key={ans.attachment.id}
                target="_blank"
                download
                className="pb-5"
                rel="noreferrer">
                {index + 1}. {ans.attachment.name}
              </a>
            ))}
          </Fragment>
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
