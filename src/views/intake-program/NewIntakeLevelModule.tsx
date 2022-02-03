import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Panel from '../../components/Atoms/custom/Panel';
import Heading from '../../components/Atoms/Text/Heading';
import Accordion from '../../components/Molecules/Accordion';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import { queryClient } from '../../plugins/react-query';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { moduleStore } from '../../store/administration/modules.store';
import { ValueType } from '../../types';
import { Instructor } from '../../types/services/instructor.types';
import {
  AddLevelToModule,
  IntakeLevelParam,
  IntakeModuleStatus,
  ModuleParticipation,
} from '../../types/services/intake-program.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';

function NewIntakeLevelModule() {
  const initialState = {
    academic_year_program_intake_level_id: 0,
    actual_end_on: '',
    actual_start_on: '',
    credits: 0,
    incharge_id: '',
    intake_status: IntakeModuleStatus.DRAFT,
    marks: 0,
    module_id: '',
    module_participation: ModuleParticipation.COMPULSORY,
    pass_mark: 0,
    planned_end_on: '',
    planned_start_on: '',
    weight: 0,
  };
  const [values, setvalues] = useState<AddLevelToModule>(initialState);

  const history = useHistory();

  const [totalModules, setTotalModules] = useState<AddLevelToModule[]>([]);

  const { id, level: levelId, intakeProg } = useParams<IntakeLevelParam>();

  function handleChange(e: ValueType) {
    setvalues({ ...values, [e.name]: e.value });
  }

  const { mutateAsync } = intakeProgramStore.addModuleToLevel();

  const levels =
    intakeProgramStore.getLevelsByIntakeProgram(intakeProg).data?.data.data || [];

  const { data: getAllModuleStore, isLoading: mLoading } =
    moduleStore.getModulesByProgram(id);
  const { data: levelModuleStore, isLoading: lmLoading } =
    intakeProgramStore.getModulesByLevel(parseInt(levelId));

  const modules =
    getAllModuleStore?.data.data.filter(
      (md) => md.id !== levelModuleStore?.data.data.find((m) => m)?.module.id,
    ) || [];

  const instructorInPrograms =
    intakeProgramStore.getInstructorsByIntakeProgram(intakeProg);

  const instructors =
    instructorInPrograms.data?.data.data.map((instr) => instr.instructor) || [];

  useEffect(() => {
    setvalues({ ...values, academic_year_program_intake_level_id: parseInt(levelId) });
  }, [levelId]);

  async function addMore() {
    let payload: AddLevelToModule[] = [];

    payload.push(values);

    await mutateAsync(payload, {
      onSuccess() {
        toast.success('module added to level');
        queryClient.invalidateQueries(['levels/modules']);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
    setTotalModules([...totalModules, values]);

    setvalues(initialState);
  }

  function submitForm() {
    let payload: AddLevelToModule[] = [];

    payload.push(values);

    mutateAsync(payload, {
      onSuccess: () => {
        toast.success('module added to level');
        queryClient.invalidateQueries(['levels/modules']);
        history.goBack();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
    setvalues(initialState);
    setTotalModules([]);
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full mx-auto">
      <div className="bg-main pl-10 pt-6">
        <Heading fontWeight="semibold" fontSize="2xl" className="py-4">
          Add modules to a level
        </Heading>
        <Heading fontWeight="medium" fontSize="sm" className="pb-8" color="txt-secondary">
          Let’s add many modules on this intake level
        </Heading>
        <div className="flex flex-col gap-2">
          <DropdownMolecule
            handleChange={handleChange}
            name="module_id"
            placeholder={mLoading || lmLoading ? 'Loading modules' : 'Select modules'}
            options={getDropDownOptions({
              inputs: modules,
            })}>
            <p className="font-medium">Modules</p>
          </DropdownMolecule>
          <DropdownMolecule
            placeholder={
              instructorInPrograms.isLoading ? 'Loading incharge' : 'Select incharge'
            }
            options={getDropDownOptions({
              inputs: instructors,
              labelName: ['first_name', 'last_name'],
              //@ts-ignore
              getOptionLabel: (instr: Instructor) =>
                instr.user.first_name + ' ' + instr.user.last_name,
            })}
            name="incharge_id"
            handleChange={handleChange}>
            <p className="font-medium">Instructor Incharge</p>
          </DropdownMolecule>
        </div>
        <div className="flex flex-col gap-3">
          <RadioMolecule
            handleChange={handleChange}
            name="module_participation"
            value={values.module_participation}
            options={getDropDownStatusOptions(ModuleParticipation)}>
            Participation Status
          </RadioMolecule>
          <div className="flex gap-2 w-80">
            <InputMolecule
              name="pass_mark"
              width="40"
              placeholder="Number"
              value={values.pass_mark}
              type="number"
              handleChange={handleChange}>
              <p className="normal-case">Pass mark</p>
            </InputMolecule>
            <InputMolecule
              name="marks"
              width="40"
              placeholder="Number"
              value={values.marks}
              type="number"
              handleChange={handleChange}>
              <p className="normal-case">Out of marks</p>
            </InputMolecule>
          </div>
        </div>
        <div className="flex gap-2">
          <InputMolecule
            name="weight"
            width="40"
            placeholder="Number"
            value={values.weight}
            type="number"
            handleChange={handleChange}>
            <p className="normal-case">Module weight</p>
          </InputMolecule>
          <DropdownMolecule
            placeholder="status"
            defaultValue={getDropDownStatusOptions(IntakeModuleStatus).find(
              (stat) => stat.value === values.intake_status,
            )}
            options={getDropDownStatusOptions(IntakeModuleStatus)}
            name="intake_status"
            width="40"
            handleChange={handleChange}>
            <p className="font-medium">Module Status</p>
          </DropdownMolecule>
        </div>
        <div className="flex flex-col gap-2">
          <DateMolecule
            startYear={new Date(
              levels.find((lv) => (lv.id = levelId))?.planed_start_on || '',
            ).getFullYear()}
            endYear={new Date(
              levels.find((lv) => (lv.id = levelId))?.planed_end_on || '',
            ).getFullYear()}
            handleChange={handleChange}
            reverse={false}
            name="planned_start_on">
            Start Date
          </DateMolecule>
          <DateMolecule
            startYear={new Date(values.planned_start_on).getFullYear()}
            endYear={new Date(
              levels.find((lv) => (lv.id = levelId))?.planed_end_on || '',
            ).getFullYear()}
            handleChange={handleChange}
            name="planned_end_on">
            End Date
          </DateMolecule>
        </div>
        <div className="text-primary-500 text-sm flex flex-col w-96">
          <Button
            hoverStyle="no-underline"
            type="button"
            styleType="text"
            className="flex items-center justify-end"
            onClick={() => addMore()}>
            <Icon name="add" size={12} fill="primary" />
            <span className="font-semibold">Add module</span>
          </Button>
        </div>
        <div className="pt-2 pb-8">
          <Button onClick={submitForm}>Save</Button>
        </div>
      </div>

      <div className="px-5 md:pl-48">
        {totalModules.length > 0 && <p className="pt-10 pb-4 font-semibold">Modules</p>}
        <Accordion>
          {totalModules.map((mod) => {
            return (
              <Panel
                key={mod.module_id}
                title={
                  modules.find((module) => module.id === mod.module_id)?.name || 'Module'
                }
                badge={{ type: mod.intake_status, text: mod.intake_status }}
                className="bg-main"
                bgColor="main"
                subtitle={mod.module_participation}>
                <div>Pass marks: {mod.pass_mark}</div>
                <div>Out of marks: {mod.marks}</div>
                <div>Start Date: {mod.planned_start_on}</div>
                <div>End Date: {mod.planned_end_on}</div>
              </Panel>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default NewIntakeLevelModule;
