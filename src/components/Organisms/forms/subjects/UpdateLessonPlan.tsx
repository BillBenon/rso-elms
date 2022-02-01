import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

import { queryClient } from '../../../../plugins/react-query';
import { lessonStore } from '../../../../store/administration/lesson.store';
import { ValueType } from '../../../../types';
import { LessonPlan } from '../../../../types/services/lesson.types';
import { formatDateToIso, formatDateToYyMmDd } from '../../../../utils/date-helper';
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
interface ParamType {
  planId: string;
}
function UpdateLessonPlan() {
  const { planId } = useParams<ParamType>();
  const [currentStep, setCurrentStep] = useState(0);
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

  const { mutateAsync } = lessonStore.modifyLessonPlan();

  const plan = lessonStore.getLessonPlanById(planId);

  useEffect(() => {
    if (plan.data) {
      const _plan = plan?.data.data.data;
      setlessonPlan({
        id: _plan.id,
        class_policy: _plan.class_policy,
        end_time: _plan.end_time,
        grading: _plan.grading,
        instructor_id: _plan.instructor.id + '',
        lesson_id: _plan.lesson.id + '',
        lesson_objective: _plan.lesson_objective,
        lesson_requirements: _plan.lesson_requirements,
        start_time: _plan.start_time,
        text_books: _plan.text_books,
      });
    }
  }, [plan.data]);

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    if (currentStep === 0) setCurrentStep(currentStep + 1);
    else {
      await mutateAsync(
        {
          ...lessonPlan,
          start_time: formatDateToIso(lessonPlan.start_time),
          end_time: formatDateToIso(lessonPlan.end_time),
        },
        {
          async onSuccess(data) {
            toast.success(data.data.message);
            queryClient.invalidateQueries(['lessonplan/lesson/id']);
            history.go(-1);
          },
          onError(error: any) {
            toast.error(error.response.data.message || 'error occurred please try again');
          },
        },
      );
    }
  }

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
        value={
          lessonPlan.start_time
            ? formatDateToYyMmDd(lessonPlan.start_time)
            : lessonPlan.start_time
        }
        name="start_time"
        type="date"
        handleChange={handleChange}>
        Start Date
      </InputMolecule>
      <InputMolecule
        value={
          lessonPlan.end_time
            ? formatDateToYyMmDd(lessonPlan.end_time)
            : lessonPlan.end_time
        }
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
export default UpdateLessonPlan;
