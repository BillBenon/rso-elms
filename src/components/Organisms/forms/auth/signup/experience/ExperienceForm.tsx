import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { experienceStore } from '../../../../../../store/experience.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import { ExperienceInfo } from '../../../../../../types/services/experience.types';
import Button from '../../../../../Atoms/custom/Button';
import Icon from '../../../../../Atoms/custom/Icon';
import Panel from '../../../../../Atoms/custom/Panel';
import Heading from '../../../../../Atoms/Text/Heading';
import Accordion from '../../../../../Molecules/Accordion';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface IExperienceForm<E> extends CommonStepProps, CommonFormProps<E> {
  experience: ExperienceInfo;
  setExperience: React.Dispatch<React.SetStateAction<ExperienceInfo>>;
  saveData: () => Promise<boolean>;
}

function ExperienceForm<E>({
  experience,
  setExperience,
  isVertical,
  nextStep,
  prevStep,
  display_label,
  saveData,
}: IExperienceForm<E>) {
  const { mutateAsync } = experienceStore.create();

  const handleChange = (e: ValueType) => {
    setExperience({ ...experience, [e.name]: e.value });
  };
  const [totalExperience, setTotalExperience] = useState<ExperienceInfo[]>([]);

  const moveForward = async () => {
    if (saveData) {
      const isSuccess = await saveData();
      if (isSuccess) nextStep;
    }
  };

  async function handleMore() {
    if (experience) {
      await mutateAsync(experience, {
        onSuccess() {
          toast.success(
            `${experience.type.replaceAll(
              '_',
              ' ',
            )} experience information successfully added`,
            {
              duration: 1200,
            },
          );
        },
        onError() {
          toast.error('An error occurred please try again later');
        },
      });
    }
    setTotalExperience([...totalExperience, experience]);
    setExperience({
      attachment_id: '',
      description: '',
      end_date: '',
      id: 0,
      level: '',
      location: '',
      occupation: '',
      person_id: '',
      proof: '',
      start_date: '',
      type: experience.type,
    });
  }

  const moveBack = () => {
    prevStep && prevStep();
  };
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full mx-auto">
      <div className="">
        {!isVertical && (
          <Heading fontSize="2xl" fontWeight="semibold" className="py-3">
            {display_label.replaceAll('_', ' ')}
          </Heading>
        )}
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div>
            <div className="flex flex-col gap-4">
              <InputMolecule
                name="level"
                placeholder="Level"
                value={experience.level}
                handleChange={handleChange}>
                Education Level
                <span className="text-txt-secondary normal-case">
                  {' '}
                  (Write in full abbreviation)
                </span>
              </InputMolecule>
            </div>
            <div className="flex flex-col gap-4">
              <InputMolecule
                placeholder={`Enter your occupation`}
                name="occupation"
                value={experience.occupation}
                handleChange={handleChange}>
                Occupation
              </InputMolecule>
              <TextAreaMolecule
                name="description"
                value={experience.description}
                handleChange={handleChange}>
                Description
              </TextAreaMolecule>
            </div>
          </div>
          {/* second column */}
          <div className="lg:pl-28">
            <div className="flex flex-col gap-4">
              <DateMolecule
                handleChange={handleChange}
                defaultValue={experience.start_date}
                name="start_date"
                startYear={new Date().getFullYear() - 25}
                width="60 md:w-80">
                Start Date
              </DateMolecule>
              <DateMolecule
                handleChange={handleChange}
                name="end_date"
                endYear={new Date().getFullYear() + 50}
                defaultValue={experience.end_date}
                width="60 md:w-80">
                End Date
              </DateMolecule>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <InputMolecule
                  placeholder={`Enter document title (eg: proof, certificate)`}
                  name="proof"
                  value={experience.proof}
                  handleChange={handleChange}>
                  Document title
                </InputMolecule>
              </div>
              <Button styleType="outline" className="p-0">
                <span className="flex items-center">
                  <Icon name="attach" useheightandpadding={false} fill="primary" />
                  <span className="m-auto font-semibold">Upload</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="py-3">
          <Button styleType="outline" onClick={() => handleMore()}>
            Add more
          </Button>
        </div>
        <div className="py-5 flex justify-between">
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

      <div className="md:pl-20 px-5">
        {totalExperience.length > 0 && <p className="py-3">Experiences</p>}
        <Accordion>
          {totalExperience.map((exp) => {
            return (
              <Panel
                bgColor="tertiary"
                key={exp.type}
                title={exp.type.replaceAll('_', ' ')}
                subtitle={exp.description}>
                <div>Occupation: {exp.occupation}</div>
                <div>Level: {exp.level}</div>
                <div>Start Date: {exp.start_date}</div>
                <div>End Date: {exp.end_date}</div>
                <div className="flex items-center">
                  <Icon name="attach" fill="primary" />
                  <span className="border-txt-primary border-b font-medium">
                    {exp.proof}
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

export default ExperienceForm;
