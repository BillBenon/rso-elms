import React from 'react';

import Avatar from '../Atoms/custom/Avatar';
import ILabel from '../Atoms/Text/ILabel';

type ICard = { children: React.ReactNode };

export default function AcademyProfileCard({ children }: ICard) {
  return (
    <div
      className="flex items-center gap-4 bg-secondary h-16 rounded-md w-full p-4"
      style={{ maxWidth: '12rem' }}>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        size="10"
        alt="academy logo"
      />
      <ILabel>{children}</ILabel>
    </div>
  );
}
