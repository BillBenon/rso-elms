import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import ExperienceDetails from './components/Organisms/forms/auth/signup/experience/ExperienceDetails';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import OtherDetails from './components/Organisms/forms/auth/signup/more-details/OtherDetails';
import { MainLayout } from './layout/MainLayout';
import Redirecting from './Redirecting';
import RouterProtection from './RouterProtection';
import CompleteProfile from './views/auth/CompleteProfile';
import Signin from './views/auth/Signin';
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
            <Route exact path="/complete-profile" component={CompleteProfile} />
            <Route
              exact
              path="/complete-profile/experience"
              component={ExperienceDetails}
            />
            <Route exact path="/complete-profile/more" component={MoreInfo} />
            <Route exact path="/complete-profile/other" component={OtherDetails} />
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
