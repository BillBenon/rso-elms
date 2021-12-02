import React, { useState } from 'react';

import hobbiesStore from '../../../../../../store/administration/hobbies.store';
import {
  CommonFormProps,
  CommonStepProps,
  SelectData,
  ValueType,
} from '../../../../../../types';
import { getLocalStorageData } from '../../../../../../utils/getLocalStorageItem';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import CheckboxMolecule from '../../../../../Molecules/input/CheckboxMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

interface Other<O> extends CommonStepProps, CommonFormProps<O> {}

function OtherDetails<O>({ display_label, isVertical, prevStep, nextStep }: Other<O>) {
  const [otherDetails, setOtherDetails] = useState({
    hobbies: [],
    chronic_disease: '',
    chronic_disease_description: '',
    languages: '',
  });

  //store for hobbies, store for chronic disease
  const moveBack = () => {
    prevStep && prevStep();
  };
  const handleChange = (e: ValueType) => {
    setOtherDetails({ ...otherDetails, [e.name]: e.value });
  };
  const moveForward = (e: any) => {
    e.preventDefault();
    let data: any = getLocalStorageData('user');
    let newObj = Object.assign({}, data, otherDetails);
    Object.keys(newObj).map((val) => {
      //@ts-ignore
      if (!newObj[val]) newObj[val] = '';
    });
    localStorage.setItem('user', JSON.stringify(newObj));
    nextStep(true);
  };

  const hobbies = hobbiesStore
    .getHobbies()
    .data?.data.data.map((hb) => ({ label: hb.name, value: hb.id })) as SelectData[];

  // const userDetails = hobbyStore.getUserHobby(fetched_id.toString);
  // useEffect(() => {
  //   let detailsInfo = userDetails.data?.data.data.person;
  //   detailsInfo &&
  //     setOtherDetails({
  //       hobbies: detailsInfo.hobbies,
  //       chronic_disease: detailsInfo.chronic_disease,
  //       chronic_disease_description: detailsInfo.chronic_disease_description,
  //       languages: detailsInfo.languages,
  //     });
  // }, [userDetails.data?.data.data.person_id]);
  return (
    <div className={`flex flex-col gap-4 ${!isVertical && 'pt-8'}`}>
      {!isVertical && <Heading fontWeight="semibold">{display_label}</Heading>}
      <form onSubmit={moveForward}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <DropdownMolecule
              isMulti
              name="hobbies"
              // @ts-ignore
              defaultValue={otherDetails.hobbies}
              handleChange={handleChange}
              options={hobbies}>
              Hobbies
            </DropdownMolecule>
            <DropdownMolecule
              isMulti
              placeholder="Select chronic diseases u have"
              name="chronic_disease"
              // @ts-ignore
              defaultValue={otherDetails.chronic_disease}
              handleChange={handleChange}
              options={[]}>
              Chronic diseases
            </DropdownMolecule>
            <TextAreaMolecule
              name="chronic_disease_description"
              value={otherDetails.chronic_disease_description}
              handleChange={handleChange}
              placeholder="Describe your chronic disease">
              Chronic disease description
            </TextAreaMolecule>
            <CheckboxMolecule
              placeholder="Languages"
              handleChange={handleChange}
              name="languages"
              options={[
                { label: 'Kinyarwanda', value: 'kiny' },
                { label: 'English', value: 'en' },
              ]}
              values={[]}
            />
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default OtherDetails;
