import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store';
import academicyearsStore from '../../store/academicyears.store';
import { ValueType } from '../../types';
import {
  IAcademicYearStatus,
  ICreateAcademicYear,
} from '../../types/services/academicyears.types';

export default function NewAcademicYear() {
  const history = useHistory();
  const { data: userInfo } = authenticatorStore.authUser();
  const [years, setYears] = useState<ICreateAcademicYear>({
    academyId: userInfo?.data.data.academy.id.toString() || '',
    name: '',
    id: '',
    actualAtartOn: '',
    actualEndOn: '',
    status: IAcademicYearStatus.INITIAL,
    plannedStartOn: '',
    plannedEndOn: '',
  });
  function handleChange(e: ValueType) {
    setYears((year) => ({ ...year, [e.name]: e.value }));
  }
  const { mutate } = academicyearsStore.createAcademy();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    mutate(years, {
      onSuccess: () => {
        toast.success('Academic year created', { duration: 5000 });
        queryClient.invalidateQueries(['academicyears']);
        history.goBack();
      },
      onError: (error) => {
        console.log(error);
        toast.error('something wrong happened while creating level');
      },
    });
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule required value={years.name} name="name" handleChange={handleChange}>
        Name
      </InputMolecule>
      <DateMolecule
        startYear={new Date().getFullYear()}
        endYear={new Date().getFullYear() + 100}
        padding={3}
        reverse={false}
        handleChange={handleChange}
        name={'plannedStartOn'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        startYear={new Date().getFullYear()}
        endYear={new Date().getFullYear() + 100}
        padding={3}
        reverse={false}
        name={'plannedEndOn'}>
        End Date
      </DateMolecule>

      <RadioMolecule
        className="mt-4"
        value={years.status}
        name="status"
        options={[
          { label: 'Initial', value: 'INITIAL' },
          { label: 'started', value: 'STARTED' },
          { label: 'suspended', value: 'SUSPENDED' },
          { label: 'closed', value: 'CLOSED' },
        ]}
        handleChange={handleChange}>
        Status
      </RadioMolecule>

      <div className="mt-5">
        <Button type="submit" full>
          Save
        </Button>
      </div>
    </form>
  );
}
