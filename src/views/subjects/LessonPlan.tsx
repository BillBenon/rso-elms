import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Avatar from '../../components/Atoms/custom/Avatar';
import Badge from '../../components/Atoms/custom/Badge';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import NewLessonPlan from '../../components/Organisms/forms/subjects/NewLessonPlan';
import UpdateLessonPlan from '../../components/Organisms/forms/subjects/UpdateLessonPlan';
import { lessonStore } from '../../store/administration/lesson.store';
import { Link, ParamType } from '../../types';
import { advancedTypeChecker, titleCase } from '../../utils/getOption';

function LessonPlan() {
  const history = useHistory();

  const { id } = useParams<ParamType>();
  const { data, isLoading } = lessonStore.getLessonPlanByLesson(id);
  const plan = data?.data.data || [];
  const { url } = useRouteMatch();
  const list: Link[] = [
    { to: '/dashboard/inst-program', title: 'Dashboard' },
    { to: `/dashboard/inst-module`, title: 'Modules' },
    { to: `${url}`, title: 'Lesson Plan' },
  ];

  return (
    <>
      <section>
        <BreadCrumb list={list} />
      </section>
      <Switch>
        <Route
          exact
          path={url}
          render={() => (
            <div className="pt-6 w-full">
              {isLoading ? (
                <Loader />
              ) : plan.length === 0 ? (
                <NoDataAvailable
                  buttonLabel={'Create plan'}
                  title={'No lesson plan available'}
                  description={
                    'You have not created a lesson plan for this lesson. You can add one from the button below'
                  }
                  handleClick={() => history.push(`${url}/add-lesson-plan`)}
                />
              ) : (
                <>
                  <Heading className="mb-6" fontWeight="semibold">
                    Lesson Plan
                  </Heading>
                  {plan.map((lp) => (
                    <div className="bg-main p-6 flex flex-col gap-4 w-96" key={lp.id}>
                      <Heading fontSize="base" className="py-4" fontWeight="semibold">
                        {lp.lesson.title}
                      </Heading>

                      <div className="flex gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Start Date:
                        </Heading>
                        <Heading fontSize="base">{lp.start_time}</Heading>
                      </div>
                      <div className="flex gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          End Date:
                        </Heading>
                        <Heading fontSize="base">{lp.end_time}</Heading>
                      </div>
                      <div className="flex gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Grading
                        </Heading>
                        <Heading fontSize="base">{lp.grading}</Heading>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Lesson Objective
                        </Heading>
                        <Heading fontSize="base">{lp.lesson_objective}</Heading>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Lesson Requirements
                        </Heading>
                        <Heading fontSize="base">{lp.lesson_requirements}</Heading>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Text Books
                        </Heading>
                        <Heading fontSize="base">{lp.text_books}</Heading>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Class Policy
                        </Heading>
                        <Heading fontSize="base">{lp.class_policy}</Heading>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Status
                        </Heading>
                        <Heading fontSize="base">
                          <Badge badgecolor={advancedTypeChecker(lp.generic_status)}>
                            {titleCase(lp.generic_status)}
                          </Badge>
                        </Heading>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Heading fontSize="base" color="txt-secondary">
                          Instructor
                        </Heading>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            src="https://static.thenounproject.com/png/2643367-200.png"
                            alt="profile"
                            size="34"
                          />
                          <Heading fontSize="base">
                            {lp.instructor.user.first_name +
                              ' ' +
                              lp.instructor.user.last_name}
                          </Heading>
                        </div>
                      </div>
                      <div className="flex space-x-4 pt-4">
                        <Button
                          styleType="outline"
                          onClick={() =>
                            history.push(`${url}/edit-lesson-plan/${lp.id}`)
                          }>
                          Edit Plan
                        </Button>
                        {/* <Button
                          styleType="outline"
                          onClick={() => history.push(`${url}/add-lesson-plan`)}>
                          Create New Plan
                        </Button> */}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        />
        {/* add lesson plan form  */}
        <Route
          exact
          path={`${url}/add-lesson-plan`}
          render={() => {
            return (
              <PopupMolecule
                title="Add lesson plan"
                open
                onClose={() => history.goBack()}
                closeOnClickOutSide={false}>
                <NewLessonPlan />
              </PopupMolecule>
            );
          }}
        />
        {/* edit lesson plan form  */}
        <Route
          exact
          path={`${url}/edit-lesson-plan/:planId`}
          render={() => {
            return (
              <PopupMolecule
                title="Edit lesson plan"
                open
                onClose={() => history.goBack()}
                closeOnClickOutSide={false}>
                <UpdateLessonPlan />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </>
  );
}

export default LessonPlan;
