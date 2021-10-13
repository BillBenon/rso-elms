/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import _ from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../components/Molecules/input/TextAreaMolecule';
import { divisionStore } from '../../store/divisions.store';
import { levelStore } from '../../store/level.store';
import programStore from '../../store/program.store';
import usersStore from '../../store/users.store';
import { CommonFormProps, ParamType, ValueType } from '../../types';
import { IcreateLevel, ILevel } from '../../types/services/levels.types';
import {
  CreateAcademicProgramLevel,
  CreateProgramInfo,
  ProgramStatus,
  ProgramType,
} from '../../types/services/program.types';
import { UserType } from '../../types/services/user.types';
import { getDropDownOptions, getDropDownStatusOptions } from '../../utils/getOption';

interface INewAcademyProgram<K> extends CommonFormProps<K> {}
interface FilteredLevels
  extends Pick<ILevel, 'id' | 'name' | 'description' | 'generic_status' | 'flow'> {}

let filteredLevelFlows: FilteredLevels[];
export default function NewAcademicProgram<E>({ onSubmit }: INewAcademyProgram<E>) {
  const history = useHistory();
  const { id } = useParams<ParamType>();
  const [progId, setProgId] = useState<string>('');

  const [levels, setLevels] = useState<FilteredLevels[]>();

  const { data } = usersStore.fetchUsers();

  const instructors = data?.data.data.filter(
    (user) => user.user_type === UserType.INSTRUCTOR,
  );

  const departments = divisionStore.getDivisionByType('DEPARTMENT').data?.data.data;
  const { data: levelsInfo } = levelStore.getLevels(); // fetch levels

  const [details, setDetails] = useState<CreateProgramInfo>({
    code: '',
    current_admin_id: '',
    department_id: id ? id : '',
    description: '',
    name: '',
    type: ProgramType.SHORT_COURSE,
    status: ProgramStatus.ACTIVE,
  });

  const [programInfo, setProgramInfo] = useState({
    programId: '',
    isProgramCreated: false,
  });

  useEffect(() => {
    setLevelFlows((flows) => ({ ...flows, program_id: progId }));
  }, [progId]);

  const [levelFlows, setLevelFlows] = useState<CreateAcademicProgramLevel>({
    endg_flow: 0,
    id: '',
    // program_id: '12e6dcb2-776a-489b-a068-3f1f90dd9890',
    program_id: progId,
    starting_flow: 0,
  });

  const { mutateAsync: mutateAsync2 } = programStore.addProgramToLevel();
  const { mutateAsync } = programStore.createProgram();

  function handleChange(e: ValueType) {
    setDetails((details) => ({
      ...details,
      [e.name]: e.value,
    }));
  }

  function handleFlowChange(e: ValueType) {
    setLevelFlows((flows) => ({
      ...flows,
      [e.name]: e.value,
    }));

    if (e.name === 'starting_flow' && levels) {
      filteredLevelFlows = levels?.filter(
        (flow) =>
          flow.flow > levelFlows.starting_flow && flow.flow !== levelFlows.starting_flow,
      );
    }
  }

  async function createLevel() {
    console.log(progId);

    await mutateAsync2(levelFlows, {
      onSuccess() {
        toast.success('Level added to program');
        history.push('/dashboard/programs');
      },
      onError() {
        toast.error('An error occurred please try again');
      },
    });
  }

  useEffect(() => {
    // filter data to display
    const filterdData = levelsInfo?.data.data.map((level) =>
      _.pick(level, ['id', 'name', 'description', 'generic_status', 'flow']),
    );

    levelsInfo?.data.data && setLevels(filterdData);
  }, [data, levelsInfo?.data.data]);

  async function createProgram<T>(e: FormEvent<T>) {
    e.preventDefault();

    if (onSubmit) onSubmit(e);
    await mutateAsync(details, {
      onSuccess(newData) {
        setProgId(newData.data.data.id.toString());

        setProgramInfo((details) => ({
          ...details,
          programId: newData.data.data.id.toString(),
          isProgramCreated: false,
        }));
        toast.success('Program created');
      },
      onError() {
        toast.error('An error occurred please try again later');
      },
    });
  }

  return (
    <>
      <form onSubmit={createProgram}>
        <div className="p-6 w-5/12 pl-8 gap-3 rounded-lg bg-main mt-8 flex-col">
          <div className="py-5 mb-3 capitalize">
            <Heading color="txt-primary" fontWeight="bold">
              New Program
            </Heading>
          </div>
          <InputMolecule
            required
            value={details.name}
            handleChange={handleChange}
            name="name">
            program name
          </InputMolecule>
          <InputMolecule
            value={details.code}
            required
            handleChange={handleChange}
            name="code">
            Program code
          </InputMolecule>
          <RadioMolecule
            className="pb-2"
            value={details.type}
            required
            name="type"
            options={getDropDownStatusOptions(ProgramType)}
            handleChange={handleChange}>
            Program Type
          </RadioMolecule>
          <TextAreaMolecule
            value={details.description}
            required
            name="description"
            handleChange={handleChange}>
            Program description
          </TextAreaMolecule>
          <DropdownMolecule
            width="64"
            placeholder="Select incharge"
            options={getDropDownOptions({
              inputs: instructors || [],
              labelName: 'username',
            })}
            name="current_admin_id"
            handleChange={handleChange}>
            Incharge
          </DropdownMolecule>

          {!id && (
            <DropdownMolecule
              width="64"
              placeholder="Select department"
              options={getDropDownOptions({ inputs: departments || [] })}
              name="department_id"
              handleChange={handleChange}>
              Department
            </DropdownMolecule>
          )}

          <RadioMolecule
            value={details.status}
            name="status"
            options={getDropDownStatusOptions(ProgramStatus)}
            handleChange={handleChange}>
            Status
          </RadioMolecule>
          {/* save button */}
          <div className="mt-5">
            <Button type="submit">Save</Button>
          </div>

          <div className="mt-8">
            <Heading color="txt-primary" fontWeight="bold" className="mb-6">
              Add level
            </Heading>
            <DropdownMolecule
              options={getDropDownOptions({ inputs: levels || [], value: 'flow' })}
              name="starting_flow"
              handleChange={handleFlowChange}>
              Start level
            </DropdownMolecule>

            <DropdownMolecule
              options={getDropDownOptions({
                inputs: filteredLevelFlows || [],
                value: 'flow',
              })}
              name="endg_flow"
              handleChange={handleFlowChange}>
              End level
            </DropdownMolecule>
          </div>
        </div>
      </form>
      <div className="mt-5">
        <Button disabled={programInfo.isProgramCreated} onClick={createLevel}>
          Save
        </Button>
      </div>
    </>
  );
}
