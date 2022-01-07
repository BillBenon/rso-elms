import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import NewEvaluation from '../../components/Organisms/forms/evaluation/NewEvaluation';
import { authenticatorStore } from '../../store/administration';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType, Link as LinkList } from '../../types';
import { IEvaluationOwnership } from '../../types/services/evaluation.types';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../utils/getLocalStorageItem';
import { advancedTypeChecker, getDropDownStatusOptions } from '../../utils/getOption';
import EvaluationDetails from './EvaluationDetails';

export default function InstructorViewEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  const [ownerShipType, setownerShipType] = useState(IEvaluationOwnership.CREATED_BY_ME);

  const history = useHistory();
  const { path } = useRouteMatch();
  const authUser = authenticatorStore.authUser().data?.data.data;

  const instructorInfo = instructordeploymentStore.getInstructorByUserId(
    authUser?.id + '',
  ).data?.data.data[0];

  const { data, isSuccess, isLoading, isError, refetch } =
    evaluationStore.getEvaluationsByCategory(
      ownerShipType,
      instructorInfo?.id.toString() || '',
    );

  const list: LinkList[] = [
    { to: '/', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
  ];

  useEffect(() => {
    if (!getLocalStorageData('currentStep')) {
      setLocalStorageData('currentStep', 0);
    }

    let formattedEvals: CommonCardDataType[] = [];
    data?.data.data.forEach((evaluation) => {
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

  useEffect(() => {
    refetch();
  }, [ownerShipType, refetch]);

  const handleClick = (id: string) => {
    switch (ownerShipType) {
      case IEvaluationOwnership.FOR_APPROVING:
        history.push(`${path}/${id}/approve`);
        break;

      case IEvaluationOwnership.FOR_REVIEWING:
        history.push(`${path}/${id}/review`);
        break;

      case IEvaluationOwnership.FOR_MARKING:
        history.push(`${path}/${id}/submissions`);
        break;

      default:
        history.push(`${path}/${id}`);
        break;
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/new`} component={NewEvaluation} />
        <Route path={`${path}/:id`} component={EvaluationDetails} />
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
                </>
              ) : null}
              <div className="flex flex-col gap-12">
                <Heading fontWeight="semibold" className="pt-7">
                  Evaluations
                </Heading>
                <SelectMolecule
                  width="80"
                  className=""
                  value={ownerShipType}
                  handleChange={(e) => setownerShipType(e.value as IEvaluationOwnership)}
                  name={'type'}
                  placeholder="Evaluation type"
                  options={getDropDownStatusOptions(IEvaluationOwnership)}
                />
              </div>
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="Consider adding some evaluation to see them here!"
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule
                        className="cursor-pointer"
                        data={info}
                        handleClick={() => handleClick(info.id + '')}
                      />
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="Consider adding some evaluation to see them here!"
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
