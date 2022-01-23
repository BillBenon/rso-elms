import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import useAuthenticator from '../../../../hooks/useAuthenticator';
import { queryClient } from '../../../../plugins/react-query';
import { lessonStore } from '../../../../store/administration/lesson.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { ParamType, ValueType } from '../../../../types';
import { LessonPlan } from '../../../../types/services/lesson.types';
import { formatDateToIso } from '../../../../utils/date-helper';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IProps {
  lessonPlan: LessonPlan;
  display_label: string;
  handleChange: (_e: ValueType) => any;
  handleNext: <T>(_e: FormEvent<T>) => any;
}

function NewLessonPlan() {
  const { mutateAsync } = lessonStore.addLessonPlan();
  const { user } = useAuthenticator();
  const userId = user?.id;
  const instructor = instructordeploymentStore.getInstructorByUserId(userId + '').data
    ?.data.data[0];

  const { id } = useParams<ParamType>();

  const [lessonPlan, setlessonPlan] = useState<LessonPlan>({
    id: '',
    class_policy: '',
    end_time: '',
    grading: '',
    instructor_id: '',
    lesson_id: '',
    lesson_objective: '',
    lesson_requirements: '',
    start_time: '',
    text_books: '',
  });

  function handleChange(e: ValueType) {
    setlessonPlan({ ...lessonPlan, [e.name]: e.value });
  }

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      await mutateAsync(
        {
          ...lessonPlan,
          start_time: formatDateToIso(lessonPlan.start_time),
          end_time: formatDateToIso(lessonPlan.end_time),
          lesson_id: id,
        },
        {
          async onSuccess(data) {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['lessonplan/lesson/id']);
            history.go(-1);
          },
          onError() {
            toast.error('error occurred please try again');
          },
        },
      );
    }
  }

  useEffect(() => {
    setlessonPlan((lessPlan) => {
      return { ...lessPlan, instructor_id: instructor?.id + '' };
    });
  }, [instructor?.id]);

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full">
      <Stepper
        currentStep={currentStep}
        completeStep={currentStep}
        width="w-64"
        isVertical={false}
        isInline={false}
        navigateToStepHandler={() => {}}>
        <LessonTimeComponent
          display_label="info"
          lessonPlan={lessonPlan}
          handleChange={handleChange}
          handleNext={handleSubmit}
        />
        <LessonTextArea
          display_label="more"
          lessonPlan={lessonPlan}
          handleChange={handleChange}
          handleNext={handleSubmit}
        />
      </Stepper>
    </div>
  );
}

function LessonTimeComponent({ lessonPlan, handleChange, handleNext }: IProps) {
  return (
    <form onSubmit={handleNext}>
      <InputMolecule
        value={lessonPlan.start_time}
        name="start_time"
        type="date"
        handleChange={handleChange}>
        Start Date
      </InputMolecule>
      <InputMolecule
        value={lessonPlan.end_time}
        name="end_time"
        type="date"
        handleChange={handleChange}>
        End Date
      </InputMolecule>
      <InputMolecule
        value={lessonPlan.grading}
        name="grading"
        type="number"
        handleChange={handleChange}>
        Grading
      </InputMolecule>
      <div className="mt-5">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}

function LessonTextArea({ lessonPlan, handleChange, handleNext }: IProps) {
  return (
    <form onSubmit={handleNext}>
      <TextAreaMolecule
        name="lesson_objective"
        value={lessonPlan.lesson_objective}
        handleChange={handleChange}>
        Lesson Objective
      </TextAreaMolecule>
      <TextAreaMolecule
        name="lesson_requirements"
        value={lessonPlan.lesson_requirements}
        handleChange={handleChange}>
        Lesson Requirements
      </TextAreaMolecule>
      <TextAreaMolecule
        name="text_books"
        value={lessonPlan.text_books}
        handleChange={handleChange}>
        Text Books
      </TextAreaMolecule>
      <TextAreaMolecule
        name="class_policy"
        value={lessonPlan.class_policy}
        handleChange={handleChange}>
        Class Policy
      </TextAreaMolecule>
      <div className="mt-5">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default NewLessonPlan;
