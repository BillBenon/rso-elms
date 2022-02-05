import React, { useEffect, useState } from 'react';

import { rankStore } from '../../../../../../store/administration/rank.store';
import usersStore from '../../../../../../store/administration/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import { RankRes } from '../../../../../../types/services/rank.types';
import { EmploymentDetail } from '../../../../../../types/services/user.types';
import { getLocalStorageData } from '../../../../../../utils/getLocalStorageItem';
import { getDropDownOptions } from '../../../../../../utils/getOption';
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
}: Employment<E>) {
  const [employmentDetails, setEmploymentDetails] = useState<EmploymentDetail>({
    current_rank_id: '',
    other_rank: '',
    rank_depart: '',
    empNo: '',
    date_of_commission: '',
    date_of_last_promotion: '',
    place_of_issue: '',
    date_of_issue: '',
  });

  const moveBack = () => {
    prevStep && prevStep();
  };
  const handleChange = (e: ValueType) => {
    setEmploymentDetails({ ...employmentDetails, [e.name]: e.value });
  };

  //get all ranks in an institution

  const ranks: RankRes[] | undefined = rankStore.getRanks().data?.data.data;

  const moveForward = (e: any) => {
    e.preventDefault();
    let data: any = getLocalStorageData('user');
    let newObj = Object.assign({}, data, employmentDetails);
    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    localStorage.setItem('user', JSON.stringify(newObj));
    nextStep(true);
  };
  const user = usersStore.getUserById(fetched_id.toString());
  useEffect(() => {
    let personInfo = user.data?.data.data.person;
    personInfo &&
      setEmploymentDetails({
        current_rank_id: personInfo.current_rank_id,
        other_rank: personInfo.other_rank,
        rank_depart: personInfo.rank_depart,
        empNo: personInfo.empNo,
        date_of_commission: personInfo.date_of_commission,
        date_of_last_promotion: personInfo.date_of_last_promotion,
        place_of_issue: personInfo.place_of_issue,
        date_of_issue: personInfo.date_of_issue,
      });
  }, [user.data?.data.data.person]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <DropdownMolecule
              placeholder="Select current rank"
              name="current_rank_id"
              options={getDropDownOptions({ inputs: ranks || [] })}
              handleChange={handleChange}>
              Current Title
            </DropdownMolecule>
            <InputMolecule
              required={false}
              name="other_rank"
              placeholder="other ranks u might hold"
              value={employmentDetails.other_rank}
              handleChange={handleChange}>
              Other Title
            </InputMolecule>
          </div>
          <div className="flex flex-col gap-4">
            <InputMolecule
              name="empNo"
              placeholder="Service number"
              value={employmentDetails.empNo}
              handleChange={handleChange}>
              Service / Employment number
            </InputMolecule>

            <DateMolecule
              defaultValue={employmentDetails.date_of_commission}
              handleChange={handleChange}
              name="date_of_commission"
              date_time_type={false}
              width="60 md:w-80">
              Date of commission
            </DateMolecule>
          </div>

          <div className="flex flex-col gap-4">
            <InputMolecule
              name="rank_depart"
              placeholder="eg: Rwanda"
              value={employmentDetails.rank_depart}
              handleChange={handleChange}>
              Current rank department
            </InputMolecule>

            <DateMolecule
              defaultValue={employmentDetails.date_of_last_promotion}
              handleChange={handleChange}
              name="date_of_last_promotion"
              date_time_type={false}
              width="60 md:w-80">
              Date of last promotion
            </DateMolecule>
          </div>
          <div className="flex flex-col gap-4">
            <InputMolecule
              name="place_of_issue"
              value={employmentDetails.place_of_issue}
              placeholder={`Enter the place the document was issued`}
              handleChange={handleChange}>
              Place of issue
            </InputMolecule>
            <DateMolecule
              defaultValue={employmentDetails.date_of_issue}
              handleChange={handleChange}
              name="date_of_issue"
              date_time_type={false}
              width="60 md:w-80">
              Date of issue
            </DateMolecule>
          </div>
        </div>
        <div className="flex w-4/5 my-6 justify-between">
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
