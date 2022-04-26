import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UseMutateAsyncFunction } from 'react-query';
import { useHistory } from 'react-router-dom';

import useAuthenticator from '../../../../../../hooks/useAuthenticator';
import { queryClient } from '../../../../../../plugins/react-query';
import { experienceStore } from '../../../../../../store/administration/experience.store';
import { moduleMaterialStore } from '../../../../../../store/administration/module-material.store';
import {
  CommonFormProps,
  CommonStepProps,
  Response,
  ValueType,
} from '../../../../../../types';
import {
  ExperienceInfo,
  ExperienceType,
} from '../../../../../../types/services/experience.types';
import { experienceFormSchema } from '../../../../../../validations/complete-profile/experience-form.validtation';
import Button from '../../../../../Atoms/custom/Button';
import Icon from '../../../../../Atoms/custom/Icon';
import Panel from '../../../../../Atoms/custom/Panel';
import FileUploader from '../../../../../Atoms/Input/FileUploader';
import Heading from '../../../../../Atoms/Text/Heading';
import Accordion from '../../../../../Molecules/Accordion';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface IExperienceForm<E> extends CommonStepProps, CommonFormProps<E> {
  skip?: () => void;
  type: ExperienceType;
}

interface ExperienceInfoErrors
  extends Pick<
    ExperienceInfo,
    'end_date' | 'level' | 'location' | 'occupation' | 'proof' | 'start_date'
  > {}

function ExperienceForm<E>({
  isVertical,
  nextStep,
  prevStep,
  skip,
  display_label,
  type,
}: IExperienceForm<E>) {
  const { user } = useAuthenticator();
  const history = useHistory();

  const initialErrorState: ExperienceInfoErrors = {
    level: '',
    start_date: '',
    end_date: '',
    location: '',
    occupation: '',
    proof: '',
  };

  const [errors, setErrors] = useState<ExperienceInfoErrors>(initialErrorState);

  const [experience, setExperience] = useState<ExperienceInfo>({
    attachment_id: '',
    description: '',
    end_date: '',
    level: '',
    location: '',
    occupation: '',
    person_id: user?.person.id.toString() || '',
    proof: '',
    start_date: '',
    type: type,
  });

  const [file, setFile] = useState<File | null>(null);

  const { mutate } = moduleMaterialStore.addFile();

  useEffect(() => {
    setExperience((exp) => {
      return { ...exp, person_id: user?.person.id.toString() || '' };
    });
  }, [user?.person.id]);

  useEffect(() => {
    setExperience((exp) => {
      return { ...exp, type: type };
    });
  }, [type]);

  const { mutateAsync } = experienceStore.create();
  function saveData(
    mutateAsync: UseMutateAsyncFunction<
      AxiosResponse<Response<ExperienceInfo>>,
      unknown,
      ExperienceInfo,
      unknown
    >,
  ) {
    if (file) {
      let formData = new FormData();
      formData.append('file', file);

      mutate(formData, {
        onSuccess(data) {
          toast.success(data.data.message);
          mutateAsync(
            {
              ...experience,
              attachment_id: data.data.data.id + '',
            },
            {
              onSuccess(data) {
                toast.success(data.data.message);
                queryClient.invalidateQueries(['experience/id', user?.person.id]);
                setExperience({
                  attachment_id: '',
                  description: '',
                  end_date: '',
                  level: '',
                  location: '',
                  occupation: '',
                  person_id: user?.person.id.toString() || '',
                  proof: '',
                  start_date: '',
                  type: experience.type,
                });
                setTotalExperience([]);
                nextStep(true);
              },
              onError(error: any) {
                toast.error(error.response.data.message);
              },
            },
          );
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      });
    } else {
      mutateAsync(experience, {
        onSuccess(data) {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['experience/id', user?.person.id]);
          setExperience({
            attachment_id: '',
            description: '',
            end_date: '',
            level: '',
            location: '',
            occupation: '',
            person_id: user?.person.id.toString() || '',
            proof: '',
            start_date: '',
            type: experience.type,
          });
          setTotalExperience([]);
          nextStep(true);
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      });
    }
  }

  const handleChange = (e: ValueType) => {
    setExperience({ ...experience, [e.name]: e.value });
  };

  const handleUpload = (files: FileList | null) => {
    if (files) {
      setFile(files[0]);
    }
  };

  const [totalExperience, setTotalExperience] = useState<ExperienceInfo[]>([]);

  const moveForward = () => {
    const validatedForm = experienceFormSchema.validate(experience, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        if (saveData) {
          saveData(mutateAsync);
        }
      })
      .catch((err) => {
        const validatedErr: ExperienceInfoErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof ExperienceInfoErrors] = el.message;
        });
        setErrors(validatedErr);
      });
  };

  async function handleMore() {
    const validatedForm = experienceFormSchema.validate(experience, {
      abortEarly: false,
    });

    validatedForm
      .then(() => {
        if (experience) {
          mutateAsync(experience, {
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
              history.goBack();
            },
            onError(error: any) {
              toast.error(error.response.data.message);
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
          person_id: user?.person.id.toString() || '',
          proof: '',
          start_date: '',
          type: experience.type,
        });
      })
      .catch((err) => {
        const validatedErr: ExperienceInfoErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof ExperienceInfoErrors] = el.message;
        });
        setErrors(validatedErr);
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
                required={false}
                error={errors.level}
                name="level"
                placeholder="Name"
                value={experience.level}
                handleChange={handleChange}>
                {display_label.replaceAll('_', ' ')}
                <span className="text-txt-secondary normal-case">
                  ( Write in full abbreviation )
                </span>
              </InputMolecule>
            </div>
            <div className="flex flex-col gap-4">
              <InputMolecule
                required={false}
                error={errors.occupation}
                placeholder={`Enter your occupation`}
                name="occupation"
                value={experience.occupation}
                handleChange={handleChange}>
                Occupation
              </InputMolecule>
              <InputMolecule
                required={false}
                error={errors.location}
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
                error={errors.start_date}
                handleChange={handleChange}
                defaultValue={experience.start_date}
                name="start_date"
                // startYear={new Date().getFullYear() - 25}
                width="60 md:w-80">
                Start Date
              </DateMolecule>
              <DateMolecule
                error={errors.end_date}
                handleChange={handleChange}
                name="end_date"
                // endYear={new Date().getFullYear() + 50}
                defaultValue={experience.end_date}
                width="60 md:w-80">
                End Date
              </DateMolecule>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <InputMolecule
                  required={false}
                  error={errors.proof}
                  placeholder={`Enter document title (eg: proof, certificate)`}
                  name="proof"
                  value={experience.proof}
                  handleChange={handleChange}>
                  Document title
                </InputMolecule>
              </div>
            </div>
            <div className="py-2">
              <FileUploader
                allowPreview={false}
                handleUpload={handleUpload}
                accept={'application/pdf, image/*'}>
                <Button type="button" styleType="outline" icon={true}>
                  <span className="flex items-center">
                    <Icon name={'attach'} fill="primary" />
                    <span className="pr-3">Attach file</span>
                  </span>
                </Button>
              </FileUploader>
            </div>
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
                <div>Name: {exp.level}</div>
                <div>Start Date: {exp.start_date}</div>
                <div>End Date: {exp.end_date}</div>
                <div className="flex items-center">
                  <Icon name="attach" fill="primary" />
                  <span className="border-txt-primary border-b font-small">
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
