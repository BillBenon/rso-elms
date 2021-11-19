import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { TextDecoration } from '../../../../types';
import Icon from '../../../Atoms/custom/Icon';

interface PropTypes<T> {
    data: any;
    full?: boolean;
    icon?: boolean;
    totalMarks: number;
    setTotalMarks: Dispatch<SetStateAction<number>>;
    hoverStyle?: TextDecoration;
    className?: string;
  }
export default function StudentAnswer<T>({totalMarks, setTotalMarks}: PropTypes<T>) {
    const [markScored, setMarkScored] = useState(-1);
    const updateQuestionPoints = (marks: number) => {
        console.log({markScored,marks});
        if(markScored == -1) {
            setTotalMarks(totalMarks+marks);
        }
        else if (markScored == 5 && marks == 0 ){ 
            if(totalMarks-markScored <= 0) setTotalMarks(0)
            else setTotalMarks(totalMarks-markScored);
        }
        else if (markScored == 0 && marks != 0 ){ 
            setTotalMarks(totalMarks+marks);
        }

        setMarkScored(marks)
        
    } 
  return (
        <div className={`answer-card-molecule bg-main p-6 rounded-lg `}>
            <div className="flex justify-between">
                <p className="text-sm text-gray-400">Question 1</p>
                <p className="text-sm font-semibold">5 Marks</p>
            </div>
            <div className="">
                <p className="font-semibold">What is nervous system?</p>
            </div>
            <div className="flex gap-4 mt-2">
                <div className="rounded-md border-2 border-primary-500 px-2 py-2 answer-box text-primary-500">
                    It is a system that is nervous!!
                </div>
                <div className="flex gap-2">
                    <button className={markScored == -1 || markScored == 0 ? 'normal-button' : 'right-button'} onClick={()=>{updateQuestionPoints(5)}}>
                    <Icon
                        name={"tick"}
                        size={18}
                        stroke={markScored == -1 || markScored == 0 ? 'none': 'main'}
                        fill={markScored == -1 || markScored == 0 ? 'none': 'main'}
                    />
                    </button>

                    <button className={markScored == 0 ? 'wrong-button' : 'normal-button'} onClick={()=>{updateQuestionPoints(0)}}>
                    <Icon
                        name={"cross"}
                        size={18}
                        stroke={markScored == 0 ? 'main' : 'none'}
                        fill={markScored == 0 ? 'main' : 'none'}
                    />
                    </button>
                </div>
            </div>
        </div>
  );
}
