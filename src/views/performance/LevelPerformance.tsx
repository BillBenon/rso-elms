import React from 'react';
import { useParams } from 'react-router';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import { classStore } from '../../store/administration/class.store';
import { CommonCardDataType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import ClassPeriodPerformance from './ClassPeriodPerformance';
import DSReportOnStudent from './DSReportOnStudent';
import EndTermForm from './EndTermForm';
import StudentAcademicReport from './StudentAcademicReport';

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
          render={() => (
            <Tabs>
              <Tab label="Academic report">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <StudentAcademicReport />
              </Tab>
              <Tab label="Informative form">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <EndTermForm />
              </Tab>
              <Tab label="DS report">
                <Button
                  styleType={'text'}
                  onClick={() => history.goBack()}
                  icon
                  className="flex items-center p-2 hover:underline">
                  <Icon name="chevron-left" fill="primary" size={16} />
                  Back
                </Button>
                <DSReportOnStudent />
              </Tab>
            </Tabs>
          )}
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
