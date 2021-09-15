import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Checkbox from './components/Atoms/Input/CheckBox';
import DropDown from './components/Atoms/Input/Dropdown';
import { Tab, Tabs } from './components/Molecules/tabs/tabs';
import Academies from './components/Organisms/academy/Academy';
import AddAcademy from './components/Organisms/academy/AddAcademy';
import RegistrationControl from './components/Organisms/registrationControl/RegistrationControl';
import SignUpForm from './components/Organisms/signup/SignUpForm';
import Dashboard from './layout/Dashboard';
import Modules from './views/modules';
import NotFound from './views/NotFound';
import Popup from './views/Popup';
import NewInstructorView from './views/users/NewInstructor';
import NewStudentsView from './views/users/NewStudent';
import UsersView from './views/users/Users';

const App = () => {
  const [checked, setChecked] = useState(false);

  const options = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'French',
      value: 'fr',
    },
    {
      label: 'Kinyarwanda',
      value: 'kiny',
    },
  ];

  const Homepage = () => {
    return (
      <Dashboard>
        <div className="p-8">
          <h2 className="font-bold text-primary-500 text-2xl py-10">
            Created by Sandberg.
          </h2>
          <Checkbox
            name="language"
            value="en"
            checked={checked}
            label="English"
            onChange={() => setChecked(!checked)}
            error={null}
          />
          <div className="py-3">
            <Checkbox
              name="language"
              value="en"
              checked={checked}
              label="French"
              onChange={() => setChecked(!checked)}
              error={null}
            />
          </div>
          <DropDown
            options={options}
            name="intakes"
            onChange={(e: object) => console.log(e)}
            isMulti={false}
            className="w-1/2"
          />
          <Tabs className="my-10" activeIndex={1}>
            <Tab label="Students">
              <h1 className="text-3xl text-primary-500">Students</h1>
            </Tab>
            <Tab label="Instructors">
              <h2 className="text-3xl text-green-400">Instructors</h2>
            </Tab>
            <Tab label="Admins" disabled={false}>
              <h2 className="text-3xl text-yellow-300 font-bold">Admins here</h2>
            </Tab>
          </Tabs>
        </div>
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
          <Route exact path="/academies/new" component={AddAcademy} />
          <Route exact path="/users" component={UsersView} />
          <Route exact path="/popup" component={Popup} />
          <Route exact path="/modules" component={Modules} />
          <Route exact path="/registration-control" component={RegistrationControl} />
          <Route exact path="/users/students/new" component={NewStudentsView} />
          <Route exact path="/users/instructors/new" component={NewInstructorView} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
