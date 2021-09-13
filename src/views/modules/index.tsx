import React, { useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Heading from '../../components/Atoms/Text/Heading';
import Cacumber from '../../components/Molecules/Cacumber';
import CourseCardMolecule from '../../components/Molecules/cards/CourseCardMolecule';
import InputMolecule from '../../components/Molecules/input/InputMolecule';
import RadioMolecule from '../../components/Molecules/input/RadioMolecule';
import SearchMolecule from '../../components/Molecules/input/SearchMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import Dashboard from '../../layout/Dashboard';
import { CourseModelDataType, Link, ValueType } from '../../types';

export default function Modules() {
  const [open, setOpen] = useState(false); // state to controll the popup
  const closeModel = () => setOpen(false); // when this is fired the popup will be closed
  const openModel = () => setOpen(true); // when this is fired the popup will be oponed

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  const data: CourseModelDataType[] = [
    {
      status: { type: 'success', text: 'On going' },
      code: 'HR450-TC',
      title: 'Here we go',
      subTitle: 'ON Air',
      description:
        'We have all kind of courses in this card, we can support everything wabyanga wabyemera',
    },
    {
      status: { type: 'success', text: 'On going' },
      code: 'HR450-TC',
      title: 'Here we go',
      subTitle: 'ON Air',
      description:
        'We have all kind of courses in this card, we can support everything wabyanga wabyemera',
    },
    {
      status: { type: 'warning', text: 'On Hold' },
      code: 'HR450-TC',
      title: 'Here we go',
      subTitle: 'ON Air',
      description:
        'We have all kind of courses in this card, we can support everything wabyanga wabyemera',
    },
    {
      status: { type: 'error', text: 'Completed' },
      code: 'HR450-TC',
      title: 'Here we go',
      subTitle: 'ON Air',
      description:
        'We have all kind of courses in this card, we can support everything wabyanga wabyemera',
    },
  ];

  function handleChange(e: ValueType) {
    console.log(e);
  }

  return (
    <Dashboard>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section className="flex justify-between items-center">
          <Heading fontSize="2xl" fontWeight="bold">
            Modules
          </Heading>
          <SearchMolecule></SearchMolecule>
          <Button icon type="outline" color="none" onClick={openModel}>
            <Icon name="chevron-right" />
          </Button>
          <Button onClick={openModel}>Add Module</Button>
        </section>
        <section className="flex flex-wrap justify-between mt-2">
          {data.map((course) => (
            <div key={course.code} className="p-1 mt-3">
              <CourseCardMolecule
                data={course}
                to={{ title: 'module', to: 'modules/id' }}
              />
            </div>
          ))}
        </section>

        {/* add module popup */}
        <PopupMolecule title="New Module" open={open} onClose={closeModel}>
          <form>
            {/* model name */}
            <InputMolecule
              value=""
              error=""
              handleChange={handleChange}
              name="model-name">
              Module name
            </InputMolecule>

            {/* model code
            <InputMolecule
              value=""
              error=""
              handleChange={handleChange}
              name="model-name">
              Module code
            </InputMolecule> */}

            {/* model initial status */}
            <RadioMolecule
              className="mt-4"
              value="ACTIVE"
              name="status"
              list={[
                { label: 'Active', value: 'ACTIVE' },
                { label: 'Inactive', value: 'INACTIVE' },
              ]}
              handleChange={handleChange}>
              Status
            </RadioMolecule>

            {/* model has prerequesit */}
            <RadioMolecule
              className="mt-4"
              name="prerequsites"
              list={[
                { label: 'Yes', value: 'YES' },
                { label: 'No', value: 'NO' },
              ]}
              handleChange={handleChange}>
              Has Prerequesites
            </RadioMolecule>

            {/* save button */}

            <div className="mt-5">
              <Button full>Save</Button>
            </div>
          </form>
        </PopupMolecule>
      </main>
    </Dashboard>
  );
}
