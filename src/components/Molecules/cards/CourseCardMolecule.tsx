import '../../../styles/components/molecules/cards/CourseCardMolecule.scss';

import React from 'react';
import { useHistory } from 'react-router';

import { CourseModelDataType, Link } from '../../../types';
import Badge from '../../Atoms/custom/Badge';
import Heading from '../../Atoms/Text/Heading';

type PropType = {
  active?: boolean;
  to?: Link;
  data: CourseModelDataType;
};

export default function CourseCardMolecule({ active = false, to, data }: PropType) {
  const history = useHistory();

  function handleAction() {
    if (to) history.push(to.to);
  }

  function handlePress(e: KeyboardEvent) {
    if (e.key === 'Enter') handleAction();
  }

  return (
    <div
      id="course-card-molecule"
      className={`bg-main p-6 rounded-lg 
      ${active && 'border-4 border-primary-500 border-solid'}
      ${to && 'cursor-pointer'}
      `}
      role="presentation"
      onClick={handleAction}
      //   @ts-ignore
      onKeyPress={handlePress}>
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold">{data.code}</Heading>
        {data.status && <Badge badgecolor={data.status.type}>{data.status.text}</Badge>}
      </div>
      <div>
        <Heading fontWeight="semibold">{data.title}</Heading>
        {data.subTitle && <Heading color="txt-secondary">Short Course</Heading>}
        <p id="course-card-description" className="text-txt-secondary mt-4">
          {data.description}
        </p>
      </div>
    </div>
  );
}