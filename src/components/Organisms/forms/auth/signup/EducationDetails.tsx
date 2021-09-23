import React, { useState } from 'react';

import { CommonStepProps } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Icon from '../../../../Atoms/custom/Icon';
import Panel from '../../../../Atoms/custom/Panel';
import ILabel from '../../../../Atoms/Text/ILabel';
import Accordion from '../../../../Molecules/Accordion';
import DateMolecule from '../../../../Molecules/input/DateMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';
interface EducationDataType {
  school: string;
  level: string;
  section: string;
  certificate: string;
  start_date: string;
  end_date: string;
}

function EducationDetails({
  details,
  handleChange,
  prevStep,
  nextStep,
}: CommonStepProps) {
  const [educationData, setEducationData] = useState<EducationDataType[]>([]);

  const handleMore = () => {
    setEducationData([...educationData, details]);
    console.log('details', details, 'education', educationData);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <InputMolecule
            placeholder="school"
            name="school"
            value={details.school}
            handleChange={handleChange}>
            School Name
          </InputMolecule>
          <InputMolecule
            placeholder="level"
            name="level"
            value={details.level}
            handleChange={handleChange}>
            Education Level
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="section"
            placeholder="section"
            value={details.section}
            handleChange={handleChange}>
            Education section/ combination
            <span className="text-txt-secondary"> (Write in full abbreviation)</span>
          </InputMolecule>
          <DateMolecule handleDate={handleChange} name="start_date" width="60 md:w-80">
            Start Date
          </DateMolecule>
        </div>
        <div className="my-4">
          <DateMolecule handleDate={handleChange} name="end_date" width="60 md:w-80">
            End Date
          </DateMolecule>
        </div>
        <div>
          <div className="mb-3">
            <ILabel weight="bold" size="sm">
              Upload
              <span className="text-txt-secondary"> (certificate)</span>
            </ILabel>
          </div>
          <Button styleType="outline" className="p-0">
            <span className="flex items-center">
              <Icon name="attach" fill="primary" />
              <span className="m-auto font-semibold">Upload</span>
            </span>
          </Button>
        </div>
        <div>
          <Button onClick={handleMore}>Add more</Button>
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
        <Accordion>
          {educationData.map((educ) => {
            return (
              <Panel key={educ.school} title={educ.school} subtitle={educ.level}>
                <div className="font-semibold">{educ.section}</div>
                <div>Start Date: {educ.start_date}</div>
                <div>End Date: {educ.end_date}</div>
                <div className="flex items-center">
                  <Icon name="attach" fill="primary" />
                  <span className="border-txt-primary border-b font-medium">
                    Certificate / File name{' '}
                  </span>
                </div>
              </Panel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default EducationDetails;
