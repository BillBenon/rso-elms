import React from 'react';

import { Link as LinkList } from '../../../../types';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import Cacumber from '../../../Molecules/Cacumber';
import DropdownMolecule from '../../../Molecules/input/DropdownMolecule';
import InputMolecule from '../../../Molecules/input/InputMolecule';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import TextAreaMolecule from '../../../Molecules/input/TextAreaMolecule';

export default function NewEvaluation() {
  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
    { to: 'new', title: 'new evaluation' },
  ];

  return (
    <div>
      <section>
        <Cacumber list={list}></Cacumber>
      </section>

      {/* form section */}
      <div className="pt-9">
        <Heading fontWeight="semibold" fontSize="2xl" color="primary">
          New evaluation
        </Heading>

        <form
          className="pt-6"
          onSubmit={(e) => {
            e.preventDefault();
            // handleNext();
          }}>
          <InputMolecule
            width="80"
            required
            name="evaluation_name"
            placeholder="Evaluation Name"
            value=""
            handleChange={() => {}}>
            Evaluation Name
          </InputMolecule>
          <DropdownMolecule
            width="64"
            name="programs"
            placeholder="Program"
            handleChange={() => {}}
            isMulti
            options={[]}>
            Evaluation type
          </DropdownMolecule>

          <DropdownMolecule
            width="64"
            name="programs"
            placeholder="Program"
            handleChange={() => {}}
            isMulti
            options={[]}>
            Select module
          </DropdownMolecule>

          <RadioMolecule
            className="pb-4"
            value=""
            name="status"
            options={[
              { label: 'Module', value: '' },
              { label: 'Subject', value: '' },
            ]}
            handleChange={() => {}}>
            Evaluation classification
          </RadioMolecule>

          <DropdownMolecule
            width="64"
            name="programs"
            placeholder="Program"
            handleChange={() => {}}
            isMulti
            options={[]}>
            Select subject
          </DropdownMolecule>

          <RadioMolecule
            className="pb-4"
            value=""
            name="status"
            options={[
              { label: 'public', value: '' },
              { label: 'private', value: '' },
            ]}
            handleChange={() => {}}>
            Evaluation type
          </RadioMolecule>

          <RadioMolecule
            className="pb-4"
            value=""
            name="status"
            options={[
              { label: 'open', value: '' },
              { label: 'multiple choice', value: '' },
            ]}
            handleChange={() => {}}>
            Questionaire type
          </RadioMolecule>

          <TextAreaMolecule
            required
            name={'description'}
            value=""
            handleChange={() => {}}>
            Evaluation instructions
          </TextAreaMolecule>

          <InputMolecule
            width="28"
            required
            name="evaluation_name"
            value=""
            handleChange={() => {}}>
            Evaluation marks
          </InputMolecule>

          <div className="pt-3">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
