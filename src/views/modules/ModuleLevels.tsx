import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
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
  ];

  return (
    <Tabs className="my-4">
      <Tab label="Level 1">
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
      </Tab>
      <Tab label="Level 2">
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
      </Tab>
    </Tabs>
  );
}
