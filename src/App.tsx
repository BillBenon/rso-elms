import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Academies from './components/Organisms/academy/Academy';
import AddAcademy from './components/Organisms/academy/AddAcademy';
import CreatedBySandberg from './components/Organisms/CreatedBySandberg';
import SignUpForm from './components/Organisms/signup/SignUpForm';
import Dashboard from './layout/Dashboard';
import Modules from './views/modules';
import NotFound from './views/NotFound';
import Popup from './views/Popup';
import NewStudentsView from './views/users/NewStudent';
import UsersView from './views/users/Users';

const App = () => {
  const Homepage = () => {
    return (
      <Dashboard>
        <CreatedBySandberg />
      </Dashboard>
    );
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />

          <Route exact path="/register" component={SignUpForm} />
          <Route exact path="/academies" component={Academies} />
          <Route exact path="/academies/add" component={AddAcademy} />
          <Route exact path="/users" component={UsersView} />
          <Route exact path="/popup" component={Popup} />
          <Route exact path="/modules" component={Modules} />
          <Route exact path="/users/students/new" component={NewStudentsView} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
