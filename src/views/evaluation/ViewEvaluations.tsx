import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import { Link as LinkList } from '../../types';

export default function ViewEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { url, path } = useRouteMatch();

  const list: LinkList[] = [
    { to: 'home', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
  ];

  const data = [
    {
      id: 1,
      status: { type: 'warning', text: 'pending' },
      description: '100 marks',
      title: 'Semester 1 exam',
      code: 'Exam',
    },
  ];

  const data2 = [
    {
      id: 1,
      'Student code': '034909',
      status: 'active',
      score: '25',
      code: 'Exam',
      'time used': '20:09',
    },
    {
      id: 2,
      'Student code': '034909',
      status: 'pending',
      score: '25',
      code: 'Exam',
      'time used': '20:09',
    },
    {
      id: 3,
      'Student code': '034909',
      status: 'inactive',
      score: '25',
      code: 'Exam',
      'time used': '20:09',
    },
  ];

  const tabs = [
    {
      label: 'Overview evaluation',
      href: `${url}`,
    },
    {
      label: 'Submissions',
      href: `${url}/evaluations/submissions`,
    },
  ];

  useEffect(() => {
    setEvaluations(data);
  }, []);

  return (
    <div>
      <section>
        <Cacumber list={list}></Cacumber>
      </section>
      <TableHeader title="Evaluations" showBadge={false} showSearch={false}>
        <Link to={`${url}/new`}>
          <Button>New Evaluation</Button>
        </Link>
      </TableHeader>

      <TabNavigation tabs={tabs} onTabChange={(event) => {}}>
        <Route
          exact
          path={`${path}/`}
          render={() => (
            <section className="flex flex-wrap justify-between">
              {evaluations.length <= 0 ? (
                <NoDataAvailable
                  buttonLabel="Add new evaluation"
                  title={'No evaluations available'}
                  handleClick={() => history.push(`${url}/new`)}
                  description="And the web just isnt the same without you. Lets get you back online!"
                />
              ) : (
                evaluations?.map((info, index) => (
                  <div key={index}>
                    <CommonCardMolecule
                      className="cursor-pointer"
                      handleClick={() => {
                        history.push({
                          pathname: `${url}`,
                          search: `?query=${info.id}`,
                        });
                      }}
                      data={info}
                    />
                  </div>
                ))
              )}
            </section>
          )}
        />
        <Route
          exact
          path={`${path}/evaluations/submissions`}
          render={() => (
            <Table<any>
              statusColumn="status"
              data={data2}
              hide={['id']}
              uniqueCol={'id'}
              // actions={actions}
            />
          )}
        />
      </TabNavigation>
    </div>
  );
}
