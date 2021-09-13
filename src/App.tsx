import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Checkbox from './components/Atoms/custom/CheckBox';
import Dashboard from './components/Molecules/Dashboard';
import { Tab, Tabs } from './components/Molecules/tabs/tabs';
import SignUpForm from './components/Organisms/signup/SignUpForm';
import DropDown from './styles/components/atoms/custom/Dropdown';
import Modules from './views/modules';
import Popup from './views/Popup';

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

  const ErrorPage = () => {
    return (
      <div className="w-full md:w-10/12 lg:w-7/12 xl:w-1/2 mx-auto py-24 px-20">
        <h1 className="text-primary-500 font-bold text-9xl text-center">404</h1>
        <h4 className="font-bold text-gray-500 text-4xl text-center">Page not found</h4>
      </div>
    );
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />

          <Route exact path="/register" component={SignUpForm} />
          <Route exact path="/popup" component={Popup} />
          <Route exact path="/modules" component={Modules} />
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
