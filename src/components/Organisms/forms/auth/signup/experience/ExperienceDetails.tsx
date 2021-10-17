import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { experienceStore } from '../../../../../../store/experience.store';
import { ValueType } from '../../../../../../types';
import {
  ExperienceInfo,
  ExperienceTypeStatus,
} from '../../../../../../types/services/experience.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Icon from '../../../../../Atoms/custom/Icon';
import Panel from '../../../../../Atoms/custom/Panel';
import Heading from '../../../../../Atoms/Text/Heading';
import Accordion from '../../../../../Molecules/Accordion';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

function ExperienceDetails(props: any) {
  const history = useHistory();
  const { mutateAsync } = experienceStore.updateExperience();

  const [experienceData, setExperienceData] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    id: '',
    level: '',
    location: '',
    occupation: '',
    person_id: '',
    proof: '',
    start_date: '',
    type: ExperienceTypeStatus.GENERAL_EDUCATION,
  });

  const experiences = experienceStore.getPersonExperiences(
    props.location.state.detail.person_id,
  );
  useEffect(() => {
    experiences.data?.data.data.length &&
      setTotalExperience({ ...experiences.data?.data.data });
  }, [experiences.data]);

  const [totalExperience, setTotalExperience] = useState<ExperienceInfo[]>([]);

  useEffect(
    //@ts-ignore
    () => setTotalExperience(JSON.parse(localStorage.getItem('totalExperience'))),
    [],
  );

  useEffect(
    //@ts-ignore
    () => localStorage.setItem('totalExperience', totalExperience),
    [totalExperience],
  );

  const handleChange = (e: ValueType) => {
    setExperienceData({ ...experienceData, [e.name]: e.value });
  };

  async function saveData() {
    if (experienceData) {
      await mutateAsync(
        { ...experienceData, person_id: props.location.state.detail.person_id },
        {
          onSuccess() {
            let personInfo = props.location.state.detail;
            toast.success('experience information successfully updated', {
              duration: 1200,
            });
            setTimeout(() => {
              history.push({
                pathname: '/complete-profile/more',
                state: { detail: personInfo },
              });
            }, 900);
          },
          onError() {
            toast.error('An error occurred please try again later');
          },
        },
      );
    }
  }

  async function handleMore() {
    if (experienceData) {
      await mutateAsync(experienceData, {
        onSuccess() {
          toast.success('experience information successfully updated', {
            duration: 1200,
          });
        },
        onError() {
          toast.error('An error occurred please try again later');
        },
      });
    }
    setTotalExperience([...totalExperience, experienceData]);
    setExperienceData({
      attachment_id: '',
      description: '',
      end_date: '',
      id: '',
      level: '',
      location: '',
      occupation: '',
      person_id: '',
      proof: '',
      start_date: '',
      type: experienceData.type,
    });
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full mx-auto px-10 py-20">
      <div className="flex flex-col gap-4">
        <Heading fontSize="2xl" fontWeight="semibold" className="py-3">
          {experienceData.type.replaceAll('_', ' ')}
        </Heading>
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div>
            <div className="flex flex-col gap-4">
              <DropdownMolecule
                name="type"
                handleChange={handleChange}
                defaultValue={getDropDownStatusOptions(ExperienceTypeStatus).find(
                  (exp) => exp.value === experienceData.type,
                )}
                options={getDropDownStatusOptions(ExperienceTypeStatus)}>
                Experience type
              </DropdownMolecule>
              <InputMolecule
                name="level"
                placeholder="Level"
                value={experienceData.level}
                handleChange={handleChange}>
                Education Level
                <span className="text-txt-secondary"> (Write in full abbreviation)</span>
              </InputMolecule>
            </div>
            <div className="flex flex-col gap-4">
              <InputMolecule
                placeholder={`Enter your occupation`}
                name="occupation"
                value={experienceData.occupation}
                handleChange={handleChange}>
                Occupation
              </InputMolecule>
              <TextAreaMolecule
                name="description"
                value={experienceData.description}
                handleChange={handleChange}>
                Description
              </TextAreaMolecule>
            </div>
          </div>
          {/* second column */}
          <div className="px-5">
            <div className="flex flex-col gap-4">
              <DateMolecule
                handleChange={handleChange}
                defaultValue={experienceData.start_date}
                name="start_date"
                startYear={new Date().getFullYear() - 25}
                width="60 md:w-80">
                Start Date
              </DateMolecule>
              <DateMolecule
                handleChange={handleChange}
                name="end_date"
                endYear={new Date().getFullYear() + 50}
                defaultValue={experienceData.end_date}
                width="60 md:w-80">
                End Date
              </DateMolecule>
            </div>
            <div>
              <div className="mb-3">
                <InputMolecule
                  placeholder={`Enter document title (eg: proof, certificate)`}
                  name="proof"
                  value={experienceData.proof}
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
        <div className="flex justify-between">
          <Button styleType="outline" onClick={() => handleMore()}>
            Add more
          </Button>
          <Button onClick={() => saveData()}>Save</Button>
        </div>
      </div>

      <div className="md:px-20 px-5">
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

export default ExperienceDetails;
