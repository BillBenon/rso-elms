import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ExperienceDetails from './components/Organisms/forms/auth/signup/experience/ExperienceDetails';
import MoreInfo from './components/Organisms/forms/auth/signup/more-details/MoreInfo';
import OtherDetails from './components/Organisms/forms/auth/signup/personal/OtherDetails';
import { MainLayout } from './layout/MainLayout';
import Redirecting from './Redirecting';
import RouterProtection from './RouterProtection';
import CompleteProfile from './views/auth/CompleteProfile';
import Signin from './views/auth/Signin';
import Home from './views/Home';
import NewInstitution from './views/insitution/NewInstitution';
import NotFound from './views/NotFound';

const App = () => {
  return (
    <>
      <MainLayout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/redirecting" component={Redirecting} />
            <Route exact path="/complete-experience" component={ExperienceDetails} />
            <Route path="/complete-profile" component={CompleteProfile} />
            <Route exact path="/complete-more" component={MoreInfo} />
            <Route exact path="/complete-other" component={OtherDetails} />
            <Route exact path="/new-institution" component={NewInstitution} />
            <Route path="/login" component={Signin} />
            <Route path="/dashboard" component={RouterProtection} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </MainLayout>
    </>
  );
};

export default App;
