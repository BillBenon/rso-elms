import React, { useState } from 'react';

import { CommonStepProps } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Panel from '../../../../../Atoms/custom/Panel';
import Heading from '../../../../../Atoms/Text/Heading';
import Accordion from '../../../../../Molecules/Accordion';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface ExperienceDataType {
  type: string;
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
  const handleMore = () => {
    setExperienceData([...experienceData, details]);
    console.log('details', details, 'education', experienceData);
  };

  return (
    <div className={`flex justify-between ${isVertical && 'pt-8'}`}>
      <div className="flex flex-col gap-4">
        {isVertical && (
          <Heading fontSize="base" fontWeight="semibold">
            Experience Details
          </Heading>
        )}

        <div className="flex flex-col gap-4">
          <DropdownMolecule
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
          </DropdownMolecule>
          <InputMolecule
            placeholder={`Enter ${details.type}`}
            name="name"
            value={details.name}
            handleChange={(e) => handleChange(e, 'experienceDetails')}>
            {details.type}
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <TextAreaMolecule
            name="diseaseDescription"
            value={details.description}
            handleChange={(e) => handleChange(e, 'experienceDetails')}>
            Description
          </TextAreaMolecule>
          <DateMolecule
            handleChange={(e) => handleChange(e, 'experienceDetails')}
            name="startDate"
            width="60 md:w-80">
            Start Date
          </DateMolecule>
        </div>
        <div className="my-4">
          <DateMolecule
            handleChange={(e) => handleChange(e, 'experienceDetails')}
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
          <Button onClick={() => nextStep(true)}>Next</Button>
        </div>
      </div>

      <div className=" w-80">
        {experienceData.length > 0 && <p>{details.type}</p>}
        <Accordion>
          {experienceData.map((ex) => {
            return (
              <Panel key={ex.type} title={ex.name} subtitle={ex.description}>
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
