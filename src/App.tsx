import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import ExperienceInfo from './components/Organisms/forms/auth/signup/experience/ExperienceInfo';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import { MainLayout } from './layout/MainLayout';
import Redirecting from './Redirecting';
import RouterProtection from './RouterProtection';
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import Home from './views/Home';
import NotFound from './views/NotFound';

const App = () => {
  return (
    <>
      <MainLayout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/redirecting" component={Redirecting} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/register/experience" component={ExperienceInfo} />
            <Route exact path="/register/more" component={MoreInfo} />
            <Route path="/login" component={Signin} />
            <Redirect exact from="/" to="/login" />
            <RouterProtection />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MainLayout>
    </>
  );
};

export default App;
