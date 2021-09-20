import '../../../styles/components/Molecules/cards/CourseCardMolecule.scss';

import React from 'react';
import { useHistory } from 'react-router';

import { CourseModelDataType, Link } from '../../../types';
import Badge from '../../Atoms/custom/Badge';
import Heading from '../../Atoms/Text/Heading';

type PropType = {
  active?: boolean;
  to?: Link;
  data: CourseModelDataType;
  className?: string;
  handleClick?: (_e: Event) => void;
};

export default function CourseCardMolecule({
  active = false,
  to,
  data,
  className = '',
  handleClick,
}: PropType) {
  const history = useHistory();

  // handle action that especially click on this card
  function handleAction(e: Event) {
    if (to) history.push(to.to);

    if (handleClick) handleClick(e);
  }

  function handlePress(e: KeyboardEvent) {
    if (e.key === 'Enter') handleAction(e);
  }

  return (
    <div
      id="course-card-molecule"
      className={`bg-main p-6 rounded-lg 
      ${active && 'border-4 border-primary-500 border-solid'}
      ${to && 'cursor-pointer'}
      ${className}
      `}
      role="presentation"
      // @ts-ignore
      onClick={handleAction}
      //   @ts-ignore
      onKeyPress={handlePress}>
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold">{data.code}</Heading>
        {data.status && <Badge badgecolor={data.status.type}>{data.status.text}</Badge>}
      </div>
      <div className="mt-6">
        <Heading fontWeight="semibold">{data.title}</Heading>
        {data.subTitle && (
          <Heading fontSize="sm" className="pt-2" color="txt-secondary">
            Short Course
          </Heading>
        )}
        <p id="course-card-description" className="text-txt-secondary text-sm mt-4">
          {data.description}
        </p>
      </div>
    </div>
  );
}
