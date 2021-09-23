import React from 'react';

import { commonInputProps } from '../../../types';
import Checkbox from '../../Atoms/Input/CheckBox';
import ILabel from '../../Atoms/Text/ILabel';

export default function CheckboxMolecule(props: commonInputProps) {
  return (
    <div className="py-2">
      <ILabel size="sm" weight="medium">
        {props.placeholder}
      </ILabel>
      {props.options?.map((op: any, i) => (
        <div className="py-1" key={i}>
          <Checkbox
            name={props.name}
            value={op.value}
            checked={false}
            label={op.label}
            onChange={() => props.onChange}
            className="py-2 block"
            error={null}
          />
        </div>
      ))}
    </div>
  );
}
