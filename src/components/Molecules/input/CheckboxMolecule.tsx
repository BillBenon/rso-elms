import React from 'react';

import { commonInputProps } from '../../../types';
import Checkbox from '../../Atoms/Input/CheckBox';
import Heading from '../../Atoms/Text/Heading';

export default function CheckboxMolecule(props: commonInputProps) {
  return (
    <div className="py-2">
      <Heading fontSize="sm" fontWeight="bold" className="py-2">
        {props.placeholder}
      </Heading>
      {props.options.map((op: any, i) => (
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
