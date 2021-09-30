import React, { useState } from 'react';

import { CommonStepProps, ExperienceType } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Panel from '../../../../../Atoms/custom/Panel';
import Heading from '../../../../../Atoms/Text/Heading';
import Accordion from '../../../../../Molecules/Accordion';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface ExperienceDataType {
  experienceType: {
    type: ExperienceType;
    label: string;
  };
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

function ExperienceDetails({
  details,
  handleChange,
  prevStep,
  nextStep,
  isVertical,
}: CommonStepProps) {
  const [experienceData, setExperienceData] = useState<ExperienceDataType[]>([]);
  const moveBack = () => {
    prevStep && prevStep();
  };
  const moveForward = () => {
    nextStep(true);
  };
  const handleMore = () => {
    setExperienceData([...experienceData, details]);
  };

  return (
    <div className={`flex justify-between ${!isVertical && 'pt-8'}`}>
      <div className="flex flex-col gap-4">
        {!isVertical && (
          <Heading fontSize="base" fontWeight="semibold">
            {details.experienceType.label}
          </Heading>
        )}

        <div className="flex flex-col gap-4">
          {/* <DropdownMolecule
            name="type"
            defaultValue={details.type}
            onChange={handleChange}
            options={[
              { value: 'appointment', label: 'Appointment' },
              { value: 'internationalMission', label: 'International Mission' },
              { value: 'courseCarrier', label: 'Course Carrier' },
              { value: 'decorations', label: 'Decorations' },
            ]}>
            Experience type
          </DropdownMolecule> */}
          <InputMolecule
            placeholder={`Enter ${details.experienceType.label.toLowerCase()}`}
            name="name"
            value={details.name}
            handleChange={(e) => handleChange(e, details.experienceType.type)}>
            {details.experienceType.label}
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <TextAreaMolecule
            name="diseaseDescription"
            value={details.description}
            handleChange={(e) => handleChange(e, details.experienceType.type)}>
            Description
          </TextAreaMolecule>
          <DateMolecule
            handleChange={(e) => handleChange(e, details.experienceType.type)}
            name="startDate"
            width="60 md:w-80">
            Start Date
          </DateMolecule>
        </div>
        <div className="my-4">
          <DateMolecule
            handleChange={(e) => handleChange(e, details.experienceType.type)}
            name="endDate"
            width="60 md:w-80">
            End Date
          </DateMolecule>
        </div>
        <div>
          <Button styleType="outline" onClick={handleMore}>
            Add more
          </Button>
        </div>
        <div className="flex w-80 justify-between">
          {prevStep && (
            <Button
              styleType="text"
              hoverStyle="no-underline"
              color="txt-secondary"
              onClick={() => moveBack()}>
              Back
            </Button>
          )}
          <Button onClick={() => moveForward()}>Next</Button>
        </div>
      </div>

      <div className=" w-80">
        {experienceData.length > 0 && <p>{details.type}</p>}
        <Accordion>
          {experienceData.map((ex) => {
            return (
              <Panel
                key={ex.experienceType.type}
                title={ex.name}
                subtitle={ex.description}>
                <div>Start Date: {ex.startDate}</div>
                <div>End Date: {ex.endDate}</div>
              </Panel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default ExperienceDetails;
