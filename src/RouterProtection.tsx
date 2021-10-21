import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import Dashboard from './layout/Dashboard';
import { authenticatorStore } from './store';
import { UserInfo } from './types/services/user.types';
import Academies from './views/academies/Academy';
import Divisions from './views/divisions/Divisions';
import ViewEvaluations from './views/evaluation/ViewEvaluations';
import NewInstitution from './views/insitution/NewInstitution';
import UpdateInstitution from './views/insitution/UpdateInstitution';
import IntakeModulesView from './views/intakes/IntakeModules';
import IntakesView from './views/intakes/Intakes';
import Levels from './views/levels/Levels';
import Modules from './views/modules';
import PrivilegesView from './views/privileges/Privileges';
import AcademicPrograms from './views/programs/AcademicPrograms';
import NewAcademicProgram from './views/programs/NewAcademicProgram';
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
    <>
      {/*start of institution admin */}
      <Route path="/dashboard/role/:id/view" component={ViewRole} />
      <Route path="/dashboard/academies" component={Academies} />
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
      <Route path="/dashboard/modules" component={Modules} />
      <Route path="/dashboard/subjects" component={Subjects} />
      <Route path="/dashboard/evaluations" component={ViewEvaluations} />
      <Route path="/dashboard/registration-control" component={RegistrationControl} />
      <Route path="/dashboard/divisions" component={Divisions} />
      <Route path="/dashboard/programs" component={AcademicPrograms} />
      <Route path="/dashboard/programs/new" component={NewAcademicProgram} />
      <Route path="/dashboard/levels" component={Levels} />
      <Route path="/dashboard/intakes" component={IntakesView} />
      <Route exact path="/dashboard/intakes/:id" component={IntakeModulesView} />

      {/* end of academic admin pages */}
    </>
  );

  return (
    <>
      {(authUser?.user_type == 'SUPER_ADMIN' || import.meta.env.DEV) && (
        <Route exact path="/institution/new" component={NewInstitution} />
      )}
      <Dashboard>
        {authUser?.user_type == 'SUPER_ADMIN' && InstitutionAdminRoutes()}
        {authUser?.user_type == 'ADMIN' && AcademicAdminRoutes()}
      </Dashboard>
      {/* protected routes  */}

      {/* end of protected routes */}
    </>
  );
};

export default RouterProtection;
