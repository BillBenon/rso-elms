/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { ValueType } from '../../../../../types';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

type PropType = {
  handleClick: () => void;
};

function SignInWithSearch({ handleClick }: PropType) {
  const [details, setDetails] = useState({
    searchBy: '',
    searchResult: '',
  });

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  const filter = () => {};

  return (
    <>
      <div className="py-11">
        <Heading fontSize="lg" className="md:2xl" fontWeight="semibold">
          Sign In
        </Heading>
        <p className="text-txt-secondary text-sm md:text-base pt-2">
          Enter your credentials to continue
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <DropdownMolecule
          width="28"
          placeholder="Search"
          handleChange={handleChange}
          name="searchBy"
          defaultValue={details.searchBy}
          options={[
            { value: 'academies', label: 'Academies' },
            { value: 'classes', label: 'Class' },
            { value: 'faculties', label: 'Faculties' },
            { value: 'students', label: 'Students' },
            { value: 'instructors', label: 'Instructors' },
            { value: 'administrators', label: 'Administrators' },
            { value: 'Programmes', label: 'Programmes' },
          ]}
        />
        <InputMolecule
          name="searchResult"
          value={details.searchResult}
          handleChange={handleChange}>
          <></>
        </InputMolecule>
      </div>
      <Button onClick={filter}>Search</Button>

      <div className="text-txt-secondary py-2">
        <p className="text-base text-txt-secondary">
          Already have an account?
          <Button styleType="text" className="text-primary-500" onClick={handleClick}>
            Sign in
          </Button>
        </p>
      </div>
    </>
  );
}

export default SignInWithSearch;
