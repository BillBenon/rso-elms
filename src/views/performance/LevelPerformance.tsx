import React from 'react';
import { useParams } from 'react-router-dom';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import { classStore } from '../../store/administration/class.store';
import { CommonCardDataType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import ClassPeriodPerformance from './ClassPeriodPerformance';
import SchoolReport from './SchoolReport';

interface ParamType {
  levelId: string;
}

const list = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'programs', title: 'Programs' },
  { to: 'level', title: 'Performance' },
];

export default function LevelPerformance() {
  const { levelId } = useParams<ParamType>();
  const history = useHistory();
  const { url, path } = useRouteMatch();

  const { data, isLoading } = classStore.getClassByPeriod(levelId);

  const classes: CommonCardDataType[] =
    data?.data.data.map((clas) => ({
      id: clas.id,
      code: clas.class_group_type.toUpperCase(),
      description:
        clas.academic_year_program_intake_level.academic_program_level.level.description,
      title: clas.class_name,
      status: {
        type: advancedTypeChecker(clas.generic_status),
        text: clas.generic_status.toString(),
      },
    })) || [];

  return (
    <div>
      <BreadCrumb list={list} />

      <Switch>
        <Route
          exact
          path={`${path}/:classId/report/:studentId/:periodId`}
          component={SchoolReport}
        />
        <Route path={`${path}/:classId`} component={ClassPeriodPerformance} />
        <Route
          path={`${path}`}
          render={() => (
            <>
              {isLoading && <Loader />}
              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {classes.map((cl) => (
                  <CommonCardMolecule
                    key={cl.id}
                    data={cl}
                    handleClick={() => history.push(`${url}/${cl.id}`)}
                  />
                ))}
              </section>
            </>
          )}
        />
      </Switch>
    </div>
  );
}
