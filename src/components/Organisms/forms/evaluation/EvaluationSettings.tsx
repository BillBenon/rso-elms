import React from 'react';

import { getDropDownOptions } from '../../../../utils/getOption';
import Input from '../../../Atoms/Input/Input';
import Heading from '../../../Atoms/Text/Heading';
import ILabel from '../../../Atoms/Text/ILabel';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import SwitchMolecule from '../../../Molecules/input/SwitchMolecule';

export default function EvaluationSettings() {
  return (
    <div>
      <Heading fontSize="base" fontWeight="medium">
        Evaluation Settings
      </Heading>
      <div className="flex gap-6 items-center mt-12">
        <Heading fontSize="sm" fontWeight="medium">
          Evaluation Settings
        </Heading>
        <Input
          readonly
          width="60"
          name="maximum_file_size"
          value="Munezero Didier"
          handleChange={() => {}}
        />
      </div>
      <div className="pt-6 flex-col">
        <ILabel>Shuffle evaluation questions</ILabel>
        <SwitchMolecule
          loading={false}
          name="shuffle"
          value={false}
          handleChange={() => {}}>
          True
        </SwitchMolecule>
      </div>{' '}
      <div className="pt-6 flex-col">
        <ILabel>Evaluation Reviewing status</ILabel>
        <SwitchMolecule
          loading={false}
          name="shuffle"
          value={true}
          handleChange={() => {}}>
          True
        </SwitchMolecule>
      </div>
      <div className="pt-6">
        <DropdownMolecule
          width="60"
          placeholder="Approver"
          options={getDropDownOptions({
            inputs: [],
            labelName: ['first_name', 'last_name'],
          })}
          name="current_admin_id"
          handleChange={() => {}}>
          To be reviewed by
        </DropdownMolecule>
      </div>
      <div className="pt-6 flex-col">
        <ILabel>Evaluation Approval status</ILabel>
        <SwitchMolecule
          showLabelFirst
          loading={false}
          name="shuffle"
          value={true}
          handleChange={() => {}}>
          True
        </SwitchMolecule>
      </div>
      <div className="pt-6">
        <DropdownMolecule
          width="60"
          placeholder="Approver"
          options={getDropDownOptions({
            inputs: [],
            labelName: ['first_name', 'last_name'],
          })}
          name="current_admin_id"
          handleChange={() => {}}>
          To be approved by
        </DropdownMolecule>
      </div>
      <div className="pt-6 flex-col">
        <ILabel>Marking status</ILabel>
        <SwitchMolecule
          showLabelFirst
          loading={false}
          name="shuffle"
          value={true}
          handleChange={() => {}}>
          True
        </SwitchMolecule>
      </div>
      <div className="pt-6">
        <DropdownMolecule
          isMulti
          width="60"
          placeholder="Marker"
          options={getDropDownOptions({
            inputs: [],
            labelName: ['first_name', 'last_name'],
          })}
          name="current_admin_id"
          handleChange={() => {}}>
          To be marked by
        </DropdownMolecule>
      </div>
      {/* <SwitchMolecule
        loading={false}
        name="shuffle"
        value={false}
        handleChange={() => {}}>
        Evaluation Reviewing status
      </SwitchMolecule> */}
    </div>
  );
}
