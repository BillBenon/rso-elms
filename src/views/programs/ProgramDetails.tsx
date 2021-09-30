import React from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import UsersPreview from '../../components/Molecules/cards/UsersPreview';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import { CommonCardDataType, Link } from '../../types';

export default function ProgramDetailsMolecule() {
  const history = useHistory();

  const list: Link[] = [
    { to: 'home', title: 'home' },
    { to: 'modules', title: 'modules' },
    { to: 'subjects', title: 'subjects' },
  ];

  const data: CommonCardDataType[] = [
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
            <div className="flex">
              <div className="mr-24">
                <CommonCardMolecule data={programData}>
                  <div className="flex flex-col mt-8 gap-7 pb-2">
                    <Heading fontSize="base">Faculty name</Heading>

                    <div className="flex items-center gap-2">
                      <Avatar
                        alt="program oic"
                        size="32"
                        src="https://cdn.britannica.com/w:400,h:300,c:crop/26/157026-050-08ED6418/Sylvester-Stallone-1998.jpg"
                      />
                      <Heading fontSize="sm">Captail Liberi</Heading>
                    </div>
                  </div>
                </CommonCardMolecule>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex gap-8">
                  <UsersPreview title="Students" totalUsers={100} />
                  <UsersPreview title="Students" totalUsers={8} />
                </div>
                <div className="flex flex-col gap-7 bg-main w-60 p-6">
                  <Heading color="txt-secondary" fontSize="base">
                    Intakes
                  </Heading>
                  <div className="flex flex-col gap-8">
                    <Heading fontSize="base">Active Intakes</Heading>
                    <Heading fontSize="base">Active Intakes</Heading>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab label="Program Modules" className="pt-7">
            <section className="flex flex-wrap justify-between">
              {data.map((course) => (
                <div key={course.code}>
                  <CommonCardMolecule
                    data={course}
                    to={{ title: 'program list', to: 'programs/3' }}
                  />
                </div>
              ))}
            </section>
          </Tab>
        </Tabs>
      </main>
    </>
  );
}
