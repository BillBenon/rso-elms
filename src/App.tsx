import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ComponentsUseCase from './components/Organisms/ComponentsUseCase';
import ExperienceInfo from './components/Organisms/forms/auth/signup/experience/ExperienceInfo';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import { MainLayout } from './layout/MainLayout';
import Redirecting from './Redirecting';
import RouterProtection from './RouterProtection';
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import NewInstitution from './views/insitution/NewInstitution';
import NotFound from './views/NotFound';
import OpenRegistrations from './views/openreg/OpenRegistrations';

const App = () => {
  return (
    <>
      <MainLayout>
        <Router>
          <Switch>
            <Route
              exact
              path="/dashboard/open-registrations"
              component={OpenRegistrations}
            />
            <Route exact path="/" component={Signin} />
            <Route exact path="/redirecting" component={Redirecting} />
            <Route exact path="/institution" component={NewInstitution} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/register/experience" component={ExperienceInfo} />
            <Route exact path="/register/more" component={MoreInfo} />
            <Route exact path="/usecase" component={ComponentsUseCase} />
            <RouterProtection />

            <Route path="*" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </MainLayout>
    </>
  );
};

export default App;
