import _ from 'lodash';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import DropdownMolecule from '../../components/Molecules/input/DropdownMolecule';
import { queryClient } from '../../plugins/react-query';
import { levelStore } from '../../store/level.store';
import programStore from '../../store/program.store';
import { ParamType, ValueType } from '../../types';
import { ILevel } from '../../types/services/levels.types';
import { CreateAcademicProgramLevel } from '../../types/services/program.types';
import { getDropDownOptions } from '../../utils/getOption';

interface FilteredLevels
  extends Pick<ILevel, 'id' | 'name' | 'description' | 'generic_status' | 'flow'> {}

export default function AddLevelToProgram() {
  const { id: progId } = useParams<ParamType>();
  const history = useHistory();
  const [levels, setLevels] = useState<FilteredLevels[]>();
  const { data: levelsInfo } = levelStore.getLevels(); // fetch levels
  const { mutateAsync } = programStore.addProgramToLevel();
  const [filteredLevelFlows, setFilteredLevelFlows] = useState<FilteredLevels[]>([]);

  useEffect(() => {
    setLevelFlows((flows) => ({ ...flows, program_id: progId }));
  }, [progId]);

  const [levelFlows, setLevelFlows] = useState<CreateAcademicProgramLevel>({
    endg_flow: 0,
    program_id: progId,
    starting_flow: 0,
  });

  useEffect(() => {
    // filter data to display
    const filterdData = levelsInfo?.data.data.map((level) =>
      _.pick(level, ['id', 'name', 'description', 'generic_status', 'flow']),
    );

    levelsInfo?.data.data && setLevels(filterdData);
  }, [levelsInfo?.data.data]);

  function handleChange(e: ValueType) {
    setLevelFlows((flows) => ({
      ...flows,
      [e.name]: e.value,
    }));
  }

  useEffect(() => {
    let newLevelFlow =
      levels?.filter(
        (flow) =>
          flow.flow > levelFlows.starting_flow && flow.flow !== levelFlows.starting_flow,
      ) || [];
    setFilteredLevelFlows(newLevelFlow);
  }, [levelFlows.starting_flow]);

  function addLevelToProg<T>(e: FormEvent<T>) {
    e.preventDefault();

    mutateAsync(levelFlows, {
      onSuccess() {
        toast.success('Level added to program');
        queryClient.invalidateQueries(['levels/program_id']);
        history.push(`/dashboard/programs/${progId}/`);
      },
      onError() {
        toast.error('An error occurred please try again');
      },
    });
  }

  return (
    <form onSubmit={addLevelToProg}>
      <>
        <DropdownMolecule
          options={getDropDownOptions({ inputs: levels || [], value: 'flow' })}
          name="starting_flow"
          placeholder="Starting flow"
          handleChange={handleChange}>
          Start level
        </DropdownMolecule>

        <DropdownMolecule
          placeholder="Ending flow"
          options={getDropDownOptions({
            inputs: filteredLevelFlows,
            value: 'flow',
          })}
          name="endg_flow"
          handleChange={handleChange}>
          End level
        </DropdownMolecule>
      </>
      <div className="mt-5">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
