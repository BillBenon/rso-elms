import React from 'react';

import Button from '../components/Atoms/custom/Button';

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-full md:w-10/12 lg:w-7/12 mx-auto px-8">
        <div className="flex">
          <h1 className="text-primary-500 font-bold text-7xl text-center px-5">404</h1>
          <div>
            <div className="border-l-2 px-5">
              <h4 className="font-black text-6xl">Page not found</h4>
              <p className="text-base text-gray-400 font-bold text-center py-3">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="py-10 px-5 flex gap-3">
              <Button onClick={() => window.history.back()}>Go back home</Button>
              <Button type="outline" onClick={() => (window.location.href = '/support')}>
                Contact support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
