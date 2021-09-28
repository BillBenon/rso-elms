import React, { useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import AddPrerequesitForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import { CommonCardDataType, Link } from '../../types';

export default function Modules() {
  const [open, setOpen] = useState(false); // state to controll the popup

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  function submited() {
    setOpen(false);
    setPrOpen(true);
    console.log('from submit');
  }

  function handleSearch() {}

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  const data: CommonCardDataType[] = [
    {
      status: { type: 'success', text: 'On going' },
      code: 'MOD-23D',
      title: 'Math',
      description: 'Module brief description that shows user , what module consist',
    },
    {
      status: { type: 'success', text: 'On going' },
      code: 'MOD-23D',
      title: 'Physics',
      description: 'Module brief description that shows user , what module consist',
    },
    {
      status: { type: 'warning', text: 'On Hold' },
      code: 'MOD-26Y',
      title: 'Biology',
      description: 'Module brief description that shows user , what module consist',
    },
    {
      status: { type: 'error', text: 'Completed' },
      code: 'MOD-6YA',
      title: 'English',
      description: 'Module brief description that shows user , what module consist',
    },
    {
      status: { type: 'error', text: 'Completed' },
      code: 'MOD-6YA',
      title: 'English',
      description: 'Module brief description that shows user , what module consist',
    },
  ];

  return (
    <>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section className="">
          <TableHeader totalItems={34} title="Modules" handleSearch={handleSearch}>
            <Button onClick={() => setOpen(true)}>Add Module</Button>
          </TableHeader>
        </section>
        <section className="flex flex-wrap justify-between mt-2">
          {data.map((course) => (
            <div key={course.code} className="p-1 mt-3">
              <CommonCardMolecule
                data={course}
                to={{ title: 'module', to: 'modules/id' }}>
                <p>
                  Prerequesites: <span className="text-primary-500">3</span>
                </p>
              </CommonCardMolecule>
            </div>
          ))}
        </section>

        {/* add module popup */}
        <PopupMolecule title="New Module" open={open} onClose={() => setOpen(false)}>
          <NewModuleForm onSubmit={submited} />
        </PopupMolecule>

        {/* add prerequesite popup */}
        <PopupMolecule
          title="Add Prerequesite"
          open={prOpen}
          onClose={() => setPrOpen(false)}>
          <AddPrerequesitForm />
        </PopupMolecule>
      </main>
    </>
  );
}
