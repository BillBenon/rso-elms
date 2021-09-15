import React from 'react';

import Avatar, { IAvatar } from '../../Atoms/custom/Avatar';
import Badge from '../../Atoms/custom/Badge';
import ILabel from '../../Atoms/Text/ILabel';

interface ICard extends IAvatar {
  children: React.ReactNode;
}

export default function AcademyProfileCard({ children, src, alt }: ICard) {
  return (
    <Badge
      badgecolor="secondary"
      roundWidth="md"
      className="flex gap-2 h-16 w-full p-4 items-center">
      <Avatar src={src} alt={alt} size="32" />
      <ILabel size="xs" weight="medium">
        {children}
      </ILabel>
    </Badge>
  );
}
