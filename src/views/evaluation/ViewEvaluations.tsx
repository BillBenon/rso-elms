import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/administration/evaluation.store';
import { CommonCardDataType, Link as LinkList } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import EvaluationContent from './EvaluationContent';

interface IEvaluationProps {
  subjectId: string;
  linkTo: string;
}

export default function ViewEvaluations({ subjectId, linkTo }: IEvaluationProps) {
  const [evaluations, setEvaluations] = useState<any>([]);
  const history = useHistory();
  const { path } = useRouteMatch();
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { data, isSuccess, isLoading, isError } = !subjectId
    ? evaluationStore.getEvaluations(
        authUser?.academy.id.toString() || '',
        authUser?.id.toString() || '',
      )
    : evaluationStore.getEvaluationsBySubject(subjectId);

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

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/new`} component={NewEvaluation} />
        <Route path={`${path}/:id`} component={EvaluationContent} />
        <Route
          exact
          path={path}
          render={() => (
            <>
              {path === '/dashboard/evaluations' ? (
                <>
                  <section>
                    <BreadCrumb list={list}></BreadCrumb>
                  </section>
                  {isSuccess ? (
                    <TableHeader title="Evaluations" showBadge={false} showSearch={false}>
                      <Link to={`${path}/new`}>
                        <Button>New Evaluation</Button>
                      </Link>
                    </TableHeader>
                  ) : null}
                </>
              ) : null}

              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    buttonLabel="Add new evaluation"
                    title={'No evaluations available'}
                    handleClick={() => history.push(`${path}/new`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule
                        className="cursor-pointer"
                        handleClick={() => {
                          linkTo
                            ? history.push({
                                pathname: linkTo,
                                search: `?evaluation=${info.id}`,
                              })
                            : history.push(`${path}/${info.id}`);
                        }}
                        data={info}
                      />
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    handleClick={() => history.push(`${path}/new`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : null}
              </section>
            </>
          )}
        />
      </Switch>
    </div>
  );
}
