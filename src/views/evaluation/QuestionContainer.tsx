import React from 'react';

import Heading from '../../components/Atoms/Text/Heading';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import ContentSpan from './ContentSpan';

interface IQuestionContainerProps {
  question: string;
  marks: number;
  choices?: [];
  isMultipleChoice: boolean;
}

export default function QuestionContainer({
  question,
  marks,
  choices,
  isMultipleChoice,
}: IQuestionContainerProps) {
  return (
    <div className="bg-main px-16 pt-5 flex flex-col gap-4 mt-8 w-12/12 pb-5">
      <div className="mt-7 flex justify-between">
        <ContentSpan title="Question 1" className="gap-3">
          What is the nervous system?
        </ContentSpan>

        <Heading fontWeight="semibold" fontSize="sm">
          5 marks
        </Heading>
      </div>
      {isMultipleChoice ? (
        <div className="flex flex-col gap-4">
          <div className="flex">
            <div className="w-14 h-14 bg-lightblue text-primary-500 border-primary-500 border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
              A
            </div>
            <div className="w-80 h-14 bg-lightblue text-primary-500 border-primary-500 border-2 rounded-tr-md rounded-br-md flex items-center px-4">
              This is the first answer
            </div>
          </div>
          <div className="flex">
            <div className="w-14 h-14 border-primary-500 border-2 border-r-0 rounded-tl-md rounded-bl-md right-rounded-md flex items-center justify-center">
              B
            </div>
            <div className="w-80 h-14 border-primary-500 border-2 rounded-tr-md rounded-br-md flex items-center px-4">
              This is the second answer.
            </div>
          </div>
        </div>
      ) : (
        <TextAreaMolecule
          style={{ height: '7rem' }}
          value=""
          placeholder="Type your answer here"
          name={''}
          handleChange={() => {}}></TextAreaMolecule>
      )}
    </div>
  );
}
