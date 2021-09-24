import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CommonCardDataType, Link } from '../../../types';
import Avatar from '../../Atoms/custom/Avatar';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import Cacumber from '../../Molecules/Cacumber';
import CommonCardMolecule from '../../Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../Molecules/Popup';
import TableHeader from '../../Molecules/table/TableHeader';
import Tooltip from '../../Molecules/Tooltip';
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
            <Tooltip
              key={Common.code}
              trigger={
                <div className="p-1 mt-3">
                  <CommonCardMolecule
                    data={Common}
                    to={{ title: 'module', to: 'programs/3' }}
                  />
                </div>
              }
              open>
              {' '}
              <div className="w-96">
                <Heading fontSize="sm" fontWeight="semibold" className="mb-4">
                  Cadette Program
                </Heading>

                <div className="flex gap-24">
                  {/* first column */}

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Faculty
                      </Heading>
                      <Heading fontSize="sm" fontWeight="semibold">
                        Military Department
                      </Heading>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Modules
                      </Heading>
                      <Heading fontSize="sm" fontWeight="semibold">
                        30
                      </Heading>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Intakes
                      </Heading>
                      <Heading fontSize="sm" fontWeight="semibold">
                        3
                      </Heading>
                    </div>
                  </div>

                  {/* second column */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Levels
                      </Heading>
                      <Heading fontSize="sm" fontWeight="semibold">
                        10
                      </Heading>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Attendees
                      </Heading>
                      <Heading fontSize="sm" fontWeight="semibold">
                        230
                      </Heading>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Heading color="txt-secondary" fontSize="sm">
                        Instructor in charge
                      </Heading>
                      <div className="flex items-center gap-2">
                        <Avatar
                          alt="program oic"
                          size="32"
                          src="https://cdn.britannica.com/w:400,h:300,c:crop/26/157026-050-08ED6418/Sylvester-Stallone-1998.jpg"
                        />
                        <Heading fontSize="sm">Captail Liberi</Heading>
                      </div>
                    </div>
                  </div>
                </div>

                {/* remarks section */}
                <div className="flex flex-col mt-8 gap-4">
                  <Heading fontSize="sm" fontWeight="semibold">
                    Remarks
                  </Heading>
                  <Heading fontSize="sm" color="txt-secondary">
                    This is a training description. It states briefy what this course is
                    all about. This is a training description. It states briefy what this
                    course is all about.
                  </Heading>
                </div>
                <div className="mt-4">
                  <Button onClick={() => history.push('/programs/3')}>View More</Button>
                </div>
              </div>
            </Tooltip>
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
