import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import TableHeader from '../../components/Molecules/table/TableHeader';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';

export default function ModuleLevels() {
  const { url } = useRouteMatch();
  const history = useHistory();

  const data = [
    {
      id: 1,
      status: { type: 'success', text: 'Active' },
      description: 'Prerequisite: True',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      code: 'Math01',
    },
    {
      id: 1,
      status: { type: 'warning', text: 'pending' },
      description: 'Prerequisite: True',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      code: 'Math01',
    },
    {
      id: 1,
      status: { type: 'error', text: 'inactive' },
      description: 'Prerequisite: True',
      title: 'The basics of Biomedics (This is the case of a course with a long name',
      code: 'Math01',
    },
  ];
  const data2 = [
    {
      id: 1,
      status: { type: 'error', text: 'inactive' },
      description:
        'This is a course description. It states briefy what this course is all about. View More',
      title: 'Biomedics',
      code: 'Ra01-430st',
    },
    {
      id: 1,
      status: { type: 'error', text: 'inactive' },
      description:
        'This is a course description. It states briefy what this course is all about. View More',
      title: 'Biomedics',
      code: 'Ra01-430st',
    },
    {
      id: 1,
      status: { type: 'error', text: 'inactive' },
      description:
        'This is a course description. It states briefy what this course is all about. View More',
      title: 'Biomedics',
      code: 'Ra01-430st',
    },
  ];

  return (
    <>
      <div className="flex justify-between pt-4">
        <Heading className="self-start" fontWeight="semibold" fontSize="xl">
          Program Title
        </Heading>
        <TableHeader usePadding={false} showBadge={false} showSearch={false}>
          <Button styleType="outline">View classes</Button>
          <Button styleType="outline">Add module</Button>
        </TableHeader>
      </div>
      <Tabs>
        <Tab label="Level 1">
          <div className="flex flex-wrap justify-start gap-6 mt-4">
            {data?.map((info: any, index: number) => (
              <div key={index}>
                <CommonCardMolecule
                  className="cursor-pointer"
                  handleClick={() => {
                    history.push({
                      pathname: `${url}`,
                      search: `?evaluationId=${info.id}`,
                    });
                  }}
                  data={info}
                />
              </div>
            ))}
          </div>
        </Tab>
        <Tab label="Level 2">
          <div className="flex flex-wrap justify-start gap-6 mt-4">
            {data2?.map((info: any, index: number) => (
              <div key={index}>
                <CommonCardMolecule
                  className="cursor-pointer"
                  handleClick={() => {
                    history.push({
                      pathname: `${url}`,
                      search: `?evaluationId=${info.id}`,
                    });
                  }}
                  data={info}
                />
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
