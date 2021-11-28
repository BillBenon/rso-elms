import React from 'react';
import { TextDecoration } from '../../../../types';
import Icon from '../../../Atoms/custom/Icon';

interface PropTypes<T> {
    data: any;
    full?: boolean;
    icon?: boolean;
    hoverStyle?: TextDecoration;
    className?: string;
  }
export default function AnswerReview<T>({data}: PropTypes<T>) {
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
                <div className="flex gap-2 h-12 items-center">
                    {data.mark_scored != 0 ?(
                        <button className={!data.marked ||data.mark_scored == 0 ? 'normal-button' : 'right-button'}>
                        <Icon
                            name={"tick"}
                            size={18}
                            stroke={!data.marked ||data.mark_scored == 0 ? 'none': 'main'}
                            fill={ 'none'}
                        />
                        </button>
                    ): 
                    (
                        <button className={!data.marked || data.mark_scored != 0 ? 'normal-button' : 'wrong-button'}>
                    <Icon
                        name={"cross"}
                        size={18}
                        fill={!data?.marked || data?.mark_scored != 0 ? 'secondary' : 'main'}
                    />
                    </button>
                    )}
                </div>
            </div>
        </div>
  );
}
