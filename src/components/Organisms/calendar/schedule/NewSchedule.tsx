import React, { FormEvent, useState } from 'react';

import { authenticatorStore } from '../../../../store/administration';
import { levelStore } from '../../../../store/administration/level.store';
import programStore from '../../../../store/administration/program.store';
import usersStore from '../../../../store/administration/users.store';
import { eventStore } from '../../../../store/timetable/event.store';
import { venueStore } from '../../../../store/timetable/venue.store';
import { SelectData, ValueType } from '../../../../types';
import {
  CreateEventSchedule,
  frequencyType,
  methodOfInstruction,
  recurringDays,
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
    startDate: new Date().toLocaleDateString(),
    appliesTo: undefined,
    beneficiaries: undefined,
    event: '',
    methodOfInstruction: methodOfInstruction.LECTURE,
    period: 1,
    plannedEndHour: '',
    plannedScheduleStartDate: '',
    plannedStartHour: new Date().toLocaleTimeString(),
    venue: '',
    frequencyType: frequencyType.ONETIME,
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const [currentStep, setcurrentStep] = useState(0);

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
  }
  return (
    <div>
      <Stepper
        currentStep={currentStep}
        completeStep={currentStep}
        width="w-64"
        isVertical={false}
        isInline={false}
        navigateToStepHandler={() => console.log('submitted')}>
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
      </Stepper>
    </div>
  );
}

function FirstStep({ handleChange, setCurrentStep, values }: IStepProps) {
  const events = eventStore.getAllEvents().data?.data.data;
  const venues = venueStore.getAllVenues().data?.data.data;
  const authUser = authenticatorStore.authUser().data?.data.data;

  const users = usersStore.getUsersByAcademy(authUser?.academy.id + '').data?.data.data;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };
  return (
    <form onSubmit={handleSubmit} className="-mb-6">
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
          name={'scheduleType'}
          value={values.frequencyType}
          options={getDropDownStatusOptions(frequencyType)}>
          Event type
        </RadioMolecule>
      </div>
      <Button type="submit">Next</Button>
    </form>
  );
}

function SecondStep({ values, handleChange, handleSubmit }: IStepProps) {
  const programs = programStore.fetchPrograms().data?.data.data;
  const levels = levelStore.getLevels().data?.data.data;

  return (
    <form onSubmit={handleSubmit} className="max-w-sm -mb-6">
      <InputMolecule
        name="plannedScheduleStartDate"
        placeholder="Intake title"
        type="date"
        value={values.startDate}
        handleChange={handleChange}>
        Start date
      </InputMolecule>
      <InputMolecule
        name="plannedStartHour"
        placeholder="Intake title"
        type="time"
        value={values.plannedStartHour}
        handleChange={handleChange}>
        Planned start time
      </InputMolecule>
      {values.frequencyType === frequencyType.REPEATING ? (
        <CheckboxMolecule
          isFlex
          options={getDropDownStatusOptions(recurringDays).slice(0, 7)}
          name="repeatson"
          placeholder="Repeat days:"
          handleChange={() => console.log('changed')}
        />
      ) : (
        <InputMolecule
          type="time"
          value={values.plannedEndHour}
          name="plannedEndHour"
          placeholder="End time"
          handleChange={handleChange}>
          Planned end hour
        </InputMolecule>
      )}
      <div className="pb-1">
        <DropdownMolecule
          name="appliesTo"
          handleChange={handleChange}
          options={getDropDownStatusOptions(scheduleAppliesTo)}
          placeholder="Select group">
          Event concerns
        </DropdownMolecule>
      </div>
      {values.appliesTo && (
        <div className="pb-1">
          <DropdownMolecule
            name="beneficiaries"
            isMulti
            handleChange={handleChange}
            options={
              (values.appliesTo == scheduleAppliesTo.APPLIES_TO_LEVEL
                ? levels
                : values.appliesTo == scheduleAppliesTo.APPLIES_TO_PROGRAM
                ? programs
                : []
              )?.map((pr) => ({
                value: pr.id + '',
                label: pr.name,
              })) as SelectData[]
            }
            placeholder="Select group">
            {`Select beneficiaries`}
          </DropdownMolecule>
        </div>
      )}
      <div className="pt-3">
        <Button type="submit">Create schedule</Button>
      </div>
    </form>
  );
}
