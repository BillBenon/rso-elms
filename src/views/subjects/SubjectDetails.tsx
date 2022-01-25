import React from 'react';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import Panel from '../../components/Atoms/custom/Panel';
import Heading from '../../components/Atoms/Text/Heading';
import Accordion from '../../components/Molecules/Accordion';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation, { TabType } from '../../components/Molecules/tabs/TabNavigation';
import NewLessonForm from '../../components/Organisms/forms/subjects/NewLessonForm';
import useAuthenticator from '../../hooks/useAuthenticator';
import { lessonStore } from '../../store/administration/lesson.store';
import { subjectStore } from '../../store/administration/subject.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { Privileges } from '../../types';
import { UserType } from '../../types/services/user.types';
import { setLocalStorageData } from '../../utils/getLocalStorageItem';
import EvaluationCategories from '../evaluation/EvaluationCategories';
import SubjectInstructorView from '../evaluation/SubjectInstructorView';
import SubjectInstructors from './SubjectInstructors';

interface ParamType {
  id: string;
  subjectId: string;
}

export default function SubjectDetails() {
  const { search } = useLocation();
  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';
  const progId = new URLSearchParams(search).get('prog') || '';
  const level = new URLSearchParams(search).get('lvl') || '';
  const period = new URLSearchParams(search).get('prd') || '';

  const { user } = useAuthenticator();

  const { subjectId } = useParams<ParamType>();
  const { url } = useRouteMatch();
  const history = useHistory();

  const subjectData = subjectStore.getSubject(subjectId);
  const {
    data,
    isLoading: lessonsLoading,
    isSuccess,
  } = lessonStore.getLessonsBySubject(subjectId);

  const { data: subjectEvaluations, isLoading } =
    evaluationStore.getEvaluationsCollectionBySubject(subjectId);

  const lessons = data?.data.data || [];

  // const list: Link[] = [
  //   { to: 'home', title: 'home' },
  //   { to: 'programs', title: 'Programs' },
  //   { to: 'modules', title: 'Modules' },
  //   { to: id, title: 'Modules details' },
  //   { to: '/', title: 'Subjects' },
  //   {
  //     to: subjectData.data?.data.data.id + '',
  //     title: subjectData.data?.data.data.title + '',
  //   },
  // ];

  const goBack = () => {
    history.goBack();
  };

  function goToNewEvaluation() {
    setLocalStorageData('currentStep', 0);
    history.push(
      `/dashboard/evaluations/new?subj=${subjectId}&intkPrg=${intakeProg}&prog=${progId}&lvl=${level}&prd=${period}`,
    );
  }

  let tabs: TabType[] = [];

  tabs.push({
    label: `Lessons(${lessons.length})`,
    href: `${url}?intkPrg=${intakeProg}&prog=${progId}&lvl=${level}&prd=${period}`,
    privilege: Privileges.CAN_ACCESS_LESSON,
  });

  tabs.push({
    label: 'Evaluations',
    href: `${url}/evaluations?intkPrg=${intakeProg}&prog=${progId}&lvl=${level}&prd=${period}`,
    privilege: Privileges.CAN_ACCESS_EVALUATIONS,
  });
  tabs.push({
    label: 'Instructors',
    href: `${url}/instructors?intkPrg=${intakeProg}&prog=${progId}&lvl=${level}&prd=${period}`,
  });

  return (
    <main className="px-4">
      {/* <section>
        <BreadCrumb list={list} />
      </section> */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 pt-4 md:pt-11">
        <div className="w-44">
          <button className="outline-none" onClick={goBack}>
            <Icon name={'back-arrow'} bgColor="gray" />
          </button>
        </div>
        <div className="md:col-span-3 pt-4 md:pt-0">
          <Heading fontSize="2xl" fontWeight="semibold">
            {subjectData.data?.data.data.title}
          </Heading>
          <Heading fontSize="base" color="gray" className="py-4" fontWeight="medium">
            {lessons.length + ' lessons'}
          </Heading>
          <p className="w-10/12 text-base">{subjectData.data?.data.data.content}</p>

          <TabNavigation
            tabs={tabs}
            // headerComponent={
            //   user?.user_type === UserType.INSTRUCTOR && (
            //     <BrowserLink to={`${url}/add-lesson`}>
            //       <Button>New lesson</Button>
            //     </BrowserLink>
            //   )
            // }
            className="pt-6">
            <Switch>
              <Route
                exact
                path={url}
                render={() => (
                  <>
                    <div className="pt-6 w-full">
                      {lessonsLoading ? (
                        <Loader />
                      ) : lessons.length === 0 ? (
                        <NoDataAvailable
                          icon="subject"
                          showButton={user?.user_type === UserType.INSTRUCTOR}
                          title={'No lessons available'}
                          description={
                            'A lesson or class is a structured period of time where learning is intended to occur. It involves one or more students being taught by a teacher or instructor.'
                          }
                          handleClick={() => history.push(`${url}/add-lesson`)}
                        />
                      ) : (
                        <>
                          <div className="flex justify-between mb-6">
                            <Heading fontSize="base" fontWeight="semibold">
                              Ongoing Lessons
                            </Heading>
                            {user?.user_type === UserType.INSTRUCTOR && (
                              <BrowserLink to={`${url}/add-lesson`}>
                                <Button>New lesson</Button>
                              </BrowserLink>
                            )}
                          </div>
                          <Accordion>
                            {lessons.map((les) => {
                              return (
                                <Panel
                                  width="w-full"
                                  bgColor="main"
                                  key={les.id}
                                  title={les.title}>
                                  <div className="md:w-10/12 lg:w-2/3">
                                    <p className="font-medium text-gray-600 text-sm pb-6">
                                      {les.content}
                                    </p>
                                    <Button
                                      styleType="outline"
                                      onClick={() =>
                                        history.push(
                                          `/dashboard/modules/lesson-plan/${les.id}`,
                                        )
                                      }>
                                      View lesson plan
                                    </Button>
                                  </div>
                                </Panel>
                              );
                            })}
                          </Accordion>
                        </>
                      )}
                    </div>
                  </>
                )}
              />

              <Route
                path={`${url}/instructors`}
                render={() => {
                  return <SubjectInstructors subjectId={subjectId} />;
                }}
              />
              {user?.user_type === UserType.INSTRUCTOR ? (
                <Route
                  path={`${url}/evaluations`}
                  render={() => (
                    <div className="flex justify-between">
                      <div className="w-9/12">
                        <SubjectInstructorView subjectId={subjectId} />
                      </div>
                      {intakeProg && progId && level && period ? (
                        <Permission privilege={Privileges.CAN_CREATE_EVALUATION}>
                          <div className="w-3/12">
                            <Button onClick={goToNewEvaluation}>New Evaluation</Button>
                          </div>
                        </Permission>
                      ) : null}
                    </div>
                  )}
                />
              ) : (
                <Route
                  path={`${url}/evaluations`}
                  render={() => (
                    <>
                      {isLoading && !isSuccess ? (
                        <Loader />
                      ) : (
                        <EvaluationCategories
                          loading={isLoading}
                          subjecEvaluations={subjectEvaluations?.data.data}
                        />
                      )}
                    </>
                  )}
                />
              )}
            </Switch>
          </TabNavigation>
        </div>
        <div className="hidden lg:block"></div>
      </div>
      <Switch>
        {/* add lesson popup */}
        <Route
          exact
          path={`${url}/add-lesson`}
          render={() => {
            return (
              <PopupMolecule title="Add lesson" open onClose={goBack}>
                <NewLessonForm />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </main>
  );
}
