import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CourseModelDataType, Link } from '../../../types';
import Badge from '../../Atoms/custom/Badge';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import Cacumber from '../../Molecules/Cacumber';
import AcademyProfileCard from '../../Molecules/cards/AcademyProfileCard';
import CourseCardMolecule from '../../Molecules/cards/CourseCardMolecule';
import PopupMolecule from '../../Molecules/Popup';
import TableHeader from '../../Molecules/table/TableHeader';
import { Tab, Tabs } from '../../Molecules/tabs/tabs';
import NewAcademicProgram from '../forms/programs/NewAcademicProgram';

interface IProgramData extends CourseModelDataType {}

export default function ProgramDetailsMolecule() {
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

  const programData: any = {
    status: { type: 'success', text: 'On going' },
    code: 'HR450-TC',
    title: 'Here we go',
    subTitle: 'ON Air',
    description:
      'We have all kind of courses in this card, we can support everything wabyanga wabyemera',
  };

  return (
    <>
      <main className="px-4">
        <section>
          <Cacumber list={list}></Cacumber>
        </section>
        <section>
          <TableHeader totalItems={3} title="Modules" showSearch={false}>
            <Button onClick={() => history.push('/programs/new')}>Add Program</Button>
          </TableHeader>
        </section>
        <Tabs activeIndex={0}>
          <Tab label="Program Info" className="pt-7">
            <div className="bg-main w-full h-72 px-11 py-6 flex flex-col justify-start">
              {/* program info */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <Heading fontWeight="semibold">{programData.code}</Heading>
                  <Heading fontWeight="semibold" color="primary">
                    Ra01-430st
                  </Heading>
                </div>

                {programData.status && (
                  <Badge badgecolor={programData.status.type}>
                    {programData.status.text}
                  </Badge>
                )}
              </div>

              {/* program details */}
              <div className="flex gap-12">
                <div className="w-80">
                  This program was put in for anyone who will complete it will have the
                  captain rank.{' '}
                </div>
                <div>Program Type</div>
                <div>Faculty</div>
              </div>

              {/* other elements */}

              <div className="flex justify-between mt-14">
                <div>
                  <AcademyProfileCard
                    color="txt-primary"
                    alt="profile image"
                    src="https://cdn.britannica.com/w:400,h:300,c:crop/26/157026-050-08ED6418/Sylvester-Stallone-1998.jpg">
                    Captain Liberi
                  </AcademyProfileCard>
                </div>
                <Button>Edit</Button>
              </div>
            </div>
          </Tab>
          <Tab label="Program Modules" className="pt-7">
            <section className="flex flex-wrap justify-between">
              {data.map((course) => (
                <div key={course.code}>
                  <CourseCardMolecule
                    data={course}
                    to={{ title: 'program list', to: 'programs/id' }}
                  />
                </div>
              ))}
            </section>
          </Tab>
        </Tabs>

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
