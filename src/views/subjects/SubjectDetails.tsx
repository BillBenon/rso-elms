import React, { useEffect, useState } from 'react';
import {
  Link as BrowserLink,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import Loader from '../../components/Atoms/custom/Loader';
import Panel from '../../components/Atoms/custom/Panel';
import Heading from '../../components/Atoms/Text/Heading';
import Accordion from '../../components/Molecules/Accordion';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import NewLessonForm from '../../components/Organisms/forms/subjects/NewLessonForm';
import { authenticatorStore } from '../../store/administration';
import { lessonStore } from '../../store/administration/lesson.store';
import { subjectStore } from '../../store/administration/subject.store';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import { UserInfo, UserType } from '../../types/services/user.types';
import EvaluationCategories from '../evaluation/EvaluationCategories';
import SubjectInstructorView from '../evaluation/SubjectInstructorView';
import SubjectInstructors from './SubjectInstructors';

interface ParamType {
  id: string;
  subjectId: string;
}

export default function SubjectDetails() {
  const [authUser, setAuthUser] = useState<UserInfo>();
  const userData = authenticatorStore.authUser();
  useEffect(() => {
    setAuthUser(userData.data?.data.data);
  }, [userData.data?.data.data]);
  const { subjectId } = useParams<ParamType>();
  const { url } = useRouteMatch();
  const history = useHistory();

  const subjectData = subjectStore.getSubject(subjectId);
  const {
    data,
    isLoading: lessonsLoading,
    isSuccess,
  } = lessonStore.getLessonsBySubject(subjectId);

  const { data: subjecEvaluations, isLoading } =
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

  const tabs = [
    {
      label: `Lessons(${lessons.length})`,
      href: `${url}`,
    },
    {
      label: 'Evaluations',
      href: `${url}/evaluations`,
    },
    {
      label: 'Instructors',
      href: `${url}/instructors`,
    }
  ];

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
            headerComponent={
              authUser?.user_type === UserType.INSTRUCTOR && (
                <BrowserLink to={`${url}/add-lesson`}>
                  <Button>New lesson</Button>
                </BrowserLink>
              )
            }
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
                          showButton={authUser?.user_type === UserType.INSTRUCTOR}
                          title={'No lessons available'}
                          description={
                            'A lesson or class is a structured period of time where learning is intended to occur. It involves one or more students being taught by a teacher or instructor.'
                          }
                          handleClick={() => history.push(`${url}/add-lesson`)}
                        />
                      ) : (
                        <>
                          <Heading fontSize="base" className="mb-6" fontWeight="semibold">
                            Ongoing Lessons
                          </Heading>
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
              {authUser?.user_type === UserType.INSTRUCTOR ? (
                <Route
                  path={`${url}/evaluations`}
                  render={() => <SubjectInstructorView subjectId={subjectId} />}
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
                          subjecEvaluations={subjecEvaluations?.data.data}
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
