import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import NewInstructor from './components/Organisms/user/NewInstructor';
import NewStudent from './components/Organisms/user/NewStudent';
import Dashboard from './layout/Dashboard';
import { authenticatorStore } from './store';
import { UserInfo } from './types/services/user.types';
import Academies from './views/academies/Academy';
import Divisions from './views/divisions/Divisions';
import IntakeModulesView from './views/intakes/IntakeModules';
import IntakesView from './views/intakes/Intakes';
import LevelsView from './views/levels/Levels';
import Modules from './views/modules';
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
  console.log(data, 'in route protected');
  useEffect(() => {
    setAuthUser(data?.data.data);
    console.log('changed');
  }, [data?.data.data]);

  const InstitutionAdminRoutes = () => (
    <>
      {/*start of institution admin */}
      <Route path="/dashboard/role/:id/view" component={ViewRole} />
      <Route path="/dashboard/academies" component={Academies} />
      <Route path="/dashboard/roles" component={Roles} />
      <Route exact path="/dashboard/user/new" component={NewStudent} />
      <Route exact path="/dashboard/users/instructor/new" component={NewInstructor} />
      <Route path="/dashboard/users" component={Users} />
      <Route path="/dashboard/privileges" component={PrivilegesView} />
      {/* end of institution admin page */}
    </>
  );

  const AcademicAdminRoutes = () => (
    <>
      {/* start of academic admin pages */}
      <Route path="/dashboard/modules" component={Modules} />
      <Route path="/dashboard/subjects" component={Subjects} />
      <Route path="/dashboard/registration-control" component={RegistrationControl} />

      <Route path="/dashboard/divisions" component={Divisions} />

      <Route exact path="/dashboard/programs" component={AcademicPrograms} />
      <Route exact path="/dashboard/programs/new" component={NewAcademicProgram} />
      <Route path="/dashboard/programs/:id" component={ProgramDetails} />
      <Route exact path="/dashboard/levels" component={LevelsView} />
      <Route exact path="/dashboard/intakes" component={IntakesView} />
      <Route exact path="/dashboard/intakes/:id" component={IntakeModulesView} />
      {/* end of academic admin pages */}
    </>
  );

  return (
    <>
      <Dashboard>
        {(authUser?.user_type == 'SUPER_ADMIN' || import.meta.env.DEV) &&
          InstitutionAdminRoutes()}
        {(authUser?.user_type == 'ADMIN' || import.meta.env.DEV) && AcademicAdminRoutes()}
      </Dashboard>
      {/* protected routes  */}

      {/* end of protected routes */}
    </>
  );
};

export default RouterProtection;
