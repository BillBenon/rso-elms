import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import useAuthenticator from '../../hooks/useAuthenticator';
import { queryClient } from '../../plugins/react-query';
import academicyearsStore from '../../store/administration/academicyears.store';
import { ValueType } from '../../types';
import {
  IAcademicYearStatus,
  ICreateAcademicYear,
} from '../../types/services/academicyears.types';
import { getDropDownStatusOptions } from '../../utils/getOption';

export default function NewAcademicYear() {
  const history = useHistory();
  const { user } = useAuthenticator();
  const [newYear, setNewYear] = useState<ICreateAcademicYear>({
    academyId: user?.academy.id.toString() || '',
    name: '',
    id: '',
    actualAtartOn: '',
    actualEndOn: '',
    status: IAcademicYearStatus.INITIAL,
    plannedStartOn: '',
    plannedEndOn: '',
  });

  useEffect(() => {
    setNewYear((prev) => ({ ...prev, academyId: user?.academy?.id || '' }));
  }, [user]);

  function handleChange(e: ValueType) {
    setNewYear((year) => ({ ...year, [e.name]: e.value }));
  }
  const { mutate } = academicyearsStore.createAcademy();

  function submitForm(e: FormEvent) {
    e.preventDefault();

    let name = `YEAR ${new Date(newYear.plannedStartOn).getFullYear()}-${new Date(
      newYear.plannedEndOn,
    ).getFullYear()}`;
    let data = {
      ...newYear,
      name,
    };
    mutate(data, {
      onSuccess: (year) => {
        toast.success('Academic year created', { duration: 5000 });
        queryClient.invalidateQueries(['academicyears']);
        history.push(`/dashboard/academic-years/${year.data.data.id}/period/add`);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <form onSubmit={submitForm}>
      {/* <InputMolecule required value={years.name} name="name" handleChange={handleChange}>
        Name
      </InputMolecule> */}
      <DateMolecule
        startYear={new Date().getFullYear()}
        endYear={new Date().getFullYear() + 100}
        reverse={false}
        handleChange={handleChange}
        name={'plannedStartOn'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        startYear={new Date(newYear.plannedStartOn).getFullYear()}
        endYear={new Date().getFullYear() + 100}
        reverse={false}
        name={'plannedEndOn'}>
        End Date
      </DateMolecule>

      <RadioMolecule
        className="mt-4"
        value={newYear.status}
        name="status"
        options={getDropDownStatusOptions(IAcademicYearStatus)}
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
