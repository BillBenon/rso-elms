import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { subjectStore } from '../../store/administration/subject.store';
import { ValueType } from '../../types';
import {
  AddSubjectPeriod,
  IntakeLevelModule,
  IntakeLevelParam,
  IntakeModuleStatus,
} from '../../types/services/intake-program.types';
import { ExtendedSubjectInfo } from '../../types/services/subject.types';
import {
  getDropDownOptions,
  getDropDownStatusOptions,
  getInstructorIncharge,
} from '../../utils/getOption';

interface IntakePeriodParam extends IntakeLevelParam {
  period: string;
}

function AddSubjectToPeriod() {
  const history = useHistory();
  const { level, period } = useParams<IntakePeriodParam>();

  const { data: levelModuleStore, isLoading: LevelLoading } =
    intakeProgramStore.getModulesByLevel(parseInt(level));

  const [subjectPrd, setSubjectPrd] = useState<AddSubjectPeriod>({
    actualEndOn: '',
    actualStartOn: '',
    inchargeId: '',
    intakeAcademicYearPeriodId: 0,
    intakeProgramModuleLevelId: 0,
    marks: 0,
    plannedEndOn: '',
    plannedStartOn: '',
    satus: IntakeModuleStatus.DRAFT,
    subjectId: '',
  });

  const { mutateAsync } = intakeProgramStore.addSubjectToPeriod();

  function handleChange(e: ValueType) {
    setSubjectPrd((sub) => ({ ...sub, [e.name]: e.value }));
  }

  const pickedModule = levelModuleStore?.data.data.find(
    (lvl) => lvl.id === subjectPrd.intakeProgramModuleLevelId,
  );

  const { data: subjects, isLoading: subjectLoading } = subjectStore.getSubjectsByModule(
    pickedModule?.module.id + '',
  );

  const { data: intakeLevel } = intakeProgramStore.getIntakeLevelById(level);

  const { data: instructors, isLoading: instLoading } =
    enrollmentStore.getInstructorEnrollmentLevelByLevelId(
      intakeLevel?.data.data.academic_program_level.id + '',
    );

  async function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault(); // prevent page to reload:
    await mutateAsync(
      {
        ...subjectPrd,
        intakeAcademicYearPeriodId: parseInt(period),
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['subjects/period']);
          history.goBack();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      },
    );
  }

  return (
    <form onSubmit={submitForm}>
      <DropdownMolecule
        handleChange={handleChange}
        name="intakeProgramModuleLevelId"
        placeholder={LevelLoading ? 'Loading modules' : 'select module'}
        options={getDropDownOptions({
          inputs: levelModuleStore?.data.data || [],
          //@ts-ignore
          getOptionLabel: (lev: IntakeLevelModule) => lev.module.name,
        })}>
        Module
      </DropdownMolecule>
      <DropdownMolecule
        handleChange={handleChange}
        name="subjectId"
        placeholder={subjectLoading ? 'Loading subject' : 'select subject'}
        options={getDropDownOptions({
          inputs: subjects?.data.data || [],
          //@ts-ignore
          getOptionLabel: (sub: ExtendedSubjectInfo) => sub.title,
        })}>
        Subject
      </DropdownMolecule>
      {/* <InputMolecule
        value={subjectPrd.marks}
        name="marks"
        handleChange={handleChange}
        type="number">
        Marks
      </InputMolecule> */}
      <DropdownMolecule
        handleChange={handleChange}
        name="inchargeId"
        placeholder={instLoading ? 'Loading instructors' : 'select incharge'}
        options={getInstructorIncharge(instructors?.data.data)}>
        Incharge
      </DropdownMolecule>
      <DateMolecule
        startYear={new Date(pickedModule?.planned_start_on + '').getFullYear()}
        endYear={new Date(pickedModule?.planned_end_on + '').getFullYear()}
        handleChange={handleChange}
        reverse={false}
        name="plannedStartOn">
        Start Date
      </DateMolecule>
      <DateMolecule
        startYear={new Date(subjectPrd.plannedStartOn).getFullYear()}
        endYear={new Date(pickedModule?.planned_end_on + '').getFullYear()}
        handleChange={handleChange}
        name="plannedEndOn">
        End Date
      </DateMolecule>
      <DropdownMolecule
        handleChange={handleChange}
        name="satus"
        placeholder="subject status"
        defaultValue={getDropDownStatusOptions(IntakeModuleStatus).find(
          (ps) => ps.value === subjectPrd.satus,
        )}
        options={getDropDownStatusOptions(IntakeModuleStatus)}>
        Intake Period Status
      </DropdownMolecule>
      <Button className="mt-4 w-1/4" type="submit">
        Save
      </Button>
    </form>
  );
}

export default AddSubjectToPeriod;
