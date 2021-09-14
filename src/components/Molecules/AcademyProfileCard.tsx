import React from 'react';

import Avatar from '../Atoms/custom/Avatar';
import Badge from '../Atoms/custom/Badge';
import ILabel from '../Atoms/Text/ILabel';

type ICard = { children: React.ReactNode };

export default function AcademyProfileCard({ children }: ICard) {
  return (
    <Badge className="flex items-center gap-4 bg-secondary h-16 w-full p-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        size="32"
        alt="academy logo"
      />
      <ILabel size="xs" weight="medium">
        {children}
      </ILabel>
    </Badge>
  );
}
