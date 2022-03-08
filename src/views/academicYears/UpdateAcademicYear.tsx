import moment from 'moment';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DateMolecule from '../../components/Molecules/input/DateMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import usePickedRole from '../../hooks/usePickedRole';
import { queryClient } from '../../plugins/react-query';
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
  const picked_role = usePickedRole();
  const [years, setYears] = useState<ICreateAcademicYear>({
    academyId: picked_role?.academy_id + '',
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
    setYears((yrs) => {
      return { ...yrs, ...foundYear };
    });
  }, [academicYears, id]);

  function submitForm(e: FormEvent) {
    e.preventDefault();

    let name = `YEAR ${moment(
      years.plannedStartOn === '' ? undefined : years.plannedStartOn,
    ).year()}-${moment(
      years.plannedEndOn === '' ? undefined : years.plannedEndOn,
    ).year()}`;
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
        startYear={moment().year() - 30}
        endYear={moment().year() + 30}
        reverse={false}
        defaultValue={years.plannedStartOn}
        handleChange={handleChange}
        name={'plannedStartOn'}>
        Start Date
      </DateMolecule>

      <DateMolecule
        handleChange={handleChange}
        defaultValue={years.plannedEndOn}
        startYear={moment(
          years.plannedStartOn === '' ? undefined : years.plannedStartOn,
        ).year()}
        endYear={moment().year() + 30}
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
