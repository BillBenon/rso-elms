import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CourseModelDataType, Link } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Cacumber from '../../Molecules/Cacumber';
import CourseCardMolecule from '../../Molecules/cards/CourseCardMolecule';
import PopupMolecule from '../../Molecules/Popup';
import TableHeader from '../../Molecules/table/TableHeader';
import NewAcademicProgram from '../forms/programs/NewAcademicProgram';

interface IProgramData extends CourseModelDataType {}

export default function AcademicProgram() {
  const history = useHistory();
  const [open, setOpen] = useState(false); // state to controll the popup

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  function submited() {
    setOpen(false);
    setPrOpen(true);
  }

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  const data: IProgramData[] = [
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
  ];

  return (
    <>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section>
          <TableHeader totalItems={3} title="Programs" showSearch={false}>
            <Button onClick={() => history.push('/programs/new')}>Add Program</Button>
          </TableHeader>
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

        {/* add academic program popup */}
        <PopupMolecule title="New Program" open={open} onClose={() => setOpen(false)}>
          <NewAcademicProgram />
        </PopupMolecule>

        {/* add prerequesite popup */}
        <PopupMolecule
          title="Add Prerequesite"
          open={prOpen}
          onClose={() => setPrOpen(false)}>
          another form here
        </PopupMolecule>
      </main>
    </>
  );
}
