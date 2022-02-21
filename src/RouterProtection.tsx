import React from 'react';
import { Redirect, Route, useHistory, useRouteMatch } from 'react-router-dom';

import Button from './components/Atoms/custom/Button';
import Loader from './components/Atoms/custom/Loader';
import ConfirmationOrganism from './components/Organisms/ConfirmationOrganism';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import useAuthenticator from './hooks/useAuthenticator';
import Dashboard from './layout/Dashboard';
import { UserType } from './types/services/user.types';
import cookie from './utils/cookie';
import AcademicYears from './views/academicYears/AcademicYears';
import Academies from './views/academies/Academy';
import AdminDashboard from './views/dashboard/AdminDashboard';
import Divisions from './views/divisions/Divisions';
import EvaluationNotiView from './views/evaluation/EvaluationNotiView';
import EvaluationTest from './views/evaluation/EvaluationTest';
import InstructorViewEvaluations from './views/evaluation/InstructorViewEvaluations';
import StudentReview from './views/evaluation/StudentReview';
import NewInstitution from './views/insitution/NewInstitution';
import UpdateInstitution from './views/insitution/UpdateInstitution';
import IntakesView from './views/intakes/Intakes';
import Levels from './views/levels/Levels';
import Modules from './views/modules';
import InstrLevelModule from './views/modules/InstrLevelModule';
import StudentModule from './views/modules/StudentModule';
import PrivilegesView from './views/privileges/Privileges';
import AcademicProgram from './views/programs/AcademicPrograms';
import Ranks from './views/ranks/Ranks';
import Roles from './views/roles/Roles';
import ViewRole from './views/roles/ViewRole';
import CalendarView from './views/schedule/CalendarView';
import Events from './views/schedule/Events';
import ScheduleHome from './views/schedule/ScheduleHome';
import Subjects from './views/subjects';
import UserDetails from './views/users/UserDetails';
import Users from './views/users/Users';

const RouterProtection = () => {
  const { user, userLoading, isError } = useAuthenticator();
  const { path } = useRouteMatch();
  const history = useHistory();

  let token = cookie.getCookie('jwt_info');

  const InstitutionAdminRoutes = () => (
    <>
      {/*start of institution admin */}
      <Route path={`${path}/role/:id/view`} component={ViewRole} />
      <Route path={`${path}/academies`} component={Academies} />
      <Route path={`${path}/calendar`} component={CalendarView} />
      <Route path={`${path}/ranks`} component={Ranks} />
      <Route path={`${path}/roles`} component={Roles} />
      <Route path={`${path}/users`} component={Users} />
      <Route exact path={`/institution/new`} component={NewInstitution} />

      <Route path={`${path}/privileges`} component={PrivilegesView} />
      <Route exact path={`${path}/institution/:id/edit`} component={UpdateInstitution} />

      {/* end of institution admin page */}
    </>
  );

  const AcademicAdminRoutes = () => (
    <>
      {/* start of academic admin pages */}
      <Route path={`${path}/subjects`} component={Subjects} />
      <Route path={`${path}/schedule`} component={ScheduleHome} />
      <Route path={`${path}/registration-control`} component={RegistrationControl} />
      <Route path={`${path}/divisions`} component={Divisions} />
      <Route path={`${path}/academic-years`} component={AcademicYears} />
      <Route path={`${path}/programs`} component={AcademicProgram} />
      <Route path={`${path}/users`} component={Users} />
      <Route path={`${path}/admin`} component={AdminDashboard} />
      <Route path={`${path}/levels`} component={Levels} />
      <Route path={`${path}/intakes`} component={IntakesView} />
      {/* <Route
        path={`${path}/modules/:intakeProgram/:moduleId`}
        component={AdmModuleDetails}
      /> */}
      <Route path={`${path}/modules`} component={Modules} />
      {/* <Route exact path={`${path}/intakes/:id`} component={IntakeModulesView} /> */}

      {/* end of academic admin pages */}
    </>
  );

  const InstructorRoutes = () => (
    <>
      {/* start of instructor pages */}
      <Route path={`${path}/evaluations`} component={InstructorViewEvaluations} />
      <Route exact path={`${path}/evaluations/view/:id`} component={EvaluationNotiView} />
      <Route path={`${path}/calendar`} component={CalendarView} />
      <Route path={`${path}/intakes`} component={IntakesView} />
      <Route exact path={`${path}/inst-module`} component={InstrLevelModule} />
      <Route path={`${path}/schedule`} component={ScheduleHome} />
      <Route path={`${path}/events`} component={Events} />
      <Route path={`${path}/modules`} component={Modules} />
      <Route path={`${path}/users/:id/profile`} component={UserDetails} />

      {/* end of instructor pages */}
    </>
  );

  const StudentRoutes = () => (
    <>
      <Route path={`${path}/users/:id/profile`} component={UserDetails} />
      {/* start of student pages */}
      <Route path={`${path}/intakes`} component={IntakesView} />
      <Route path={`${path}/schedule`} component={ScheduleHome} />
      <Route path={`${path}/student`} component={StudentModule} />
      <Route path={`${path}/modules`} component={Modules} />
      <Route path={`${path}/programs`} component={AcademicProgram} />
      {/* <Route path={`${path}/student/evaluations/`} component={EvaluationTest} /> */}
      <Route
        exact
        path={`${path}/evaluations/student-evaluation/:id`}
        component={EvaluationTest}
      />
      <Route
        exact
        path={`${path}/evaluations/completed/student-evaluation/:id/review`}
        component={StudentReview}
      />
      <Route exact path={`${path}/evaluations/view/:id`} component={EvaluationNotiView} />
      <Route
        exact
        path={`/dashboard/evaluations/attempt/:id`}
        render={() => (
          <ConfirmationOrganism onConfirmationClose={() => history.goBack()} />
        )}
      />
      {/* end of student pages */}
    </>
  );

  return !token ? (
    <Redirect to="/login" />
  ) : userLoading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : user ? (
    <Dashboard>
      {user?.user_type === UserType.SUPER_ADMIN && InstitutionAdminRoutes()}
      {user?.user_type === UserType.ADMIN && AcademicAdminRoutes()}
      {user?.user_type === UserType.INSTRUCTOR && InstructorRoutes()}
      {user?.user_type === UserType.STUDENT && StudentRoutes()}
    </Dashboard>
  ) : isError ? (
    <div>
      <h2 className="text-error-500 py-2 mb-3 font-medium tracking-widest">
        That was an error! try again after a few minutes.
      </h2>
      <Button styleType="outline" onClick={() => window.location.reload()}>
        Reload
      </Button>
    </div>
  ) : (
    <div></div>
  );
};

export default RouterProtection;
