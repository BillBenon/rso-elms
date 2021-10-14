import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { Link as LinkList } from '../../types';
import { getQueryParamasId } from '../../utils/getQueryParamasID';
import EvaluationContent from './EvaluationContent';

export default function ViewEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const queryStr = getQueryParamasId(location.search);

  console.log(queryStr);

  const list: LinkList[] = [
    { to: '/', title: 'home' },
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
      href: `${url}/submissions`,
    },
  ];

  useEffect(() => {
    setEvaluations(data);
  }, []);

  return (
    <Switch>
      <Route exact path={`${path}/new`} render={() => <NewEvaluation />} />
      <Route
        path={`${path}`}
        render={() => (
          <div>
            <section>
              <BreadCrumb list={list}></BreadCrumb>
            </section>
            <TableHeader title="Evaluations" showBadge={false} showSearch={false}>
              <Link to={`${path}/new`}>
                <Button>New Evaluation</Button>
              </Link>
            </TableHeader>

            <TabNavigation tabs={tabs} onTabChange={(event) => {}}>
              <Route
                exact
                path={`${path}/submissions`}
                render={() => (
                  <Table<any>
                    statusColumn="status"
                    data={data2}
                    hide={['id']}
                    uniqueCol={'id'}
                    // actions={actions
                  />
                )}
              />

              <Route
                exact
                path={`${path}`}
                render={() => (
                  <section>
                    {evaluations.length <= 0 ? (
                      <NoDataAvailable
                        buttonLabel="Add new evaluation"
                        title={'No evaluations available'}
                        handleClick={() => history.push(`${url}/new`)}
                        description="And the web just isnt the same without you. Lets get you back online!"
                      />
                    ) : queryStr.query ? (
                      <EvaluationContent />
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
            </TabNavigation>
          </div>
        )}
      />
    </Switch>
  );
}
