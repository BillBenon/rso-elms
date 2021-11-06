import React from 'react';

import { commonInputProps } from '../../../types';
import Checkbox from '../../Atoms/Input/CheckBox';
import ILabel from '../../Atoms/Text/ILabel';

interface IProps extends commonInputProps {
  isFlex?: boolean;
}

export default function CheckboxMolecule(props: IProps) {
  return (
    <div className="py-2">
      <ILabel size="sm" weight="bold">
        {props.placeholder}
      </ILabel>
      <div className={props.isFlex ? 'grid grid-cols-2' : 'block'}>
        {props.options?.map((op: any, i) => (
          <div className="pt-2 px-1" key={i}>
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
    </div>
  );
}
