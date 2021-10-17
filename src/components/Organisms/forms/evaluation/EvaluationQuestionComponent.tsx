import React from 'react';

import { IEvaluationTypeEnum } from '../../../../types/services/evaluation.types';
import Button from '../../../Atoms/custom/Button';
import Icon from '../../../Atoms/custom/Icon';
import Heading from '../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function EvaluationQuestionComponent({
  values,
  handleChange,
  handleNext,
  handleGoBack,
  isLoading,
  handleAddQuestion,
}: IEvaluationTypeEnum) {
  return (
    <>
      {values.map((question: any, index: any) => (
        <>
          <div className="flex justify-between w-2/3 bg-main px-6 py-10 mt-8" key={index}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}>
              <DropdownMolecule
                width="64"
                name="Select question type"
                placeholder="Program"
                handleChange={() => {}}
                isMulti
                options={[]}>
                Question type
              </DropdownMolecule>

              <TextAreaMolecule
                name={'description'}
                value=""
                placeholder="Enter question"
                handleChange={() => {}}>
                Question {index + 1}
              </TextAreaMolecule>
            </form>

            <div className="pr-14">
              <div className="flex items-center">
                <Icon name="attach" size={17} fill="primary" />
                <Heading color="primary" fontSize="base">
                  Attach file
                </Heading>
              </div>
            </div>
          </div>
        </>
      ))}
      <Button styleType="text" color="gray" onClick={handleGoBack} disabled={isLoading}>
        Back
      </Button>
      <div className="pt-6 flex flex-col">
        <div className="pb-6">
          <Button styleType="outline" onClick={handleAddQuestion}>
            Add question
          </Button>
        </div>

        <div>
          <Button>Create evaluation</Button>
        </div>
      </div>
    </>
  );
}
