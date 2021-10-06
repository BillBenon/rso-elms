/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';

import usersStore from '../../../../../store/users.store';
import { ValueType } from '../../../../../types';
import { DocType } from '../../../../../types/services/user.types';
import { getDropDownStatusOptions } from '../../../../../utils/getOption';
import Button from '../../../../Atoms/custom/Button';
import Heading from '../../../../Atoms/Text/Heading';
import DropdownMolecule from '../../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../../Molecules/input/InputMolecule';

function SignInWithSearch() {
  const history = useHistory();
  const [details, setDetails] = useState({
    searchBy: '',
    searchInput: '',
  });

  const handleChange = (e: ValueType) => {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  };

  // get user by inputed reference number
  let user = usersStore.getUserAccountsByNid(details.searchInput);

  const filter = () => {
    if (user.data?.data.data) {
      toast.success("You're already registered!", { duration: 1200 });
      setTimeout(() => {
        history.push('/register');
      }, 900);
    } else {
      toast.error("You're not yet registered!", { duration: 1200 });
    }
  };

  return (
    <div className="py-32">
      <Heading fontSize="lg" className="md:text-3xl" fontWeight="semibold">
        Search
      </Heading>
      <Heading
        color="txt-secondary"
        fontSize="sm"
        className="md:text-sm pt-2"
        fontWeight="medium">
        Enter your reference number to find out if you&apos;re already registered
      </Heading>

      <div className="flex gap-2 items-center py-6">
        <DropdownMolecule
          width="36"
          placeholder="Search by"
          handleChange={handleChange}
          name="searchBy"
          defaultValue={getDropDownStatusOptions(DocType).find(
            (nid) => nid.value === DocType.NID,
          )}
          options={getDropDownStatusOptions(DocType)}
        />
        <InputMolecule
          name="searchInput"
          value={details.searchInput}
          handleChange={handleChange}>
          <></>
        </InputMolecule>
      </div>
      <Button onClick={filter}>Search</Button>

      <div className="text-txt-secondary py-2">
        <p className="text-base text-txt-secondary">
          Already have an account?
          <Link to="/">
            <Button styleType="text" className="text-primary-500">
              Sign in
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInWithSearch;
