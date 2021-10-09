import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import { EmploymentDetail } from '../../../../../../types/services/user.types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

interface Employment<E> extends CommonStepProps, CommonFormProps<E> {}

function EmploymentDetails<E>({
  display_label,
  isVertical,
  prevStep,
  nextStep,
  fetched_id,
  onSubmit,
}: Employment<E>) {
  const [employmentDetails, setEmploymentDetails] = useState<EmploymentDetail>({
    current_rank_id: '',
    other_rank: '',
    rank_depart: 'Rwanda',
    emp_no: '',
    date_of_commission: '',
    date_of_last_promotion: '',
  });

  const moveBack = () => {
    prevStep && prevStep();
  };
  const handleChange = (e: ValueType) => {
    setEmploymentDetails({ ...employmentDetails, [e.name]: e.value });
  };

  const moveForward = (e: any) => {
    e.preventDefault();
    nextStep(true);
    if (onSubmit) onSubmit(e, employmentDetails);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    user.data?.data.data && setEmploymentDetails({ ...user.data?.data.data.person });
  }, [user.data]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            placeholder="Select current rank"
            name="current_rank_id"
            className="w-72"
            handleChange={handleChange}
            options={[]}>
            Current Rank
          </DropdownMolecule>
          <InputMolecule
            name="other_rank"
            placeholder="other ranks u might hold"
            value={employmentDetails.other_rank}
            handleChange={handleChange}>
            Other rank
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="rank_depart"
            placeholder="eg: Rwanda"
            value={employmentDetails.rank_depart}
            handleChange={handleChange}>
            Current rank department
          </InputMolecule>
          <InputMolecule
            name="emp_no"
            placeholder="Employment number"
            value={employmentDetails.emp_no}
            handleChange={handleChange}>
            Service / Employment number
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <DateMolecule
            handleChange={handleChange}
            name="date_of_commission"
            width="60 md:w-80">
            Date of commission
          </DateMolecule>
          <DateMolecule
            handleChange={handleChange}
            name="date_of_last_promotion"
            width="60 md:w-80">
            Date of last promotion
          </DateMolecule>
        </div>
        <div className="flex w-80 justify-between">
          {prevStep && (
            <Button
              styleType="text"
              hoverStyle="no-underline"
              color="txt-secondary"
              onClick={() => moveBack()}>
              Back
            </Button>
          )}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
}

export default EmploymentDetails;
