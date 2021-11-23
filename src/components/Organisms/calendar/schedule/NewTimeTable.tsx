import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { authenticatorStore } from '../../../../store/administration';
import usersStore from '../../../../store/administration/users.store';
import { eventStore } from '../../../../store/timetable/event.store';
import { scheduleStore } from '../../../../store/timetable/schedule.store';
import { venueStore } from '../../../../store/timetable/venue.store';
import { SelectData, ValueType } from '../../../../types';
import {
  createRecurringSchedule,
  daysOfWeek,
  ICreateClassTimeTable,
} from '../../../../types/services/schedule.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import CheckboxMolecule from '../../../Molecules/input/CheckboxMolecule';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IStepProps {
  handleChange: (_e: ValueType) => any;
  setCurrentStep: Function;
  values: ICreateClassTimeTable;
  handleSubmit?: (_e: FormEvent) => any;
}

export default function NewTimeTable() {
  const [values, setvalues] = useState<ICreateClassTimeTable>({
    instructor: '',
    intakeLevelClass: '',
    schedular: '',
    subjectAcademicYearPeriod: '',
    timetable: [],
    startHour: '',
    endHour: '',
    repeatingDays: [],
  });

  //state varibales
  const [currentStep, setcurrentStep] = useState(0);
  const history = useHistory();

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const { mutateAsync } = scheduleStore.createClassTimetable();

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

    mutateAsync(data, {
      async onSuccess(_data) {
        toast.success('Timetable was created successfully');
        //   queryClient.invalidateQueries(['schedules/level-intake/:id', id]);
        //   queryClient.invalidateQueries(['schedules/program/:id', id]);
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
  );
}

function FirstStep({ handleChange, setCurrentStep, values }: IStepProps) {
  const events = eventStore.getAllEvents().data?.data.data;
  const authUser = authenticatorStore.authUser().data?.data.data;

  const users = usersStore.getUsersByAcademy(authUser?.academy.id + '').data?.data.data;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="-mb-6">
        <div className="pb-1">
          <DropdownMolecule
            name="intakeLevelClass"
            handleChange={handleChange}
            options={
              events?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]
            }
            placeholder="Select event">
            Level - class
          </DropdownMolecule>
        </div>
        <div className="pb-1">
          <DropdownMolecule
            name="subjectAcademicYearPeriod"
            handleChange={handleChange}
            options={
              events?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]
            }
            placeholder="Select event">
            Subject in academic period
          </DropdownMolecule>
        </div>
        <div className="pb-1">
          <DropdownMolecule
            name="schedular"
            handleChange={handleChange}
            options={
              events?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]
            }
            placeholder="Select event">
            Schedule
          </DropdownMolecule>
        </div>
        <div className="pb-4">
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
            Instructor
          </DropdownMolecule>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function SecondStep({ values, handleChange, handleSubmit, setCurrentStep }: IStepProps) {
  const venues = venueStore.getAllVenues().data?.data.data;
  return (
    <form onSubmit={handleSubmit} className="max-w-sm -mb-6">
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
        options={getDropDownStatusOptions(daysOfWeek).slice(0, 6)}
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
