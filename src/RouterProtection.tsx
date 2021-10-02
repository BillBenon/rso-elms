import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ComponentsUseCase from './components/Organisms/ComponentsUseCase';
import ExperienceInfo from './components/Organisms/forms/auth/signup/experience/ExperienceInfo';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import NewInstructor from './components/Organisms/user/NewInstructor';
import NewStudent from './components/Organisms/user/NewStudent';
import Dashboard from './layout/Dashboard';
import { authenticatorStore } from './store';
import { UserInfo } from './types/services/user.types';
import Academies from './views/academies/Academy';
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import Divisions from './views/divisions/Divisions';
import NewInstitution from './views/insitution/NewInstitution';
import IntakeModulesView from './views/intakes/IntakeModules';
import IntakesView from './views/intakes/Intakes';
import LevelsView from './views/levels/Levels';
import Modules from './views/modules';
import NotFound from './views/NotFound';
import PrivilegesView from './views/privileges/Privileges';
import AcademicPrograms from './views/programs/AcademicPrograms';
import NewAcademicProgram from './views/programs/NewAcademicProgram';
import ProgramDetails from './views/programs/ProgramDetails';
import Roles from './views/roles/Roles';
import ViewRole from './views/roles/ViewRole';
import Subjects from './views/subjects';
import Users from './views/users/Users';

const RouterProtection = () => {
  const [authUser, setAuthUser] = useState<UserInfo>();
  const { data } = authenticatorStore.authUser();

  useEffect(() => {
    setAuthUser(data?.data.data);
  }, [data?.data.data]);

  const InstitutionAdminRoutes = () => (
    <Dashboard>
      {/*start of institution admin */}
      <Route path="/dashboard/role/:id/view" component={ViewRole} />
      <Route path="/dashboard/academies" component={Academies} />
      <Route path="/dashboard/roles" component={Roles} />
      <Route exact path="/dashboard/user/new" component={NewStudent} />
      <Route exact path="/dashboard/users/instructor/new" component={NewInstructor} />
      <Route path="/dashboard/users" component={Users} />
      <Route path="/dashboard/privileges" component={PrivilegesView} />
      {/* end of institution admin ProgramDetails */}
    </Dashboard>
  );

  const AcademicAdminRoutes = () => (
    <Dashboard>
      {/* start of academic admin pages */}
      <Route exact path="/dashboard/modules" component={Modules} />
      <Route exact path="/dashboard/subjects" component={Subjects} />
      <Route path="/dashboard/registration-control" component={RegistrationControl} />

      <Route path="/dashboard/divisions" component={Divisions} />

      <Route exact path="/dashboard/programs" component={AcademicPrograms} />
      <Route exact path="/dashboard/programs/new" component={NewAcademicProgram} />
      <Route path="/dashboard/programs/:id" component={ProgramDetails} />

      <Route path="/dashboard/programs" component={AcademicPrograms} />
      <Route exact path="/dashboard/levels" component={LevelsView} />
      <Route exact path="/dashboard/intakes" component={IntakesView} />
      <Route exact path="/dashboard/intakes/:id" component={IntakeModulesView} />
      {/* end of academic admin pages */}
    </Dashboard>
  );

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/institution" component={NewInstitution} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/register/experience" component={ExperienceInfo} />
          <Route exact path="/register/more" component={MoreInfo} />
          <Route exact path="/usecase" component={ComponentsUseCase} />

          {/* protected routes  */}
          {authUser?.user_type == 'SUPER_ADMIN' && InstitutionAdminRoutes()}
          {authUser?.user_type == 'ADMIN' && AcademicAdminRoutes()}
          {/* end of protected routes */}

          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default RouterProtection;
