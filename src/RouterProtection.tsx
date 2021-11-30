import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import Dashboard from './layout/Dashboard';
import { authenticatorStore } from './store/administration';
import { UserInfo, UserType } from './types/services/user.types';
import AcademicYears from './views/academicYears/AcademicYears';
import Academies from './views/academies/Academy';
import InstructorProgram from './views/dashboard/InstructorProgram';
import StudentDashboard from './views/dashboard/StudentDashboard';
import Divisions from './views/divisions/Divisions';
import EvaluationTest from './views/evaluation/EvaluationTest';
import ViewEvaluations from './views/evaluation/ViewEvaluations';
import NewInstitution from './views/insitution/NewInstitution';
import UpdateInstitution from './views/insitution/UpdateInstitution';
import IntakesView from './views/intakes/Intakes';
import Levels from './views/levels/Levels';
import Modules from './views/modules';
import InstrLevelModule from './views/modules/InstrLevelModule';
import PrivilegesView from './views/privileges/Privileges';
import AcademicProgram from './views/programs/AcademicPrograms';
import Roles from './views/roles/Roles';
import ViewRole from './views/roles/ViewRole';
import CalendarView from './views/schedule/Calendar';
import Events from './views/schedule/Events';
import ScheduleHome from './views/schedule/ScheduleHome';
import Venues from './views/schedule/Venues';
import Subjects from './views/subjects';
import Users from './views/users/Users';

const RouterProtection = () => {
  const [authUser, setAuthUser] = useState<UserInfo>();
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    setAuthUser(data?.data.data);
  }, [data?.data.data]);

  const InstitutionAdminRoutes = () => (
    <>
      {/*start of institution admin */}
      <Route path="/dashboard/role/:id/view" component={ViewRole} />
      <Route path="/dashboard/academies" component={Academies} />
      <Route path="/dashboard/calendar" component={CalendarView} />
      <Route path="/dashboard/roles" component={Roles} />
      <Route path="/dashboard/users" component={Users} />

      <Route path="/dashboard/privileges" component={PrivilegesView} />
      <Route exact path="/dashboard/institution/:id/edit" component={UpdateInstitution} />
      {/* end of institution admin page */}
    </>
  );

  const AcademicAdminRoutes = () => (
    <>
      {/* start of academic admin pages */}
      <Route path="/dashboard/subjects" component={Subjects} />
      <Route path="/dashboard/schedule" component={ScheduleHome} />
      <Route path="/dashboard/registration-control" component={RegistrationControl} />
      <Route path="/dashboard/divisions" component={Divisions} />
      <Route path="/dashboard/academic-years" component={AcademicYears} />
      <Route path="/dashboard/programs" component={AcademicProgram} />
      <Route path="/dashboard/users" component={Users} />
      <Route path="/dashboard/levels" component={Levels} />
      <Route path="/dashboard/intakes" component={IntakesView} />
      <Route path="/dashboard/modules" component={Modules} />
      {/* <Route exact path="/dashboard/intakes/:id" component={IntakeModulesView} /> */}

      {/* end of academic admin pages */}
    </>
  );

  const InstructorRoutes = () => (
    <>
      {/* start of instructor pages */}
      <Route path="/dashboard/inst-program" component={InstructorProgram} />
      <Route exact path={`/dashboard/inst-module`} component={InstrLevelModule} />

      <Route path="/dashboard/evaluations" component={ViewEvaluations} />
      <Route path="/dashboard/schedule" component={ScheduleHome} />
      <Route path="/dashboard/events" component={Events} />
      <Route path="/dashboard/modules" component={Modules} />
      {/* end of instructor pages */}
    </>
  );

  const StudentRoutes = () => (
    <>
      {/* start of student pages */}
      <Route path="/dashboard/schedule" component={ScheduleHome} />
      <Route path="/dashboard/student" component={StudentDashboard} />
      <Route path="/dashboard/modules" component={Modules} />
      <Route path="/dashboard/student/evaluations/" component={EvaluationTest} />
      <Route path="/dashboard/evaluations/student" component={EvaluationTest} />
      {/* end of student pages */}
    </>
  );
  return (
    <>
      {(authUser?.user_type == UserType.SUPER_ADMIN || import.meta.env.DEV) && (
        <Route exact path="/institution/new" component={NewInstitution} />
      )}
      <Dashboard>
        {authUser?.user_type === UserType.SUPER_ADMIN && InstitutionAdminRoutes()}
        {authUser?.user_type === UserType.ADMIN && AcademicAdminRoutes()}
        {authUser?.user_type === UserType.INSTRUCTOR && InstructorRoutes()}
        {authUser?.user_type === UserType.STUDENT && StudentRoutes()}
      </Dashboard>
      {/* protected routes  */}

      {/* end of protected routes */}
    </>
  );
};

export default RouterProtection;
