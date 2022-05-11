import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { queryClient } from '../plugins/react-query';
import { markingStore } from '../store/administration/marking.store';
import { evaluationStore } from '../store/evaluation/evaluation.store';
import { ParamType, ValueType } from '../types';
import {
  IEvaluationInfo,
  IEvaluationQuestionsInfo,
  IStudentAnswer,
  ISubmissionTypeEnum,
} from '../types/services/evaluation.types';
import ContentSpan from '../views/evaluation/ContentSpan';
import Button from './Atoms/custom/Button';
import FileUploader from './Atoms/Input/FileUploader';
import Heading from './Atoms/Text/Heading';
import TextAreaMolecule from './Molecules/input/TextAreaMolecule';

export function SingleQuestionSectionBased({
  question,
  index,
  evaluation,
}: {
  question: IEvaluationQuestionsInfo;
  index: number;
  evaluation: IEvaluationInfo;
}) {
  const { id: studentEvaluationId } = useParams<ParamType>();
  const [localAnswer, setLocalAnswer] = useState<IStudentAnswer>({
    answer_attachment: '',
    evaluation_question: question.id,
    mark_scored: 0,
    multiple_choice_answer: '',
    open_answer: '',
    student_evaluation: studentEvaluationId,
  });

  function handleChange({ name, value }: ValueType) {
    setLocalAnswer((localAnswer) => ({ ...localAnswer, [name]: value }));
  }

  const { mutate } = evaluationStore.addQuestionAnswer();
  let previoustudentAnswers =
    markingStore.getStudentEvaluationAnswers(studentEvaluationId).data?.data.data || [];
  const { mutate: addQuestionDocAnswer } = evaluationStore.addQuestionDocAnswer();

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
            queryClient.invalidateQueries([
              'studentEvaluation/answers',
              studentEvaluationId,
            ]);

            setFile(null);

            setLocalAnswer((old) => ({
              ...old,
              answer_attachment: attachmeInfo.data.data.id.toString(),
            }));

            let data: IStudentAnswer;

            if (evaluation.submision_type === ISubmissionTypeEnum.FILE) {
              //remove empty attributes
              data = {
                ...localAnswer,
                answer_attachment: attachmeInfo.data.data.id.toString(),
              };

              Object.keys(data).forEach(
                (key) =>
                  data[key as keyof IStudentAnswer] == null &&
                  delete data[key as keyof IStudentAnswer],
              );
            } else {
              data = localAnswer;
            }

            mutate(
              {
                ...localAnswer,
                answer_attachment: attachmeInfo.data.data.id.toString(),
              },
              {
                onSuccess() {
                  queryClient.invalidateQueries([
                    'studentEvaluation/answers',
                    studentEvaluationId,
                  ]);
                },
              },
            );
          },
        },
      );
    };
    if (file && evaluation?.submision_type === ISubmissionTypeEnum.FILE) {
      handleSubmittingFile();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentEvaluationId, file, addQuestionDocAnswer, evaluation.submision_type]);

  const submitForm = () => {
    mutate(localAnswer, {
      onSuccess() {
        queryClient.invalidateQueries(['studentEvaluation/answers', studentEvaluationId]);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  function disableCopyPaste(e: any) {
    e.preventDefault();
    return false;
  }

  return (
    <div>
      <div className=" flex justify-between">
        <ContentSpan title={`Question ${index + 1}`} className="gap-3">
          <div
            dangerouslySetInnerHTML={{
              __html:
                question.question +
                ` (${
                  previoustudentAnswers.find(
                    (prevAnsw) => prevAnsw.evaluation_question.id == question.id,
                  )?.id
                    ? '<span className="text-primary-400 text-sm px-2">Submitted</span>'
                    : '<span className="text-error-500 text-sm px-2">Not submitted</span>'
                }) `,
            }}
            className="py-5"
          />
        </ContentSpan>

        <Heading fontWeight="semibold" fontSize="sm">
          {question.mark} marks
        </Heading>
      </div>

      {evaluation.submision_type == ISubmissionTypeEnum.ONLINE_TEXT && (
        <TextAreaMolecule
          onPaste={(e: any) => disableCopyPaste(e)}
          onCopy={(e: any) => disableCopyPaste(e)}
          autoComplete="off"
          style={{
            height: '7rem',
          }}
          value={
            previoustudentAnswers.find(
              (answer) => answer.evaluation_question.id == question.id,
            )?.open_answer || localAnswer.open_answer
          }
          placeholder="Type your answer here"
          name="open_answer"
          handleChange={handleChange}
        />
      )}

      {question.attachments?.length > 0 && (
        <div className="flex flex-col py-5">
          <Heading fontWeight="medium" fontSize="sm">
            Question documents
          </Heading>
          {question.attachments &&
            question.attachments?.map((attachment, index) => (
              <a
                href={`${
                  import.meta.env.VITE_API_URL
                }/evaluation-service/api/evaluationQuestions/${
                  attachment.id
                }/loadAttachment`}
                key={attachment.id}
                target="_blank"
                className="text-blue-500 hover:underline py-2"
                rel="noreferrer"
                download={true}>
                {index + 1}. {attachment.name}
              </a>
            ))}
        </div>
      )}

      {evaluation.submision_type === ISubmissionTypeEnum.FILE && (
        <div className="flex py-5 flex-col">
          <FileUploader
            allowPreview={false}
            handleUpload={(filelist) => {
              handleUpload(filelist);
            }}
            accept="*"
            error={''}>
            <Button styleType="outline" type="button">
              upload answer file
            </Button>
          </FileUploader>
          <div className="py-4">
            {previoustudentAnswers
              .find((item) => item.evaluation_question.id == question.id)
              ?.student_answer_attachments.map((ans, file_question_index) => (
                <a
                  href={`${
                    import.meta.env.VITE_API_URL
                  }/evaluation-service/api/evaluationQuestions/${
                    ans.attachment.id
                  }/loadAttachment`}
                  key={ans.attachment.id}
                  target="_blank"
                  className="block py-2 text-blue-500 hover:underline"
                  download
                  rel="noreferrer">
                  {file_question_index + 1}. {ans.attachment.name}
                </a>
              ))}
          </div>
        </div>
      )}

      <div className="py-7">
        <Button
          onClick={() => {
            submitForm();
          }}>
          save answer
        </Button>
      </div>
      {/*
        FIXME: We should have used a titap component for text editor but we couldn't get it working with the time we had.
      <Tiptap
        handleChange={function (_editor: Editor): void {
          if (_editor.commands.blur()) {
            submitForm();
            return;
          }

          // function handleChange({ name, value }: ValueType) {
          setLocalAnswer((localAnswer) => ({
            ...localAnswer,
            open_answer: _editor.getHTML(),
          }));
          // }
        }}
        content={localAnswer.open_answer}
      /> */}
      <hr className="my-4" />
    </div>
  );
}
