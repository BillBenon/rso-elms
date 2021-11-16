import React from 'react';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import { ValueType } from '../../types';
import { IAcademicPeriodInfo } from '../../types/services/academicperiod.types';
import {
  CreateLevelIntakeProgram,
  ProgressStatus,
} from '../../types/services/intake-program.types';
import { getDropDownStatusOptions } from '../../utils/getOption';

interface PeriodStep {
  prd: IAcademicPeriodInfo;
  values: CreateLevelIntakeProgram;
  handleChange: (_e: ValueType) => any;
}

export function NewIntakePeriod({ prd, handleChange, values }: PeriodStep) {
  return (
    <div>
      <InputMolecule
        title={prd.id.toString()}
        id="academic_period_id"
        type="hidden"
        value={prd.id}
        name="academic_period_id"
      />
      <Heading fontSize="sm" fontWeight="semibold" color="primary" className="pb-3">
        {prd.name}
      </Heading>
      <DateMolecule
        startYear={new Date(prd.academic_year.planned_start_on).getFullYear()}
        endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
        handleChange={handleChange}
        reverse={false}
        name="planed_start_on">
        Start Date
      </DateMolecule>
      <div className="pt-4">
        <DateMolecule
          startYear={new Date(values.planed_start_on).getFullYear()}
          endYear={new Date(prd.academic_year.planned_end_on).getFullYear()}
          handleChange={handleChange}
          name="planed_end_on">
          End Date
        </DateMolecule>
      </div>
      <DropdownMolecule
        width="5/12"
        handleChange={handleChange}
        name="progress_status"
        placeholder="intake period status"
        defaultValue={getDropDownStatusOptions(ProgressStatus).find(
          (ps) => ps.value === values.progress_status,
        )}
        options={getDropDownStatusOptions(ProgressStatus)}>
        Intake Period Status
      </DropdownMolecule>
      <Button className="mt-4 w-1/4" type="submit">
        Save
      </Button>
    </div>
  );
}
