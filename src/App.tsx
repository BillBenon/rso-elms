import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Checkbox from './components/Atoms/Input/CheckBox';
import DropDown from './components/Atoms/Input/Dropdown';
import { Tab, Tabs } from './components/Molecules/tabs/tabs';
import SignUpForm from './components/Organisms/signup/SignUpForm';
import Dashboard from './layout/Dashboard';
import NotFound from './views/NotFound';
import Popup from './views/Popup';
import UsersView from './views/Users';

const App = () => {
  const data = [
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', Age: 15, Status: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', Age: 43, Status: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', Age: 30, Status: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', Age: 87, Status: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', Age: 28, Status: 'Cancelled', Location: 'Hyderabad' },
    {
      column1: 'Cell 1',
      column2: 'Cell 2',
      column3: 'Cell 3',
    },
    {
      column1: 'Cell 4',
      column2: 'Cell 5',
      column3: 'Cell 6',
    },
    {
      column1: 'Cell 7',
      column2: 'Cell 8',
      column3: 'Cell 9',
    },
    {
      column1: 'Cell 10',
      column2: 'Cell 11',
      column3: 'Cell 12',
    },
  ];

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
      <Dashboard activeIndex={2}>
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
          />
          <div className="py-3">
            <Checkbox
              name="language"
              value="en"
              checked={checked}
              label="French"
              onChange={() => setChecked(!checked)}
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
          <Route exact path="/users" component={UsersView} />
          <Route exact path="/popup" component={Popup} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
