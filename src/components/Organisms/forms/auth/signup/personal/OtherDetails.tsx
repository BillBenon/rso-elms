import React, { FormEvent, useState } from 'react';

import diseasesStore from '../../../../../../store/administration/diseases.store';
import hobbiesStore from '../../../../../../store/administration/hobbies.store';
import languagesStore from '../../../../../../store/administration/languages.store';
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
  const moveForward = (e: FormEvent) => {
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

  const diseases = diseasesStore
    .getDiseases()
    .data?.data.data.map((hb) => ({ label: hb.name, value: hb.id })) as SelectData[];

  const languages = languagesStore
    .getAllLanguages()
    .data?.data.data.map((hb) => ({ label: hb.name, value: hb.id })) as SelectData[];

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
              options={diseases}>
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
              options={languages}
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
