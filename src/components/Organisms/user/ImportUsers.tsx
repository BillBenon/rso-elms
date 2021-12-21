import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { queryClient } from '../../../plugins/react-query';
import academyStore from '../../../store/administration/academy.store';
import {
  getIntakesByAcademy,
  getProgramsByIntake,
} from '../../../store/administration/intake.store';
import intakeProgramStore from '../../../store/administration/intake-program.store';
import usersStore from '../../../store/administration/users.store';
import { SelectData, ValueType } from '../../../types';
import {
  IImportUser,
  IImportUserRes,
  UserType,
} from '../../../types/services/user.types';
import { getDropDownOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import FileUploader from '../../Atoms/Input/FileUploader';
import DropdownMolecule from '../../Molecules/input/DropdownMolecule';
import PopupMolecule from '../../Molecules/Popup';
import Heading from '../../Atoms/Text/Heading';

interface IProps {
  userType: UserType;
}

export default function ImportUsers({ userType }: IProps) {
  const history = useHistory();
  const [values, setValues] = useState<IImportUser>({
    academicProgramLevelId: '',
    academicYearId: '',
    academyId: '',
    intakeProgramId: '',
    userType,
    intake: '',
    file: null,
  });

  const [importReport, setimportReport] = useState<IImportUserRes | undefined>(undefined);

  const academies = academyStore.fetchAcademies().data?.data.data || [];
  const intakes =
    getIntakesByAcademy(values.academyId, false, values.academyId.length > 1).data?.data
      .data || [];
  const programs =
    getProgramsByIntake(values.intake, values.intake.length > 1).data?.data.data || [];

  const levels =
    intakeProgramStore.getLevelsByIntakeProgram(values.intakeProgramId!).data?.data
      .data || [];

  const { mutateAsync, isLoading } = usersStore.importUsers();

  async function handleSubmit<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (values.file) {
      let academicYearId =
        levels.find((l) => l.academic_program_level.id == values.academicProgramLevelId)
          ?.academic_year.id || '';

      let formData = new FormData();
      formData.append('file', values.file);
      formData.append('academicProgramLevelId', values.academicProgramLevelId);
      formData.append('academyId', values.academyId);
      formData.append('intakeProgramId', values.intakeProgramId);
      formData.append('userType', values.userType);
      formData.append('academicYearId', academicYearId?.toString());

      await mutateAsync(formData, {
        onSuccess(data) {
          queryClient.invalidateQueries('users');
          setimportReport(data.data.data);
        },
        onError(error: any) {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error('Please attach excel file.');
  }

  const handleUpload = (files: FileList | null) => {
    setValues({ ...values, file: files ? files[0] : null });
  };

  function handleChange(e: ValueType) {
    setValues({ ...values, [e.name]: e.value });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <DropdownMolecule
          options={getDropDownOptions({ inputs: academies || [] })}
          name="academyId"
          placeholder={'Academy to be enrolled'}
          handleChange={handleChange}>
          Academy
        </DropdownMolecule>
        <DropdownMolecule
          options={
            intakes?.map((intk) => ({ value: intk.id, label: intk.code })) as SelectData[]
          }
          name="intake"
          handleChange={handleChange}>
          Intake
        </DropdownMolecule>
        <DropdownMolecule
          options={
            programs.map((p) => ({ value: p.id, label: p.program.name })) as SelectData[]
          }
          name="intakeProgramId"
          placeholder={'Program'}
          handleChange={handleChange}>
          Program
        </DropdownMolecule>
        <DropdownMolecule
          options={
            levels.map((lv) => ({
              value: lv.academic_program_level.id,
              label: lv.academic_program_level.level.name,
            })) as SelectData[]
          }
          name="academicProgramLevelId"
          placeholder={'Program'}
          handleChange={handleChange}>
          Level
        </DropdownMolecule>
        <div className="py-2">
          <FileUploader
            allowPreview={false}
            handleUpload={handleUpload}
            accept={'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}>
            <Button type="button" styleType="outline" icon={true}>
              <span className="flex items-center">
                <Icon name={'attach'} fill="primary" />
                <span className="pr-3">Attach file</span>
              </span>
            </Button>
          </FileUploader>
        </div>
        <div className="py-2">
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
      <div className="pt-2">
        <a
          href="/documents/Importuserselms.xlsx"
          target="_blank"
          download
          className="text-sm font-bold text-primary-600 flex items-center">
          <Icon name="download" fill="primary" />
          <span> Download template</span>
        </a>
      </div>

      <PopupMolecule
        title="Import report"
        open={importReport ? true : false}
        onClose={history.goBack}>
        <div className="w-64">
          <Heading fontWeight="medium" fontSize="lg" color="success">
            File scanned sucessfully.
          </Heading>
          <div className="my-6">
            {importReport &&
              Object.keys(importReport.failures).map((key) => (
                <p className="my-2 bg-gray-50 text-error-500 p-2 text-sm rounded-sm ">
                  {`On row ${key}: ${importReport.failures[key]}`}
                </p>
              ))}
          </div>

          <Button
            onClick={() => {
              history.goBack();
            }}>
            Close
          </Button>
        </div>
      </PopupMolecule>
    </>
  );
}
