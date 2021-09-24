import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CommonCardDataType, Link } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Cacumber from '../../Molecules/Cacumber';
import CommonCardMolecule from '../../Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../Molecules/Popup';
import TableHeader from '../../Molecules/table/TableHeader';
import NewAcademicProgram from '../forms/programs/NewAcademicProgram';

interface IProgramData extends CommonCardDataType {}

export default function AcademicProgram() {
  const history = useHistory();
  const [open, setOpen] = useState(false); // state to controll the popup

  const [prOpen, setPrOpen] = useState(false); // state to controll the popup

  //eslint-disable-next-line
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
      title: 'Caddette Program',
      subTitle: 'Short Course',
      description: 'Program description, that briefly provides details on pa program',
    },
    {
      status: { type: 'success', text: 'On going' },
      code: 'CD450-TD',
      title: 'Caddete program',
      subTitle: 'short course',
      description: 'Program description, that briefly provides details on pa program',
    },
    {
      status: { type: 'warning', text: 'On Hold' },
      code: 'PR480-TC',
      title: 'Caddette program',
      subTitle: 'short course',
      description: 'Program description, that briefly provides details on pa program',
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
          {data.map((Common) => (
            <div key={Common.code} className="p-1 mt-3">
              <CommonCardMolecule
                data={Common}
                to={{ title: 'module', to: 'programs/3' }}
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
