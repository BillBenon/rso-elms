import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ComponentsUseCase from './components/Organisms/ComponentsUseCase';
import ExperienceInfo from './components/Organisms/forms/auth/signup/experience/ExperienceInfo';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import Dashboard from './layout/Dashboard';
import { MainLayout } from './layout/MainLayout';
import Redirecting from './Redirecting';
import RouterProtection from './RouterProtection';
import Academy from './views/academies/Academy';
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import Divisions from './views/divisions/Divisions';
import NewInstitution from './views/insitution/NewInstitution';
import IntakeModulesView from './views/intakes/IntakeModules';
import Intakes from './views/intakes/Intakes';
import Levels from './views/levels/Levels';
import Modules from './views/modules';
import NotFound from './views/NotFound';
import PrivilegesView from './views/privileges/Privileges';
import AcademicPrograms from './views/programs/AcademicPrograms';
import Roles from './views/roles/Roles';
import ViewRole from './views/roles/ViewRole';
import Subjects from './views/subjects';
import Users from './views/users/Users';

const App = () => {
  return (
    <>
      <MainLayout>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Route exact path="/redirecting" component={Redirecting} />
            <Route exact path="/institution" component={NewInstitution} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/register/experience" component={ExperienceInfo} />
            <Route exact path="/register/more" component={MoreInfo} />
            <Route exact path="/usecase" component={ComponentsUseCase} />
            <RouterProtection />

            <Dashboard>
              <Route path="/dashboard/role/:id/view" component={ViewRole} />
              <Route path="/dashboard/academies" component={Academy} />
              <Route path="/dashboard/roles" component={Roles} />
              <Route exact path="/dashboard/modules" component={Modules} />
              <Route exact path="/dashboard/subjects" component={Subjects} />
              <Route
                path="/dashboard/registration-control"
                component={RegistrationControl}
              />
              <Route path="/dashboard/users" component={Users} />
              <Route path="/dashboard/divisions" component={Divisions} />

              <Route path="/dashboard/programs" component={AcademicPrograms} />
              <Route path="/dashboard/levels" component={Levels} />
              <Route exact path="/dashboard/intakes" component={Intakes} />
              <Route exact path="/dashboard/intakes/:id" component={IntakeModulesView} />
              <Route path="/dashboard/privileges" component={PrivilegesView} />
            </Dashboard>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MainLayout>
    </>
  );
};

export default App;
