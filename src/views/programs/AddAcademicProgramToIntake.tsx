import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FormEvent } from 'react-router/node_modules/@types/react';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import { intakeStore } from '../../store/intake.store';
import programStore from '../../store/program.store';
import { GenericStatus, ValueType } from '../../types';
import { IntakeProgram, IntakeProgramsCreate } from '../../types/services/intake.types';
import { ProgramInfo } from '../../types/services/program.types';
import { getDropDownOptions } from '../../utils/getOption';

interface PropType {
  submited?: () => void;
}

export default function AddAcademicProgramToIntake({ submited }: PropType) {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const { search } = useLocation();
  const intakeId = new URLSearchParams(search).get('intakeId');
  const intake = intakeStore.getIntakeById(intakeId!);

  const programsInfo = programStore.fetchPrograms();
  const addProgram = intakeStore.addPrograms();

  let programs: ProgramInfo[] = programsInfo.data?.data.data || [];

  function handlePrograms(e: ValueType) {
    console.log(e.value);
    // @ts-ignore
    setSelectedPrograms(e.value);
  }

  async function submit<T>(e: FormEvent<T>) {
    e.preventDefault();
    setFormLoading(true);
    const toastId = toast.loading('adding programs');

    let intakePrograms: IntakeProgramsCreate = {
      description: '',
      intak_id: intakeId!,
      programs: [],
    };

    for (let i = 0; i < selectedPrograms.length; i++) {
      const element: IntakeProgram = {
        description: '',
        intake_id: intakeId!,
        intake_program_id: '',
        program_id: selectedPrograms[i],
        status: GenericStatus.ACTIVE,
      };
      intakePrograms.programs.push(element);
    }

    await addProgram.mutateAsync(intakePrograms, {
      onSuccess(data) {
        toast.success(data.data.message, { id: toastId });
        submited && submited();
      },
      onError() {
        toast.error('error occurred when adding programs', { id: toastId });
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <InputMolecule
        disabled
        name="title"
        placeholder="Intake title"
        value={intake.data?.data.data.title}
        handleChange={() => 0}>
        Intake title
      </InputMolecule>
      <DropdownMolecule
        name="programs"
        placeholder="Program"
        handleChange={handlePrograms}
        isMulti
        options={getDropDownOptions(programs)}>
        Programs in this intake
      </DropdownMolecule>
      <div className="pt-3">
        <Button disabled={formLoading} type="submit">
          Add Programs
        </Button>
      </div>
    </form>
  );
}
