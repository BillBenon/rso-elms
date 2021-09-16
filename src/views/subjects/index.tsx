import React, { useState } from 'react';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CourseCardMolecule from '../../components/Molecules/cards/CourseCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewLessonForm from '../../components/Organisms/forms/subjects/NewLessonForm';
import NewSubjectForm from '../../components/Organisms/forms/subjects/NewSubjectForm';
import Dashboard from '../../layout/Dashboard';
import { CourseModelDataType, Link } from '../../types';

export default function Subjects() {
  const [open, setOpen] = useState(false); // state to controll the popup

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  function submited() {
    setOpen(false);
    setPrOpen(true);
  }

  function handleSearch() {}

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  const data: CourseModelDataType[] = [
    {
      status: { type: 'success', text: 'On going' },
      code: 'Ra01-430st',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      description:
        'This is a course description. It states briefy what this course is all about.',
    },
    {
      status: { type: 'success', text: 'On going' },
      code: 'Ra01-430st',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      description:
        'This is a course description. It states briefy what this course is all about.',
    },
    {
      status: { type: 'warning', text: 'On Hold' },
      code: 'Ra01-430st',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      description:
        'This is a course description. It states briefy what this course is all about.',
    },
    {
      status: { type: 'error', text: 'Completed' },
      code: 'Ra01-430st',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      description:
        'This is a course description. It states briefy what this course is all about.',
    },
  ];

  return (
    <Dashboard>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section className="">
          <TableHeader totalItems={4} title="Subjects" handleSearch={handleSearch}>
            <Button onClick={() => setOpen(true)}>Add Subject</Button>
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

        {/* add module popup */}
        <PopupMolecule title="New Subject" open={open} onClose={() => setOpen(false)}>
          <NewSubjectForm onSubmit={submited} />
        </PopupMolecule>

        {/* add prerequesite popup */}
        <PopupMolecule
          title="Add Prerequesite"
          open={prOpen}
          onClose={() => setPrOpen(false)}>
          <NewLessonForm />
        </PopupMolecule>
      </main>
    </Dashboard>
  );
}
