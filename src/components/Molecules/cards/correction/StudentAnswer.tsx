import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TextDecoration, ValueType } from '../../../../types';
import { MarkingCorrection } from '../../../../types/services/marking.types';
import ContentSpan from '../../../../views/evaluation/ContentSpan';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import InputMolecule from '../../input/InputMolecule';

interface PropTypes {
  data: any;
  full?: boolean;
  icon?: boolean;
  correction: MarkingCorrection[];
  totalMarks: number;
  index: number;
  updateQuestionPoints: (_answer_id: string, _marks: number) => void;
  createCreateNewCorrection: (
    _answer_id: string,
    _marks: number,
    _marked: boolean,
  ) => MarkingCorrection;
  setTotalMarks: Dispatch<SetStateAction<number>>;
  hoverStyle?: TextDecoration;
  className?: string;
}
export default function StudentAnswer({
  updateQuestionPoints,
  data,
  index,
  correction,
  createCreateNewCorrection,
}: PropTypes) {
  const correct: MarkingCorrection =
    correction.find((x) => x.answerId === data?.id) ||
    createCreateNewCorrection(data?.id, data.mark_scored, data.marked);

  const [obtainedMarks, setObtainedMarks] = useState(data.mark_scored);

  function updateCorrectionMarks(e: ValueType) {
    setObtainedMarks(Number(e.value));
    updateQuestionPoints(data.id, obtainedMarks);
  }

  function clickUpdateMarks(isCorrect: boolean){
    if(isCorrect && obtainedMarks == 0){
      setObtainedMarks(Number(data?.evaluation_question.mark))
      updateQuestionPoints(data.id, obtainedMarks);
    }

    else if(!isCorrect && obtainedMarks != 0){
      setObtainedMarks(Number(0))
      updateQuestionPoints(data.id, obtainedMarks);
    }
    
  }

  useEffect(() => {
    setObtainedMarks(data.mark_scored || 0);
  }, [data]);
  return (
    <div className={`answer-card-molecule bg-main p-6 rounded-lg `}>
      <div className="mt-3 flex justify-between">
        <ContentSpan title={`Question ${index + 1}`} className="gap-3">
          {data.evaluation_question?.question}
        </ContentSpan>

        <Heading fontWeight="semibold" fontSize="sm">
          {data.evaluation_question?.mark} marks
        </Heading>
      </div>

      <div>
        <div className="flex gap-4 mt-2">
          <div>
            {data.evaluation_question?.question_type == 'MULTIPLE_CHOICE' ? (
              <div>
                <div className="flex my-4">
                  <div
                    className={`w-14 h-12 border-primary-400 text-lg border-primary-500' border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center`}>
                    *
                  </div>
                  <div
                    className={`w-auto h-12 border-2 border-primary-400 rounded-tr-md rounded-br-md flex items-center px-4`}
                    style={{ minWidth: '20rem' }}>
                    {data.multiple_choice_answer.answer_content}
                  </div>
                </div>
                {data.evaluation_question?.multiple_choice_answers?.map(
                  (choice: any) =>
                    choice.id != data?.multiple_choice_answer?.id && (
                      <div className="flex my-4">
                        <div
                          className={`w-14 h-12 text-lg border-primary-500' border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center`}>
                          *
                        </div>
                        <div
                          className={`w-auto h-12 border-2 rounded-tr-md rounded-br-md flex items-center px-4`}
                          style={{ minWidth: '20rem' }}>
                          {choice.answer_content}
                        </div>
                      </div>
                    ),
                )}
              </div>
            ) : (
              <div className="min-h-8 rounded-md border-2 border-primary-500 px-2 py-3 mt-4 answer-box text-primary-500">
                {data?.open_answer}
              </div>
            )}
          </div>
          <div className="flex gap-2 h-12 items-center mt-4 self-start">
            <button
              className={
                !correct?.marked || correct?.markScored == 0
                  ? 'normal-button'
                  : 'right-button'
              }
              onClick={() => {
                if (data.evaluation_question?.question_type != 'MULTIPLE_CHOICE')
                clickUpdateMarks(true);
              }}>
              <Icon
                name={'tick'}
                size={18}
                stroke={!correct?.marked || correct?.markScored == 0 ? 'none' : 'main'}
                fill={'none'}
              />
            </button>

            <button
              className={
                !correct?.marked || correct?.markScored != 0
                  ? 'normal-button'
                  : 'wrong-button'
              }
              onClick={() => {
                if (data.evaluation_question?.question_type != 'MULTIPLE_CHOICE')
                clickUpdateMarks(false);
              }}>
              <Icon
                name={'cross'}
                size={18}
                fill={!correct?.marked || correct?.markScored != 0 ? 'secondary' : 'main'}
              />
            </button>
          </div>
        </div>
      </div>

      {data.evaluation_question?.question_type != 'MULTIPLE_CHOICE' && (
        <div className="float-right flex gap-6 items-center justify-center">
          <Heading fontWeight="semibold" fontSize="sm">
            Obtained marks
          </Heading>
          <InputMolecule
            handleChange={(e: ValueType) => updateCorrectionMarks(e)}
            type="number"
            min={0}
            style={{ width: '80px' }}
            max={Number(data?.evaluation_question?.mark) || 4}
            value={obtainedMarks}
            name={'question_score'}
          />
        </div>
      )}
    </div>
  );
}
