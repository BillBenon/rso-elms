import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import { authenticatorStore } from '../../../../store/administration';
import { classStore } from '../../../../store/administration/class.store';
import {
  getIntakesByAcademy,
  getProgramsByIntake,
} from '../../../../store/administration/intake.store';
import { getAllEvents } from '../../../../store/timetable/event.store';
import { getAllVenues } from '../../../../store/timetable/venue.store';
import intakeProgramStore from '../../../../store/administration/intake-program.store';
import programStore from '../../../../store/administration/program.store';
import usersStore from '../../../../store/administration/users.store';
import { scheduleStore } from '../../../../store/timetable/calendar.store';
import { ParamType, SelectData, ValueType } from '../../../../types';
import {
  CreateEventSchedule,
  createRecurringSchedule,
  daysOfWeek,
  frequencyType,
  methodOfInstruction,
  scheduleAppliesTo,
} from '../../../../types/services/schedule.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import CheckboxMolecule from '../../../Molecules/input/CheckboxMolecule';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IStepProps {
  handleChange: (_e: ValueType) => any;
  setCurrentStep: Function;
  values: CreateEventSchedule;
  handleSubmit?: (_e: FormEvent) => any;
}

export default function NewSchedule() {
  const [values, setvalues] = useState<CreateEventSchedule>({
    appliesTo: undefined,
    beneficiaries: undefined,
    event: '',
    methodOfInstruction: methodOfInstruction.LEC,
    period: 1,
    plannedEndHour: '',
    plannedScheduleStartDate: new Date().toLocaleDateString(),
    plannedScheduleEndDate: new Date().toLocaleDateString(),
    plannedStartHour: new Date().toLocaleTimeString(),
    venue: '',
    frequencyType: frequencyType.ONETIME,
    //not to send to backend
    repeatingDays: [],
    intake: '',
    program: '',
    level: '',
  });

  //state varibales
  const [currentStep, setcurrentStep] = useState(0);
  const history = useHistory();
  const { id } = useParams<ParamType>();

  const { mutateAsync } = scheduleStore.createEventSchedule();

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    let data: CreateEventSchedule = { ...values };

    if (values.frequencyType == frequencyType.RECURRING) {
      data = {
        ...values,
        recurringSchedule: values.repeatingDays.map((d) => ({
          dayOfWeek: d,
          endHour: values.plannedEndHour,
          startHour: values.plannedStartHour,
        })) as createRecurringSchedule[],
      };
    }

    mutateAsync(data, {
      async onSuccess(_data) {
        toast.success('Schedule was created successfully');
        queryClient.invalidateQueries(['schedules/level-intake/:id', id]);
        queryClient.invalidateQueries(['schedules/program/:id', id]);
        history.goBack();
      },
      onError() {
        toast.error('error occurred please try again');
      },
    });
  }
  return (
    <div>
      <Stepper
        currentStep={currentStep}
        completeStep={currentStep}
        width="w-32"
        isVertical={false}
        isInline={false}
        navigateToStepHandler={() => {}}>
        <FirstStep
          values={values}
          handleChange={handleChange}
          setCurrentStep={setcurrentStep}
        />
        <SecondStep
          values={values}
          handleChange={handleChange}
          setCurrentStep={setcurrentStep}
          handleSubmit={handleSubmit}
        />
        <ThirdStep
          values={values}
          handleChange={handleChange}
          setCurrentStep={setcurrentStep}
          handleSubmit={handleSubmit}
        />
      </Stepper>
    </div>
  );
}

function FirstStep({ handleChange, setCurrentStep, values }: IStepProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;

  const events = getAllEvents(authUser?.academy.id + '').data?.data.data;
  const venues = getAllVenues(authUser?.academy.id + '').data?.data.data;

  const users = usersStore.getUsersByAcademy(authUser?.academy.id + '').data?.data.data;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };
  return (
    <form onSubmit={handleSubmit} className="-mb-6">
      <div className="hidden">
        <InputMolecule value={authUser?.academy.id} name={'academyId'}>
          Academy id
        </InputMolecule>
      </div>
      <div className="pb-1">
        <DropdownMolecule
          name="event"
          handleChange={handleChange}
          options={
            events?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]
          }
          placeholder="Select event">
          Event
        </DropdownMolecule>
      </div>
      <div className="pb-1">
        <DropdownMolecule
          name="venue"
          handleChange={handleChange}
          options={
            venues?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]
          }
          placeholder="Select venue">
          Venue
        </DropdownMolecule>
      </div>
      <div className="pb-1">
        <DropdownMolecule
          name="user_in_charge"
          handleChange={handleChange}
          options={
            users?.map((user) => ({
              label: `${user.person.first_name} ${user.person.last_name}`,
              value: user.id,
            })) as SelectData[]
          }
          placeholder="Select someone">
          Who is in charge?
        </DropdownMolecule>
      </div>
      <div className="pb-4">
        <RadioMolecule
          type="block"
          handleChange={handleChange}
          name={'frequencyType'}
          value={values.frequencyType}
          options={getDropDownStatusOptions(frequencyType)}>
          Event type
        </RadioMolecule>
      </div>
      <Button type="submit">Next</Button>
    </form>
  );
}

function SecondStep({ handleChange, setCurrentStep, values }: IStepProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm -mb-6">
      <InputMolecule
        name="plannedStartHour"
        placeholder="Intake title"
        type="time"
        value={values.plannedStartHour}
        handleChange={handleChange}>
        Planned start hour
      </InputMolecule>
      <InputMolecule
        type="time"
        value={values.plannedEndHour}
        name="plannedEndHour"
        placeholder="End time"
        handleChange={handleChange}>
        Planned end hour
      </InputMolecule>
      <InputMolecule
        name="plannedScheduleStartDate"
        placeholder="Intake title"
        type="date"
        value={values.plannedScheduleStartDate.toLocaleString()}
        handleChange={handleChange}>
        Schedule Start date
      </InputMolecule>
      {values.frequencyType === frequencyType.RECURRING ? (
        <CheckboxMolecule
          isFlex
          options={getDropDownStatusOptions(daysOfWeek).slice(0, 7)}
          name="repeatingDays"
          placeholder="Repeat days:"
          handleChange={handleChange}
          values={values.repeatingDays}
        />
      ) : values.frequencyType === frequencyType.DATE_RANGE ? (
        <InputMolecule
          name="plannedScheduleEndDate"
          placeholder="Intake title"
          type="date"
          value={values.plannedScheduleEndDate.toLocaleString()}
          handleChange={handleChange}>
          Repetition end date
        </InputMolecule>
      ) : (
        <></>
      )}

      <div className="pt-3 flex justify-between w-80">
        <Button styleType="text" onClick={() => setCurrentStep(0)}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}

function ThirdStep({ values, handleChange, handleSubmit, setCurrentStep }: IStepProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;
  let academyId = authUser?.academy.id + '';

  const programs = (programStore.fetchPrograms().data?.data.data || []).map((pr) => ({
    value: pr.id + '',
    label: pr.name,
  })) as SelectData[];

  const intakes = getIntakesByAcademy(
    academyId,
    false,
    academyId.length > 1,
  ).data?.data.data.map((intake) => ({
    value: intake.id,
    label: intake.code,
  })) as SelectData[];

  const programIntakes = (
    getProgramsByIntake(values.intake, values.intake.length > 1).data?.data.data || []
  ).map((pi) => ({ value: pi.id, label: pi.program.name })) as SelectData[];

  const levels = (
    intakeProgramStore.getLevelsByIntakeProgram(values.program!).data?.data.data || []
  ).map((lv) => ({
    label: lv.academic_program_level.level.name,
    value: lv.id,
  })) as SelectData[];

  const classes = (classStore.getAllClasses().data?.data.data || [])
    .filter(
      (cl) => cl.academic_year_program_intake_level.intake_program.id == values.program,
    )
    .map((cls) => ({
      label: `${cls.academic_year_program_intake_level.academic_program_level.level.name} - ${cls.class_name}`,
      value: cls.id,
    })) as SelectData[];

  return (
    <form onSubmit={handleSubmit} className="max-w-sm -mb-6">
      <DropdownMolecule
        name="appliesTo"
        handleChange={handleChange}
        options={getDropDownStatusOptions(scheduleAppliesTo)}
        placeholder="Select group">
        Event concerns
      </DropdownMolecule>

      {(values.appliesTo == scheduleAppliesTo.APPLIES_TO_LEVEL ||
        values.appliesTo == scheduleAppliesTo.APPLIES_TO_CLASS) && (
        <>
          <DropdownMolecule
            name="intake"
            handleChange={handleChange}
            options={intakes}
            placeholder="Select intake">
            Intake
          </DropdownMolecule>
          <DropdownMolecule
            name="program"
            handleChange={handleChange}
            options={programIntakes}
            placeholder="Select program">
            Program
          </DropdownMolecule>
        </>
      )}

      <DropdownMolecule
        name="beneficiaries"
        isMulti
        handleChange={handleChange}
        options={
          values.appliesTo == scheduleAppliesTo.APPLIES_TO_PROGRAM
            ? programs
            : values.appliesTo == scheduleAppliesTo.APPLIES_TO_LEVEL
            ? levels
            : values.appliesTo == scheduleAppliesTo.APPLIES_TO_CLASS
            ? classes
            : []
        }
        placeholder="Select group">
        {`Select ${values.appliesTo?.split('_')[2]}`}
      </DropdownMolecule>
      <RadioMolecule
        options={getDropDownStatusOptions(methodOfInstruction)}
        handleChange={handleChange}
        name={'methodOfInstruction'}
        value={values.methodOfInstruction}>
        Method of Instruction
      </RadioMolecule>
      <div className="pt-8 flex justify-between w-80">
        <Button styleType="text" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button type="submit">Create schedule</Button>
      </div>
    </form>
  );
}
