import React from 'react';

// import Table from './components/Molecules/Table';
import SignUpForm from './components/Organisms/signup/SignUpForm';

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

  return (
    <>
      {/* <Table data={data} hasAction={true} statusColumn={'love'} /> */}
      <SignUpForm />
    </>
  );
};

export default App;
