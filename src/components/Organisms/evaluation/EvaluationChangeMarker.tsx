import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import {
  IEvaluationInfo,
  IEvaluationSectionBased,
} from '../../../types/services/evaluation.types';
import { UserInfo } from '../../../types/services/user.types';
import { getDropDownOptions } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import SelectMolecule from '../../Molecules/input/SelectMolecule';
export function EvaluationChangeMarker({
  evaluation,
  module,
  markers,
}: {
  evaluation: IEvaluationInfo;
  module: IEvaluationSectionBased;
  markers: UserInfo[];
}) {
  const [marker, setMarker] = useState(module.marker?.id);

  console.log({ evaluation });

  function handleChange({ value }: ValueType) {
    setMarker(value as string);
  }

  const { mutate } = evaluationStore.updateMarkersOnModule();

  return (
    <div className="py-5">
      <p className="w-full"> {module.module_subject?.title} </p>
      <SelectMolecule
        handleChange={handleChange}
        name={'module'}
        value={marker}
        options={getDropDownOptions({
          inputs: markers,
          labelName: ['first_name', 'last_name'],
        })}
        placeholder="marker"
      />

      <Button
        className="my-5"
        onClick={() => {
          mutate(
            {
              markerId: marker + '',
              id: module.id + '',
            },
            {
              onSuccess: () => {
                toast.success(
                  `Marker updated successfully for ${module.module_subject?.title} module`,
                );
              },
              onError: () => {
                toast.error(
                  `Error updating marker for ${module.module_subject?.title} module`,
                );
              },
            },
          );
        }}>
        Save
      </Button>
    </div>
  );
}
