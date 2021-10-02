import React, { useEffect, useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import AddPrerequesitForm from '../../components/Organisms/forms/modules/AddPrerequisiteForm';
import NewModuleForm from '../../components/Organisms/forms/modules/NewModuleForm';
import { moduleStore } from '../../store/modules.store';
import { CommonCardDataType, Link } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

export default function Modules() {
  const [open, setOpen] = useState(false); // state to controll the popup

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  function submited() {
    setOpen(false);
    setPrOpen(true);
  }

  const { data } = moduleStore.getAllModules();
  const [modules, setModules] = useState<CommonCardDataType[]>([]);

  useEffect(() => {
    let newModules: CommonCardDataType[] = [];
    data?.data.data.forEach((module) => {
      newModules.push({
        status: {
          type: advancedTypeChecker(module.generic_status),
          text: module.generic_status.toString(),
        },
        code: module.code,
        title: module.name,
        description: module.description,
      });
    });

    setModules(newModules);
  }, [data]);

  function handleSearch() {}

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  return (
    <>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section className="">
          <TableHeader
            totalItems={modules.length}
            title="Modules"
            handleSearch={handleSearch}>
            <Button onClick={() => setOpen(true)}>Add Module</Button>
          </TableHeader>
        </section>
        <section className="flex flex-wrap justify-between mt-2">
          {modules.map((course, index) => (
            <div key={course.code} className="p-1 mt-3">
              <CommonCardMolecule
                data={course}
                to={{ title: 'module', to: 'modules/id' }}>
                <p className="pt-3">
                  Total subjects:
                  <span className="px-1 text-primary-500">
                    {data?.data.data[index].total_num_subjects || 'None'}
                  </span>
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
