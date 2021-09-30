import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ComponentsUseCase from './components/Organisms/ComponentsUseCase';
import ExperienceInfo from './components/Organisms/forms/auth/signup/experience/ExperienceInfo';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import NewInstructor from './components/Organisms/user/NewInstructor';
import NewStudent from './components/Organisms/user/NewStudent';
import Dashboard from './layout/Dashboard';
import { MainLayout } from './layout/MainLayout';
import Academies from './views/academies/Academy';
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import FacultiesView from './views/faculties/Faculties';
import NewInstitution from './views/insitution/NewInstitution';
import IntakeModulesView from './views/intakes/IntakeModules';
import IntakesView from './views/intakes/Intakes';
import LevelsView from './views/levels/Levels';
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
            <Route exact path="/institution" component={NewInstitution} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/register/experience" component={ExperienceInfo} />
            <Route exact path="/register/more" component={MoreInfo} />
            <Route exact path="/usecase" component={ComponentsUseCase} />

            <Dashboard>
              <Route path="/dashboard/academies" />
              <Route exact path="/dashboard/academies" component={Academies} />
              {/* <Route exact path="/dashboard/academies/new" component={NewAcademy} /> */}
              <Route exact path="/dashboard/role/:id/view" component={ViewRole} />
              <Route path="/dashboard/roles" component={Roles} />
              <Route exact path="/dashboard/modules" component={Modules} />
              <Route exact path="/dashboard/subjects" component={Subjects} />
              <Route
                path="/dashboard/registration-control"
                component={RegistrationControl}
              />

              <Route exact path="/dashboard/users/student/new" component={NewStudent} />
              <Route
                exact
                path="/dashboard/users/instructor/new"
                component={NewInstructor}
              />
              <Route path="/dashboard/users" component={Users} />
              <Route exact path="/dashboard/faculties" component={FacultiesView} />
              <Route path="/dashboard/programs" component={AcademicPrograms} />
              <Route exact path="/dashboard/levels" component={LevelsView} />
              <Route exact path="/dashboard/intakes" component={IntakesView} />
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
