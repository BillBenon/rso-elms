import React, { useState } from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Panel from '../../../../Atoms/custom/Panel';
import Accordion from '../../../../Molecules/Accordion';
import DateMolecule from '../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../Molecules/input/TextAreaMolecule';
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
}: CommonStepProps) {
  const [experienceData, setExperienceData] = useState<ExperienceDataType[]>([]);

  const handleMore = () => {
    setExperienceData([...experienceData, details]);
    console.log('details', details, 'education', experienceData);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
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
            handleChange={handleChange}>
            {details.type}
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <TextAreaMolecule
            name="diseaseDescription"
            value={details.description}
            handleChange={handleChange}>
            Description
          </TextAreaMolecule>
          <DateMolecule handleDate={handleChange} name="startDate" width="60 md:w-80">
            Start Date
          </DateMolecule>
        </div>
        <div className="my-4">
          <DateMolecule handleDate={handleChange} name="endDate" width="60 md:w-80">
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
            <Button styleType="text" color="txt-secondary" onClick={() => prevStep()}>
              Back
            </Button>
          )}
          <Button onClick={() => nextStep()}>Next</Button>
        </div>
      </div>

      <div className=" w-80">
        <p>{details.type}</p>
        <Accordion>
          {experienceData.map((educ) => {
            return (
              <Panel key={educ.type} title={educ.type} subtitle={educ.description}>
                <div>Start Date: {educ.startDate}</div>
                <div>End Date: {educ.endDate}</div>
              </Panel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default ExperienceDetails;
