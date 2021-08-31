import React from 'react';

import Button from '../components/Atoms/custom/Button';

const Home = () => {
  return (
    <React.Fragment>
      <main>
        <Button type={'fill'}>name</Button>
        <Button type={'outlined'}>name</Button>
        <Button type={'text'}>name</Button>
      </main>
    </React.Fragment>
  );
};

export default Home;
