import React, { useEffect, useState } from 'react';

import usersStore from '../../../../../../store/users.store';
import { CommonFormProps, CommonStepProps, ValueType } from '../../../../../../types';
import { DocType, NationalDocument } from '../../../../../../types/services/user.types';
import { getDropDownStatusOptions } from '../../../../../../utils/getOption';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import DateMolecule from '../../../../../Molecules/input/DateMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../../Molecules/input/InputMolecule';

interface National<E> extends CommonStepProps, CommonFormProps<E> {}

function NationalDocuments<E>({
  display_label,
  isVertical,
  prevStep,
  nextStep,
  fetched_id,
}: National<E>) {
  const [nationalDocuments, setNationalDocuments] = useState<NationalDocument>({
    nationality: '',
    doc_type: DocType.NID,
    nid: '',
    residence_location_id: 0,
    place_of_residence: '',
    place_of_issue: '',
    date_of_issue: '',
    document_expire_on: '',
  });

  const handleChange = (e: ValueType) => {
    setNationalDocuments({ ...nationalDocuments, [e.name]: e.value });
  };

  const moveBack = () => {
    prevStep && prevStep();
  };

  const moveForward = (e: any) => {
    e.preventDefault();
    let data: any = JSON.parse(localStorage.getItem('user') || '{}');
    let newObj = Object.assign({}, data, nationalDocuments);
    console.log(JSON.stringify(newObj));
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
      setNationalDocuments({
        nationality: personInfo.nationality,
        doc_type: personInfo.doc_type,
        nid: personInfo.nid,
        residence_location_id: personInfo.residence_location_id,
        place_of_residence: personInfo.place_of_residence,
        place_of_issue: personInfo.place_of_issue,
        date_of_issue: personInfo.date_of_issue,
        document_expire_on: personInfo.document_expire_on,
      });
  }, [user.data?.data.data.person]);

  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            width="60 md:w-80"
            name="nationality"
            // @ts-ignore
            defaultValue={nationalDocuments.nationality}
            handleChange={handleChange}
            options={[]}>
            Nationality
          </DropdownMolecule>
          <DropdownMolecule
            placeholder={'Select your reference'}
            handleChange={handleChange}
            name="doc_type"
            defaultValue={getDropDownStatusOptions(DocType).find(
              (doc) => doc.label === nationalDocuments.doc_type,
            )}
            options={getDropDownStatusOptions(DocType)}>
            Reference Number
          </DropdownMolecule>
          <InputMolecule
            name="nid"
            type="text"
            value={nationalDocuments.nid}
            placeholder={`Enter ${nationalDocuments.doc_type.replaceAll(
              '_',
              ' ',
            )} number`}
            handleChange={handleChange}>
            {nationalDocuments.doc_type.replaceAll('_', ' ')}
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <InputMolecule
            name="place_of_issue"
            value={nationalDocuments.place_of_issue}
            placeholder={`Enter place you got ${nationalDocuments.doc_type} from`}
            handleChange={handleChange}>
            Place of issue
          </InputMolecule>
          <DateMolecule
            defaultValue={nationalDocuments.date_of_issue}
            handleChange={handleChange}
            name="date_of_issue"
            date_time_type={false}
            width="60 md:w-80">
            Date of issue
          </DateMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            width="60 md:w-80"
            placeholder="select where you currently live"
            name="residence_location_id"
            // @ts-ignore
            defaultValue={nationalDocuments.residence_location_id}
            handleChange={handleChange}
            options={[]}>
            Place of residence
          </DropdownMolecule>
          <InputMolecule
            name="place_of_residence"
            value={nationalDocuments.place_of_residence}
            placeholder="Where exactly do you live?"
            handleChange={handleChange}>
            Place of residence description (optional)
          </InputMolecule>
        </div>
        <div className="flex flex-col gap-4">
          <DateMolecule
            handleChange={handleChange}
            name="document_expire_on"
            defaultValue={nationalDocuments.document_expire_on}
            endYear={new Date().getFullYear() + 50}
            startYear={new Date().getFullYear()}
            width="60 md:w-80">
            Document expiry date
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

export default NationalDocuments;
