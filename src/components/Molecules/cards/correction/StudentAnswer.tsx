import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { TextDecoration } from '../../../../types';
import { MarkingCorrection } from '../../../../views/evaluation/StudentAnswersMarking';
import Icon from '../../../Atoms/custom/Icon';

interface PropTypes<T> {
    data: any;
    full?: boolean;
    icon?: boolean;
    correction: MarkingCorrection[];
    totalMarks: number;
    updateQuestionPoints: (answer_id: string, marks: number) => void;
    setTotalMarks: Dispatch<SetStateAction<number>>;
    hoverStyle?: TextDecoration;
    className?: string;
  }
export default function StudentAnswer<T>({updateQuestionPoints,data,correction}: PropTypes<T>) {
    const correct:MarkingCorrection = correction.find(x => x.answer_id === data?.id) || {answer_id: data?.id, marked: false, mark_scored: 0};
  return (
        <div className={`answer-card-molecule bg-main p-6 rounded-lg `}>
            <div className="flex justify-between">
                <p className="text-sm text-gray-400">Question</p>
                <p className="text-sm font-semibold">{data?.evaluation_question?.mark} Marks</p>
            </div>
            <div className="">
                <p className="font-semibold">{data?.evaluation_question?.question}</p>
            </div>
            <div className="flex gap-4 mt-2">
                <div className="rounded-md border-2 border-primary-500 px-2 py-2 answer-box text-primary-500">
                    {data?.open_answer}
                </div>
                <div className="flex gap-2">
                    <button className={!correct?.marked ||correct?.mark_scored == 0 ? 'normal-button' : 'right-button'} onClick={()=>{updateQuestionPoints(data?.id,data?.evaluation_question?.mark)}}>
                    <Icon
                        name={"tick"}
                        size={18}
                        stroke={data?.marked == null || data?.mark_scored == 0 ? 'none': 'main'}
                        fill={data?.marked == null || data?.mark_scored == 0 ? 'none': 'main'}
                    />
                    </button>

                    <button className={!correct?.marked || correct?.mark_scored != 0 ? 'normal-button' : 'wrong-button'} onClick={()=>{updateQuestionPoints(data?.id,0)}}>
                    <Icon
                        name={"cross"}
                        size={18}
                        stroke={data?.marked == null || data?.mark_scored == 0 ? 'main' : 'none'}
                        fill={data?.marked == null || data?.mark_scored == 0 ? 'main' : 'none'}
                    />
                    </button>
                </div>
            </div>
        </div>
  );
}
