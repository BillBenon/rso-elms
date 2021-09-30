import React from 'react';

import { commonInputProps } from '../../../types';
import Checkbox from '../../Atoms/Input/CheckBox';
import ILabel from '../../Atoms/Text/ILabel';

export default function CheckboxMolecule(props: commonInputProps) {
  return (
    <div className="py-2">
      <ILabel size="lg" weight="bold">
        {props.placeholder}
      </ILabel>
      {props.options?.map((op: any, i) => (
        <div className="pt-1 px-1" key={i}>
          <Checkbox
            name={props.name}
            value={op.value}
            checked={false}
            label={op.label}
            handleChange={() => props.handleChange}
          />
        </div>
      ))}
    </div>
  );
}
