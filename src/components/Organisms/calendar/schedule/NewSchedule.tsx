import React, { FormEvent, useState } from 'react';

import { authenticatorStore } from '../../../../store';
import programStore from '../../../../store/program.store';
import { eventStore } from '../../../../store/timetable/event.store';
import { venueStore } from '../../../../store/timetable/venue.store';
import usersStore from '../../../../store/users.store';
import { SelectData, ValueType } from '../../../../types';
import {
  CreateEventSchedule,
  methodOfInstruction,
  recurringDays,
  scheduleAppliesTo,
  scheduleType,
} from '../../../../types/services/event.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import { IProps } from '../../../Atoms/Input/Textarea';
import CheckboxMolecule from '../../../Molecules/input/CheckboxMolecule';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
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
    methodOfInstruction: methodOfInstruction.LECTURE,
    period: 1,
    plannedEndHour: '',
    plannedScheduleStartDate: '',
    plannedStartHour: '',
    venue: '',
    scheduleType: scheduleType.ONETIME,
  });

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const [currentStep, setcurrentStep] = useState(0);

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();
    // await mutateAsync(values, {
    //   async onSuccess(_data) {
    //     toast.success('Event was created successfully');
    //     history.goBack();
    //   },
    //   onError() {
    //     toast.error('error occurred please try again');
    //   },
    // });
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
    <div>
      <form onSubmit={handleSubmit}>
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
            value={values.scheduleType}
            options={getDropDownStatusOptions(scheduleType)}>
            Event type
          </RadioMolecule>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function SecondStep({ values, handleChange, handleSubmit, setCurrentStep }: IStepProps) {
  // const program = programStore.get().data?.data.data;
  // const programLevels = programStore.getLevelsByAcademicProgram(id).data?.data.data;
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xs">
        <CheckboxMolecule
          isFlex
          options={getDropDownStatusOptions(recurringDays).slice(0, 7)}
          name="repeatson"
          placeholder="Repeat days:"
          handleChange={() => console.log('changed')}
        />
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
              name="appliesTo"
              handleChange={handleChange}
              options={getDropDownStatusOptions(scheduleAppliesTo)}
              placeholder="Select group">
              {`Select ${values.appliesTo?.toLocaleLowerCase()}`}
            </DropdownMolecule>
          </div>
        )}

        <Button type="submit">Create schedule</Button>
      </form>
    </div>
  );
}
