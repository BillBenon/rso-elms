import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import { FamilyDetail, MaritalStatus } from '../../../../../../types/services/user.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

interface Family<E> extends CommonStepProps, CommonFormProps<E> {}

function FamilyDetails<E>({
  display_label,
  isVertical,
  nextStep,
  prevStep,
  fetched_id,
  onSubmit,
}: Family<E>) {
  const [familyDetails, setFamilyDetails] = useState<FamilyDetail>({
    father_names: '',
    mother_names: '',
    marital_status: MaritalStatus.MARRIED,
    spouse_name: '',
  });
  const handleChange = (e: ValueType) => {
    setFamilyDetails({ ...familyDetails, [e.name]: e.value });
  };
  const moveBack = () => {
    prevStep && prevStep();
  };

  const moveForward = (e: any) => {
    e.preventDefault();
    nextStep(true);
    if (onSubmit) onSubmit(e, familyDetails);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    user.data?.data.data && setFamilyDetails({ ...user.data?.data.data.person });
  }, [user.data]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="father_names"
            placeholder="eg: John"
            value={familyDetails.father_names}
            handleChange={handleChange}>
            Father&apos;s name
          </InputMolecule>
          <InputMolecule
            name="mother_names"
            placeholder="eg: Doe"
            value={familyDetails.mother_names}
            handleChange={handleChange}>
            Mother&apos;s name
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            defaultValue={getDropDownStatusOptions(MaritalStatus).find(
              (marital) => marital.label === familyDetails.marital_status,
            )}
            options={getDropDownStatusOptions(MaritalStatus)}
            handleChange={handleChange}
            name="marital_status">
            Marital Status
          </DropdownMolecule>
          {(familyDetails.marital_status === MaritalStatus.MARRIED ||
            familyDetails.marital_status === MaritalStatus.WIDOWED) && (
            <InputMolecule
              name="spouse_name"
              value={familyDetails.spouse_name}
              handleChange={handleChange}>
              Spouse Name
            </InputMolecule>
          )}
        </div>
        {/* <Heading fontSize="sm" fontWeight="semibold">
        Family address
      </Heading>
      <div className="flex flex-col gap-4">
        <DropdownMolecule
          width="60 md:w-80"
          name="country"
          defaultValue={familyDetails.country}
          handleChange={handleChange}
          options={[
            { value: 'rw', display_label: 'Rwanda' },
            { value: 'ug', display_label: 'Uganda' },
            { value: 'tz', display_label: 'Tanzania' },
            { value: 'brd', display_label: 'Burundi' },
            { value: 'can', display_label: 'Canada' },
            { value: 'us', display_label: 'USA' },
          ]}>
          Country
        </DropdownMolecule>
        <DropdownMolecule
          width="60 md:w-80"
          name="country"
          defaultValue={familyDetails.country}
          handleChange={handleChange}
          options={[
            { value: 'rw', display_label: 'Rwanda' },
            { value: 'ug', display_label: 'Uganda' },
            { value: 'tz', display_label: 'Tanzania' },
            { value: 'brd', display_label: 'Burundi' },
            { value: 'can', display_label: 'Canada' },
            { value: 'us', display_label: 'USA' },
          ]}>
          Location
        </DropdownMolecule>
      </div>
      <div className="flex flex-col gap-4">
        <InputMolecule
          name="otherLocation"
          value={familyDetails.otherLocation}
          handleChange={handleChange}>
          Other Location
          <span className="text-txt-secondary"> (State / Region)</span>
        </InputMolecule>
      </div> */}
        <div className="flex justify-between w-80">
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

export default FamilyDetails;
