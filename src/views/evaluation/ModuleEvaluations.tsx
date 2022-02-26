import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { CommonCardDataType, ParamType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

export default function ModuleEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  // const history = useHistory();
  const { id } = useParams<ParamType>();
  const { path } = useRouteMatch();
  const { data, isSuccess, isLoading, isError } = evaluationStore.getModuleEvaluations(
    id + '',
  );

  useEffect(() => {
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

  return (
    <div>
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <>
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available in this module'}
                    description="There seems to be no evaluations added to this module yet."
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule
                        className="cursor-pointer"
                        data={info}
                        // handleClick={() =>
                        //   history.push(`/dashboard/evaluations/details/${info.id}`)
                        // }
                      />
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available in this module'}
                    description="There seems to be no evaluations added to this module yet."
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
