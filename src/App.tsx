import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ComponentsUseCase from './components/Organisms/ComponentsUseCase';
import ExperienceInfo from './components/Organisms/forms/auth/signup/experience/ExperienceInfo';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import Dashboard from './layout/Dashboard';
import { MainLayout } from './layout/MainLayout';
import Academies from './views/academies/Academy';
import NewAcademy from './views/academies/NewAcademy';
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import FacultiesView from './views/faculties/Faculties';
import NewInstitution from './views/insitution/NewInsitution';
import IntakeModulesView from './views/intakes/IntakeModules';
import IntakesView from './views/intakes/Intakes';
import LevelsView from './views/levels/Levels';
import Modules from './views/modules';
import NotFound from './views/NotFound';
import Popup from './views/Popup';
import AcademicPrograms from './views/programs/AcademicPrograms';
import NewAcademicProgram from './views/programs/NewAcademicProgram';
import ProgramDetails from './views/programs/ProgramDetails';
import Roles from './views/roles/Roles';
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
              <Route exact path="/dashboard/academies" component={Academies} />
              <Route exact path="/dashboard/academies/new" component={NewAcademy} />
              <Route path="/dashboard/roles" component={Roles} />
              <Route exact path="/dashboard/popup" component={Popup} />
              <Route exact path="/dashboard/modules" component={Modules} />
              <Route exact path="/dashboard/subjects" component={Subjects} />
              <Route
                exact
                path="/dashboard/registration-control"
                component={RegistrationControl}
              />
              <Route path="/dashboard/users" component={Users} />
              <Route exact path="/dashboard/faculties" component={FacultiesView} />
              <Route exact path="/dashboard/programs" component={AcademicPrograms} />
              <Route
                exact
                path="/dashboard/programs/new"
                component={NewAcademicProgram}
              />
              <Route path="/dashboard/programs/:id" component={ProgramDetails} />
              <Route exact path="/dashboard/levels" component={LevelsView} />
              <Route exact path="/dashboard/intakes" component={IntakesView} />
              <Route exact path="/dashboard/intakes/:id" component={IntakeModulesView} />
            </Dashboard>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MainLayout>
    </>
  );
};

export default App;
