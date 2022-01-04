import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { authenticatorStore } from '../../../../store/administration';
import { classStore } from '../../../../store/administration/class.store';
import { moduleStore } from '../../../../store/administration/modules.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { timetableStore } from '../../../../store/timetable/timetable.store';
import { getAllVenues } from '../../../../store/timetable/venue.store';
import { ParamType, SelectData, ValueType } from '../../../../types';
import { IClass } from '../../../../types/services/class.types';
import {
  createRecurringSchedule,
  daysOfWeek,
  ICreateClassTimeTable,
} from '../../../../types/services/schedule.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import CheckboxMolecule from '../../../Molecules/input/CheckboxMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IStepProps {
  handleChange: (_e: ValueType) => any;
  setCurrentStep: Function;
  values: ICreateClassTimeTable;
  handleSubmit?: (_e: FormEvent) => any;
  classInfo?: IClass;
}

export default function NewTimeTable() {
  const { id } = useParams<ParamType>();
  const history = useHistory();

  //classinfo
  const classInfo = classStore.getClassById(id).data?.data.data;

  //state varibales
  const [currentStep, setcurrentStep] = useState(0);
  const [values, setvalues] = useState<ICreateClassTimeTable>({
    instructor: '',
    timetable: [],
    startHour: '',
    endHour: '',
    repeatingDays: [daysOfWeek.MONDAY],
    courseModule: '',
    venue: '',
    intakeLevelClass: id,
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const { mutateAsync } = timetableStore.createClassTimetable();

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    let timetable = values.repeatingDays.map((d) => ({
      dayOfWeek: d,
      endHour: values.endHour,
      startHour: values.startHour,
    })) as createRecurringSchedule[];

    let data: ICreateClassTimeTable = {
      ...values,
      timetable,
    };

    console.log(data);

    mutateAsync(data, {
      async onSuccess(_data) {
        toast.success('Timetable was created successfully');
        queryClient.invalidateQueries(['timetable/intakeclassid/:id', id]);
        history.goBack();
      },
      onError() {
        toast.error('error occurred please try again');
      },
    });
  }

  return (
    <Stepper
      currentStep={currentStep}
      completeStep={currentStep}
      width="w-64"
      isVertical={false}
      isInline={false}
      navigateToStepHandler={() => {}}>
      <FirstStep
        values={values}
        handleChange={handleChange}
        setCurrentStep={setcurrentStep}
        classInfo={classInfo}
      />
      <SecondStep
        values={values}
        handleChange={handleChange}
        setCurrentStep={setcurrentStep}
        handleSubmit={handleSubmit}
        classInfo={classInfo}
      />
    </Stepper>
  );
}

function FirstStep({ values, handleChange, setCurrentStep, classInfo }: IStepProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;
  const users = instructordeploymentStore.getInstructorsDeployedInAcademy(
    authUser?.academy.id + '',
  ).data?.data.data;

  console.log('====================================');
  console.log(users);
  console.log('====================================');

  const modules =
    moduleStore.getModulesByProgram(
      classInfo?.academic_year_program_intake_level.academic_program_level.program.id +
        '',
    ).data?.data.data || [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="-mb-6">
        <InputMolecule
          name=""
          readOnly
          disabled
          value={`${classInfo?.academic_year_program_intake_level.academic_program_level.program.name} - ${classInfo?.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.class_name}`}>
          Program - Level - class
        </InputMolecule>
        <div className="pb-1">
          <SelectMolecule
            name="courseModule"
            value={values.courseModule}
            handleChange={handleChange}
            options={
              modules?.map((mod) => ({
                label: mod.name,
                value: mod.id,
              })) as SelectData[]
            }
            placeholder="Select module">
            Module
          </SelectMolecule>
        </div>
        <div className="pb-4">
          <SelectMolecule
            name="instructor"
            value={values.instructor}
            handleChange={handleChange}
            options={
              users?.map((user) => ({
                label: `${user.user.first_name} ${user.user.last_name}`,
                value: user.id,
              })) as SelectData[]
            }
            placeholder="Select someone">
            Instructor
          </SelectMolecule>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function SecondStep({ values, handleChange, handleSubmit, setCurrentStep }: IStepProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;
  const venues = getAllVenues(authUser?.academy.id + '').data?.data.data;

  return (
    <form onSubmit={handleSubmit} className="max-w-sm -mb-6">
      <div className="pb-1">
        <SelectMolecule
          name="venue"
          value={values.venue}
          handleChange={handleChange}
          options={
            venues?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]
          }
          placeholder="Select venue">
          Venue
        </SelectMolecule>
      </div>
      <InputMolecule
        name="startHour"
        type="time"
        value={values.startHour}
        handleChange={handleChange}>
        Start hour
      </InputMolecule>
      <InputMolecule
        type="time"
        value={values.endHour}
        name="endHour"
        handleChange={handleChange}>
        End hour
      </InputMolecule>
      <CheckboxMolecule
        isFlex
        options={getDropDownStatusOptions(daysOfWeek).slice(0, 7)}
        name="repeatingDays"
        placeholder="Repeat days:"
        handleChange={handleChange}
        values={values.repeatingDays}
      />
      <div className="pt-4 flex justify-between w-80">
        <Button styleType="text" onClick={() => setCurrentStep(0)}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
