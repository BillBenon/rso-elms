import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { ValueType } from '../../../../../../types';
import Button from '../../../../../Atoms/custom/Button';
import Heading from '../../../../../Atoms/Text/Heading';
import CheckboxMolecule from '../../../../../Molecules/input/CheckboxMolecule';
import DropdownMolecule from '../../../../../Molecules/input/DropdownMolecule';
import TextAreaMolecule from '../../../../../Molecules/input/TextAreaMolecule';

function OtherDetails(_props: any) {
  const history = useHistory();
  const [otherDetails, setOtherDetails] = useState({
    hobbies: '',
    chronic_disease: '',
    chronic_disease_description: '',
    languages: '',
  });
  //store for hobbies, store for chronic disease

  const handleChange = (e: ValueType) => {
    setOtherDetails({ ...otherDetails, [e.name]: e.value });
  };

  async function saveInfo() {
    if (otherDetails) {
      // await mutateAsync(
      //   { ...otherDetails, profile_status: ProfileStatus.COMPLETD },
      //   {
      //     onSuccess() {
      //       let personInfo = props.location.state.detail;
      //       toast.success('profile successfully completed', {
      //         duration: 1200,
      //       });
      //       setTimeout(() => {
      //         history.push({
      //           pathname: '/login',
      //           state: { detail: personInfo },
      //         });
      //       }, 900);
      //     },
      //     onError() {
      //       toast.error('An error occurred please try again later');
      //     },
      //   },
      // );
      history.push('/login');
    }
  }

  return (
    <>
      <Heading fontSize="2xl" fontWeight="semibold" className="pt-20 text-center">
        Other Details
      </Heading>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full mx-auto md:px-80 py-20">
        <div className="flex flex-col gap-4">
          <DropdownMolecule
            isMulti
            name="hobbies"
            // @ts-ignore
            defaultValue={otherDetails.hobbies}
            handleChange={handleChange}
            options={[]}>
            Hobbies
          </DropdownMolecule>
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
        </div>
        <div className="md:px-5 px-3">
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
          <div className="flex w-80 justify-between">
            <Button onClick={() => saveInfo()}>Complete</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherDetails;
