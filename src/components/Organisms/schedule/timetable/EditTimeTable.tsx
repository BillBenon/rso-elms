import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import usePickedRole from '../../../../hooks/usePickedRole';
import { queryClient } from '../../../../plugins/react-query';
import { classStore } from '../../../../store/administration/class.store';
import { moduleStore } from '../../../../store/administration/modules.store';
import instructordeploymentStore from '../../../../store/instructordeployment.store';
import { timetableStore } from '../../../../store/timetable/timetable.store';
import { getAllVenues } from '../../../../store/timetable/venue.store';
import { SelectData, ValueType } from '../../../../types';
import { IClass } from '../../../../types/services/class.types';
import {
  daysOfWeek,
  IUpdateTimetableActivity,
  methodOfInstruction,
} from '../../../../types/services/schedule.types';
import { getDropDownStatusOptions } from '../../../../utils/getOption';
import {
  firstTimetableSchema,
  secondEditTimetableSchema,
} from '../../../../validations/calendar.validation';
import Button from '../../../Atoms/custom/Button';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';
import Stepper from '../../../Molecules/Stepper/Stepper';

interface IStepProps {
  handleChange: (_e: ValueType) => any;
  setCurrentStep: Function;
  values: IUpdateTimetableActivity;
  handleSubmit?: (_e: FormEvent) => any;
  classInfo?: IClass;
}

interface ParamType {
  classId: string;
  itemId: string;
}

interface FirstTimeTableErrors
  extends Pick<IUpdateTimetableActivity, 'courseModuleId' | 'inChargeId'> {}
interface SecondTimeTableErrors
  extends Pick<IUpdateTimetableActivity, 'venueId' | 'startHour' | 'endHour'> {
  dayOfWeek: string;
}
export default function EditTimeTable() {
  const { classId, itemId } = useParams<ParamType>();
  const history = useHistory();
  //state varibales
  const [currentStep, setcurrentStep] = useState(0);
  const [values, setvalues] = useState<IUpdateTimetableActivity>({
    id: itemId,
    dayOfWeek: daysOfWeek.MONDAY,
    endHour: '',
    startHour: '',
    activityDate: new Date().toLocaleDateString(),
    courseCode: '',
    courseModuleId: '',
    dressCode: '',
    eventId: '',
    inChargeId: '',
    methodOfInstruction: methodOfInstruction.LEC,
    periods: 0,
    venueId: '',
    weeklyTimetableId: '',
  });

  //classinfo
  const classInfo = classStore.getClassById(classId).data?.data.data;
  const { data } = timetableStore.getTimetableActivityById(itemId);

  useEffect(() => {
    setvalues({
      id: itemId,
      dayOfWeek: data?.data.data.day_of_week as daysOfWeek,
      endHour: data?.data.data.end_hour || '',
      startHour: data?.data.data.start_hour || '',
      activityDate: data?.data.data.activity_date || new Date().toLocaleDateString(),
      courseCode: data?.data.data.course_code || '',
      courseModuleId: data?.data.data.course_module?.id.toString() || '',
      dressCode: data?.data.data.dress_code || '',
      eventId: data?.data.data.event.id.toString() || '',
      inChargeId: data?.data.data.in_charge.id.toString() || '',
      methodOfInstruction: methodOfInstruction.LEC,
      periods: data?.data.data.periods || 1,
      venueId: data?.data.data.venue.id.toString() || '',
      weeklyTimetableId: '',
    });
  }, [classId, data?.data, itemId]);

  function handleChange(e: ValueType) {
    setvalues((val) => ({ ...val, [e.name]: e.value }));
  }

  const store = timetableStore.updateTimetableActivityById();

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();

    (await store).mutateAsync(values, {
      async onSuccess(_data) {
        toast.success('Timetable updated successfully');
        queryClient.invalidateQueries(['timetable/intakeclassid/:id', classId]);
        history.goBack();
      },
      onError(error: any) {
        toast.error(error.response.data.message || 'error occurred please try again');
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

function FirstStep({ handleChange, setCurrentStep, values, classInfo }: IStepProps) {
  const picked_role = usePickedRole();
  const { t } = useTranslation();
  const users =
    instructordeploymentStore.getInstructorsDeployedInAcademy(
      picked_role?.academy_id + '',
    ).data?.data.data || [];

  const modules =
    moduleStore.getModulesByProgram(
      classInfo?.academic_year_program_intake_level.academic_program_level.program.id +
        '',
    ).data?.data.data || [];

  const initialErrorState: FirstTimeTableErrors = {
    courseModuleId: '',
    inChargeId: '',
  };

  const [errors, setErrors] = useState<FirstTimeTableErrors>(initialErrorState);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validatedForm = firstTimetableSchema.validate(values, {
      abortEarly: false,
    });

    validatedForm
      .then(() => setCurrentStep(1))
      .catch((err) => {
        const validatedErr: FirstTimeTableErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof FirstTimeTableErrors] = el.message;
        });
        setErrors(validatedErr);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="-mb-6">
        <InputMolecule
          name=""
          readOnly
          disabled
          value={`${classInfo?.academic_year_program_intake_level.academic_program_level.program.name} - ${classInfo?.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.class_name}`}>
          {t('Program')} - Level - {t('Class')}
        </InputMolecule>
        <div className="pb-1">
          <SelectMolecule
            error={errors.courseModuleId}
            name="courseModuleId"
            handleChange={handleChange}
            options={
              modules?.map((mod) => ({
                label: mod.name,
                value: mod.id,
              })) as SelectData[]
            }
            placeholder="Select module"
            value={values.courseModuleId}>
            Module
          </SelectMolecule>
        </div>
        <div className="pb-4">
          <SelectMolecule
            error={errors.inChargeId}
            name="instructor"
            value={values.inChargeId}
            handleChange={handleChange}
            options={
              users?.map((user) => ({
                label: `${user.user.first_name} ${user.user.last_name}`,
                value: user.id,
              })) as SelectData[]
            }
            placeholder="Select someone">
            {t('Instructor')}
          </SelectMolecule>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}

function SecondStep({ values, handleChange, handleSubmit, setCurrentStep }: IStepProps) {
  const picked_role = usePickedRole();
  const venues = getAllVenues(picked_role?.academy_id + '').data?.data.data || [];

  const initialErrorState: SecondTimeTableErrors = {
    venueId: '',
    startHour: '',
    endHour: '',
    dayOfWeek: '',
  };

  const [errors, setErrors] = useState<SecondTimeTableErrors>(initialErrorState);

  const handleFinish = (e: FormEvent) => {
    e.preventDefault();

    const validatedForm = secondEditTimetableSchema.validate(values, {
      abortEarly: false,
    });

    validatedForm
      .then(() => handleSubmit)
      .catch((err) => {
        const validatedErr: SecondTimeTableErrors = initialErrorState;
        err.inner.map((el: { path: string | number; message: string }) => {
          validatedErr[el.path as keyof SecondTimeTableErrors] = el.message;
        });
        setErrors(validatedErr);
      });
  };

  return (
    <form onSubmit={handleFinish} className="max-w-sm -mb-6">
      <SelectMolecule
        name="venue"
        error={errors.venueId}
        value={values.venueId}
        handleChange={handleChange}
        options={venues?.map((vn) => ({ label: vn.name, value: vn.id })) as SelectData[]}
        placeholder="Select venue">
        Venue
      </SelectMolecule>
      <InputMolecule
        error={errors.startHour}
        required={false}
        name="startHour"
        type="time"
        value={values.startHour}
        handleChange={handleChange}>
        Start hour
      </InputMolecule>
      <InputMolecule
        error={errors.endHour}
        required={false}
        type="time"
        value={values.endHour}
        name="endHour"
        handleChange={handleChange}>
        End hour
      </InputMolecule>
      <SelectMolecule
        error={errors.dayOfWeek}
        options={getDropDownStatusOptions(daysOfWeek).slice(0, 7)}
        name="dayOfWeek"
        placeholder="Class date"
        handleChange={handleChange}
        value={values.dayOfWeek}
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
