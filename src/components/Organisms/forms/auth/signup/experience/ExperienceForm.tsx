import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UseMutateAsyncFunction } from 'react-query';

import { authenticatorStore } from '../../../../../../store/administration';
import { experienceStore } from '../../../../../../store/administration/experience.store';
import {
  CommonFormProps,
  CommonStepProps,
  Response,
  ValueType,
} from '../../../../../../types';
import {
  ExperienceInfo,
  ExperienceTypeStatus,
} from '../../../../../../types/services/experience.types';
import Button from '../../../../../Atoms/custom/Button';
import Icon from '../../../../../Atoms/custom/Icon';
import Panel from '../../../../../Atoms/custom/Panel';
import Heading from '../../../../../Atoms/Text/Heading';
import Accordion from '../../../../../Molecules/Accordion';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface IExperienceForm<E> extends CommonStepProps, CommonFormProps<E> {
  skip?: () => void;
  type: ExperienceTypeStatus;
}

function ExperienceForm<E>({
  isVertical,
  nextStep,
  prevStep,
  skip,
  display_label,
  type,
}: IExperienceForm<E>) {
  const authUser = authenticatorStore.authUser().data?.data.data;

  const [experience, setExperience] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    level: '',
    location: '',
    occupation: '',
    person_id: authUser?.person.id.toString() || '',
    proof: '',
    start_date: '',
    type: type,
  });

  useEffect(() => {
    setExperience({ ...experience, person_id: authUser?.person.id.toString() || '' });
  }, [authUser?.person.id]);

  useEffect(() => {
    setExperience({ ...experience, type: type });
  }, [type]);

  const { mutateAsync } = experienceStore.create();
  async function saveData(
    mutateAsync: UseMutateAsyncFunction<
      AxiosResponse<Response<ExperienceInfo>>,
      unknown,
      ExperienceInfo,
      unknown
    >,
  ) {
    let isSuccess: boolean = false;

    if (experience) {
      await mutateAsync(experience, {
        onSuccess() {
          toast.success('experience information successfully added', {
            duration: 1200,
          });
          isSuccess = true;
        },
        onError() {
          toast.error('An error occurred please try again later');
          isSuccess = false;
        },
      });
    }
    return isSuccess;
  }

  const handleChange = (e: ValueType) => {
    setExperience({ ...experience, [e.name]: e.value });
  };
  const [totalExperience, setTotalExperience] = useState<ExperienceInfo[]>([]);

  const moveForward = async () => {
    if (saveData) {
      const isSuccess = await saveData(mutateAsync);
      if (isSuccess) {
        setExperience({
          attachment_id: '',
          description: '',
          end_date: '',
          level: '',
          location: '',
          occupation: '',
          person_id: authUser?.person.id.toString() || '',
          proof: '',
          start_date: '',
          type: experience.type,
        });
        setTotalExperience([]);
        nextStep(true);
      }
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
      level: '',
      location: '',
      occupation: '',
      person_id: authUser?.person.id.toString() || '',
      proof: '',
      start_date: '',
      type: experience.type,
    });
  }

  const moveBack = () => {
    prevStep && prevStep();
  };

  const jump = () => {
    skip && skip();
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full mx-auto">
      <div className="">
        {!isVertical && (
          <Heading fontSize="2xl" fontWeight="semibold" className="py-3">
            {display_label.replaceAll('_', ' ')}
          </Heading>
        )}
        <form action="">
          <div>
            <div className="flex flex-col gap-4">
              <InputMolecule
                name="level"
                placeholder="Level"
                value={experience.level}
                handleChange={handleChange}>
                Education Level
                <span className="text-txt-secondary normal-case">
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
              <InputMolecule
                placeholder={`Enter the location`}
                name="location"
                value={experience.location}
                handleChange={handleChange}>
                Location
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
          <div>
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
            </div>
            <Button styleType="outline" className="h-6 flex items-center">
              <span className="flex items-center">
                <Icon name="attach" useheightandpadding={false} fill="primary" />
                <span className="font-semibold">Upload</span>
              </span>
            </Button>
          </div>
          <div className="py-3">
            <Button styleType="outline" type="button" onClick={() => handleMore()}>
              Add more
            </Button>
          </div>
        </form>
        <div className="py-5 flex justify-between w-80">
          <div className="flex justify-evenly">
            {prevStep && (
              <Button
                styleType="text"
                hoverStyle="no-underline"
                color="txt-secondary"
                onClick={() => moveBack()}>
                Back
              </Button>
            )}
            {skip && (
              <Button
                styleType="text"
                hoverStyle="no-underline"
                color="txt-secondary"
                onClick={() => jump()}>
                Skip
              </Button>
            )}
          </div>
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
