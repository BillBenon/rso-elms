import React from 'react';

interface IMultipleChoiceAnswerProps {
  answer_content: string;
  correct: boolean;
  highlight?: boolean;
}

export default function MultipleChoiceAnswer({
  answer_content,
  correct,
  highlight,
}: IMultipleChoiceAnswerProps) {
  const classes =
    correct || highlight
      ? 'bg-lightblue text-primary-500 border-primary-500 text-primary-500'
      : 'border-tertiary';

  return (
    <div className="flex flex-col mb-4">
      <div className="flex">
        <div
          className={`w-14 h-12 ${classes} border-primary-500' border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center`}>
          A
        </div>
        <div
          className={`w-80 h-12 ${classes} border-2 rounded-tr-md rounded-br-md flex items-center px-4`}>
          {answer_content}
        </div>
      </div>
    </div>
  );
}
