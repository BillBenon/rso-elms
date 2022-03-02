import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from './components/Atoms/custom/Button';
import Loader from './components/Atoms/custom/Loader';
import PopupMolecule from './components/Molecules/Popup';
import UpdatePassword from './components/Organisms/forms/auth/signup/personal/UpdatePassword';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import useAuthenticator from './hooks/useAuthenticator';
import Dashboard from './layout/Dashboard';
import { Privileges } from './types';
import { UserType } from './types/services/user.types';
import cookie from './utils/cookie';
import AcademicYears from './views/academicYears/AcademicYears';
import Academies from './views/academies/Academy';
import AdminDashboard from './views/dashboard/AdminDashboard';
import Divisions from './views/divisions/Divisions';
import InstructorViewEvaluations from './views/evaluation/InstructorViewEvaluations';
import UpdateInstitution from './views/insitution/UpdateInstitution';
import IntakesView from './views/intakes/Intakes';
import Levels from './views/levels/Levels';
import Modules from './views/modules';
import InstrLevelModule from './views/modules/InstrLevelModule';
import StudentModule from './views/modules/StudentModule';
import NotFound from './views/NotFound';
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

  const user_role_cookie = cookie.getCookie('user_role') || '';
  const user_role = user?.user_roles?.find((role) => role.id + '' === user_role_cookie);
  const user_privileges = user_role?.role_privileges?.map((role) => role.name);
  const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

  let token = cookie.getCookie('jwt_info');

  const PrivilegedRoutes = () => (
    <>
      {!user_privileges ? (
        <NotFound />
      ) : (
        <Switch>
          {hasPrivilege(Privileges.CAN_ACCESS_ROLES) && (
            <Route path={`${path}/role/:id/view`} component={ViewRole} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_ROLES) && (
            <Route path={`${path}/roles`} component={Roles} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_ACADEMY) && (
            <Route path={`${path}/academies`} component={Academies} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_CALENDER) && (
            <Route path={`${path}/calendar`} component={CalendarView} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_RANKS) && (
            <Route path={`${path}/ranks`} component={Ranks} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_USERS) && (
            <Route path={`${path}/users`} component={Users} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_USERS) && (
            <Route path={`${path}/user/:id/profile`} component={UserDetails} />
          )}
          {hasPrivilege(Privileges.CAN_MODIFY_INSTITUTION) && (
            <Route
              exact
              path={`${path}/institution/:id/edit`}
              component={UpdateInstitution}
            />
          )}

          {hasPrivilege(Privileges.CAN_ACCESS_PRIVILEGES) && (
            <Route path={`${path}/privileges`} component={PrivilegesView} />
          )}

          {/* end of institution routes */}

          {/* academic admin routes */}
          {hasPrivilege(Privileges.CAN_ACCESS_SUBJECTS) && (
            <Route path={`${path}/subjects`} component={Subjects} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_SCHEDULES) && (
            <Route path={`${path}/schedule`} component={ScheduleHome} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_REG_CONTROLS) && (
            <Route
              path={`${path}/registration-control`}
              component={RegistrationControl}
            />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_DIVISIONS) && (
            <Route path={`${path}/divisions`} component={Divisions} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_ACADEMIC_YEARS) && (
            <Route path={`${path}/academic-years`} component={AcademicYears} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_PROGRAMS) && (
            <Route path={`${path}/programs`} component={AcademicProgram} />
          )}
          {
            // hasPrivilege(Privileges.CAN_ACCESS_DASHBOARD) && (
            <Route path={`${path}/admin`} component={AdminDashboard} />
            // )
          }
          {hasPrivilege(Privileges.CAN_ACCESS_LEVELS) && (
            <Route path={`${path}/levels`} component={Levels} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_INTAKES) && (
            <Route path={`${path}/intakes`} component={IntakesView} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_MODULES) && (
            <Route path={`${path}/modules`} component={Modules} />
          )}
          {/* end of academic admin routes */}

          {/* instructor routes */}
          {hasPrivilege(Privileges.CAN_TEACH_MODULE) && (
            <Route exact path={`${path}/inst-module`} component={InstrLevelModule} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_EVENTS) && (
            <Route path={`${path}/events`} component={Events} />
          )}
          {hasPrivilege(Privileges.CAN_ACCESS_MODULES) && (
            <Route path={`${path}/student`} component={StudentModule} />
          )}

          {(hasPrivilege(Privileges.CAN_ACCESS_EVALUATIONS) ||
            hasPrivilege(Privileges.CAN_ANSWER_EVALUATION)) && (
            <Route path={`${path}/evaluations`} component={InstructorViewEvaluations} />
          )}

          <Route
            exact
            path={`${path}/account/update-password`}
            render={() => (
              <PopupMolecule title="Update Password" open={true} onClose={() => {}}>
                <UpdatePassword onSubmit={() => {}} />
              </PopupMolecule>
            )}
          />
          {/* end of student routes */}
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );

  const InstitutionAdminRoutes = () => (
    <Switch>
      {/*start of institution admin */}
      <Route path={`${path}/role/:id/view`} component={ViewRole} />
      <Route
        exact
        path={`${path}/account/update-password`}
        render={() => (
          <PopupMolecule
            closeOnClickOutSide={false}
            title="Update Password"
            open={true}
            onClose={() => history.goBack()}>
            <UpdatePassword onSubmit={() => history.goBack()} />
          </PopupMolecule>
        )}
      />
      <Route path={`${path}/academies`} component={Academies} />
      <Route path={`${path}/calendar`} component={CalendarView} />
      <Route path={`${path}/ranks`} component={Ranks} />
      <Route path={`${path}/roles`} component={Roles} />
      <Route path={`${path}/users`} component={Users} />
      {/* <Route exact path={`/institution/new`} component={NewInstitution} /> */}

      <Route path={`${path}/privileges`} component={PrivilegesView} />
      <Route exact path={`${path}/institution/:id/edit`} component={UpdateInstitution} />

      {/* end of institution admin page */}
    </Switch>
  );

  return !token ? (
    <Redirect to="/login" />
  ) : userLoading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : user ? (
    <Dashboard>
      {/* <Switch> */}
      {user?.user_type === UserType.SUPER_ADMIN
        ? InstitutionAdminRoutes()
        : PrivilegedRoutes()}
      {/* </Switch> */}
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
