import React from 'react';

// import Table from './components/Molecules/Table';
import SignUpForm from './components/Organisms/signup/SignUpForm';

const App = () => {
  const data = [
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
    { Name: 'Abc', age: 15, love: 'Complete', Location: 'Bangalore' },
    { Name: 'Def', age: 43, love: 'Active', Location: 'Mumbai' },
    { Name: 'Uff', age: 30, love: 'Suspended', Location: 'Chennai' },
    { Name: 'Ammse', age: 87, love: 'Pending', Location: 'Delhi' },
    { Name: 'Yysse', age: 28, love: 'Cancelled', Location: 'Hyderabad' },
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
