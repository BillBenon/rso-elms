import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { markingStore } from '../store/administration/marking.store';
import { evaluationStore } from '../store/evaluation/evaluation.store';
import { ParamType, ValueType } from '../types';
import {
  IEvaluationQuestionsInfo,
  IStudentAnswer,
} from '../types/services/evaluation.types';
import ContentSpan from '../views/evaluation/ContentSpan';
import Heading from './Atoms/Text/Heading';
import TextAreaMolecule from './Molecules/input/TextAreaMolecule';
export function SingleQuestionSectionBased({
  question,
  index,
}: {
  question: IEvaluationQuestionsInfo;
  index: number;
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

  // useEffect(() => {
  //   setLocalAnswer(previousAnswer);
  // }, [localAnswer]);

  function handleChange({ name, value }: ValueType) {
    setLocalAnswer((localAnswer) => ({ ...localAnswer, [name]: value }));
  }

  const { mutate } = evaluationStore.addQuestionAnswer();
  let previoustudentAnswers =
    markingStore.getStudentEvaluationAnswers(studentEvaluationId).data?.data.data || [];

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
