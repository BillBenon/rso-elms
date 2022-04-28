import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { queryClient } from '../plugins/react-query';
import { markingStore } from '../store/administration/marking.store';
import { evaluationStore } from '../store/evaluation/evaluation.store';
import { ParamType, ValueType } from '../types';
import {
  IEvaluationQuestionsInfo,
  IStudentAnswer,
  ISubmissionTypeEnum
} from '../types/services/evaluation.types';
import ContentSpan from '../views/evaluation/ContentSpan';
import Button from './Atoms/custom/Button';
import FileUploader from './Atoms/Input/FileUploader';
import Heading from './Atoms/Text/Heading';
import TextAreaMolecule from './Molecules/input/TextAreaMolecule';

export function SingleQuestionSectionBased({
  question,
  index,
  submissionType,
}: {
  question: IEvaluationQuestionsInfo;
  index: number;
  submissionType: string;
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
            setFile(null);
            setLocalAnswer((localAnswer) => ({
              ...localAnswer,
              answer_attachment: attachmeInfo.data.data.id.toString(),
            }));

            mutate({
              ...localAnswer,
              answer_attachment: attachmeInfo.data.data.id.toString(),
            })
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
    if (file) {
      handleSubmittingFile();
    }
  }, [studentEvaluationId, file]);

  const submitForm = () => {
    mutate(localAnswer, {
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  const submitAfter = () => {
    setInterval(() => {
      submitForm();
    }, 30000);
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
              __html: question.question,
            }}
            className="py-5"
          />
        </ContentSpan>

        <Heading fontWeight="semibold" fontSize="sm">
          {question.mark} marks
        </Heading>
      </div>

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
        onBlur={() => submitForm()}
        name="open_answer"
        onFocus={() => submitAfter()}
        handleChange={handleChange}
      />

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
                download>
                {index + 1}. {attachment.name}
              </a>
            ))}
        </div>
      )}

      {submissionType == ISubmissionTypeEnum.FILE && (
        <div className="flex items-center py-5">
          <FileUploader
            allowPreview={false}
            handleUpload={(filelist) => {
              handleUpload(filelist);
            }}
            accept={'*'}
            error={''}>
            <Button styleType="outline" type="button">
              upload answer file
            </Button>
          </FileUploader>
          {previoustudentAnswers.find(item => item.evaluation_question.id == question.id)?.attachments.map(attachment => (
            <a
              href={`${import.meta.env.VITE_API_URL
                }/evaluation-service/api/evaluationQuestions/${attachment.id
                }/loadAttachment`}
              key={attachment.id}
              target="_blank"
              download>
              {index + 1}. {attachment.name}
            </a>
          ))}
        </div>
      )}

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
