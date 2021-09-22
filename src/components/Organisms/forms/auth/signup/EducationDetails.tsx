import React, { useState } from 'react';

import { ValueType } from '../../../../../types';
import Accordion from '../../../../Atoms/custom/Accordion';
import Button from '../../../../Atoms/custom/Button';
import Icon from '../../../../Atoms/custom/Icon';
import ILabel from '../../../../Atoms/Text/ILabel';
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

const EducationDetails = () => {
  const [details, setDetails] = useState<EducationDataType>({
    school: '',
    level: '',
    section: '',
    certificate: '',
    start_date: '',
    end_date: '',
  });

  const [educationData, setEducationData] = useState<EducationDataType[]>([]);

  const movePrev = () => {
    window.alert('movePrev');
  };

  const moveNext = () => {
    window.alert('moveNext');
  };

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  const handleMore = () => {
    setEducationData([...educationData, details]);
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
            <span className="text-txt-secondary">(Write in full abbreviation)</span>
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
          <Button styleType="outline">
            <div className="flex">
              <Icon name="attach" stroke="primary" />
              <span className="m-auto font-semibold">Upload</span>
            </div>
          </Button>
        </div>
        <div>
          <Button onClick={handleMore}>Add more</Button>
        </div>
        <div className="flex justify-between">
          <Button styleType="text" color="txt-secondary" onClick={movePrev}>
            Back
          </Button>
          <Button onClick={moveNext}>Next</Button>
        </div>
      </div>

      <div className=" w-80">
        {educationData.map((educ) => {
          return (
            <Accordion key={educ.school} title={educ.school} subtitle={educ.level}>
              <div className="font-semibold">{educ.section}</div>
              <div>Start Date: {educ.start_date}</div>
              <div>End Date: {educ.end_date}</div>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default EducationDetails;
