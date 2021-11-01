import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { evaluationStore } from '../../store/evaluation.store';
import { CommonCardDataType, Link as LinkList, ParamType } from '../../types';
import { IEvaluationInfo } from '../../types/services/evaluation.types';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationTest from './EvaluationTest';

export default function ViewEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const { id } = useParams<ParamType>();
  const { data, isSuccess, isLoading } = evaluationStore.getEvaluations();

  const list: LinkList[] = [
    { to: '/', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
  ];

  // const data = [
  //   {
  //     id: 1,
  //     status: { type: 'warning', text: 'pending' },
  //     description: '100 marks',
  //     title: 'Semester 1 exam',
  //     code: 'Exam',
  //   },
  // ];

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


  useEffect(() => {
    let formattedEvals: CommonCardDataType[] = [];
    data?.data.data.map((evaluation) => {
      let formattedEvaluations = {
        id: evaluation.id,
        title: evaluation.name,
        code: evaluation.evaluation_type,
        description: `${evaluation.total_mark} marks`,
        status: {
          type: advancedTypeChecker(evaluation.evaluation_status),
          text: evaluation.evaluation_status,
        },
      };
      formattedEvals.push(formattedEvaluations);
    });
    setEvaluations(formattedEvals);
  }, [data?.data.data]);

  console.log(data?.data.data)

  return (
    <Switch>

          <div>
            <section>
              <BreadCrumb list={list}></BreadCrumb>
            </section>
            {isSuccess ?( <TableHeader title="Evaluations" showBadge={false} showSearch={false}>
              <Link to={`/dashboard/evaluation/new`}>
                <Button>New Evaluation</Button>
              </Link>
            </TableHeader>): null}
            

            <section>
            {isLoading && evaluations.length === 0 && <Loader />}

              {isSuccess && evaluations.length === 0 ? (
                <NoDataAvailable
                  icon="evaluation"
                  buttonLabel="Add new evaluation"
                  title={'No evaluations available'}
                  handleClick={() => history.push(`${url}/new`)}
                  description="And the web just isnt the same without you. Lets get you back online!"
                />
              ) : isSuccess && evaluations.length > 0 ? (
                evaluations?.map((info: CommonCardDataType, index: number) => (
                  <div key={index}>
                    <CommonCardMolecule
                      className="cursor-pointer"
                      handleClick={() => {
                        history.push(
                          `${path}/${info.id}`,
                        );
                      }}
                      data={info}
                    />
                  </div>
                ))
              ): null}
            </section>
          </div>
        )}
    </Switch>
  );
}
