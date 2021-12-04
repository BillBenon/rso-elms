import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import { queryClient } from '../../plugins/react-query';
import { authenticatorStore } from '../../store/administration';
import academicyearsStore from '../../store/administration/academicyears.store';
import { ParamType, ValueType } from '../../types';
import {
  IAcademicYearStatus,
  ICreateAcademicYear,
} from '../../types/services/academicyears.types';
import { getDropDownStatusOptions } from '../../utils/getOption';
import { FilteredData } from './AcademicYears';

interface IUpdateYearProps {
  academicYears: FilteredData[];
}

export default function UpdateAcademicYear({ academicYears }: IUpdateYearProps) {
  const history = useHistory();
  const { id } = useParams<ParamType>();
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
  const { mutate } = academicyearsStore.modifyAcademy();

  useEffect(() => {
    // academicYears.length > 0 && setYears(academicYears);
    let foundYear = academicYears.find((year) => year.id === id);
    setYears({ ...years, ...foundYear });
  }, [academicYears]);

  function submitForm(e: FormEvent) {
    e.preventDefault();

    let name = `YEAR ${new Date(years.plannedStartOn).getFullYear()}-${new Date(
      years.plannedEndOn,
    ).getFullYear()}`;
    let data = {
      ...years,
      name,
    };

    mutate(data, {
      onSuccess: () => {
        toast.success('Academic year updated', { duration: 5000 });
        queryClient.invalidateQueries(['academicyears']);
        history.push('/dashboard/academic-years');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <form onSubmit={submitForm}>
      <InputMolecule readOnly value={years.name} name="name" handleChange={handleChange}>
        Name
      </InputMolecule>

      <DateMolecule
        startYear={new Date().getFullYear()}
        endYear={new Date().getFullYear() + 100}
        padding={3}
        reverse={false}
        defaultValue={years.plannedStartOn}
        handleChange={handleChange}
        name={'plannedStartOn'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        defaultValue={years.plannedEndOn}
        startYear={new Date(years.plannedStartOn).getFullYear()}
        endYear={new Date().getFullYear() + 100}
        padding={3}
        reverse={false}
        name={'plannedEndOn'}>
        End Date
      </DateMolecule>

      <RadioMolecule
        className="mt-4"
        value={years.status.toString()}
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
