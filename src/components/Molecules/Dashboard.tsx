import React from 'react';

import Navigation from './navigation/Navigation';

type IDashboard = { children: React.ReactNode };

export default function Dashboard({ children }: IDashboard) {
  return (
    <div className="bg-gray-50 h-screen">
      {/* inner block */}
      <div className="lg:flex gap-5 lg:p-5 h-5/6">
        <div className="lg:w-64 h-full top-0 lg:sticky">
          <h2>hi there</h2>
        </div>
        {/* navbar and body */}
        <div className="block lg:w-4/5">
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="block w-full h-full py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
