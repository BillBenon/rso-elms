import '../../../styles/components/Molecules/cards/CommonCardMolecule.css';

import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { CommonCardDataType, Link } from '../../../types';
import Badge from '../../Atoms/custom/Badge';
import Heading from '../../Atoms/Text/Heading';

type PropType = {
  active?: boolean;
  to?: Link;
  data: CommonCardDataType;
  className?: string;
  children?: ReactNode;
  handleClick?: (_e: Event) => void;
};

export default function CommonCardMolecule({
  active = false,
  to,
  data,
  className = '',
  children,
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

  console.log(data);

  return (
    <div
      className={`course-card-molecule bg-main p-6 rounded-lg 
      ${active && 'border-4 border-primary-500 border-solid'} cursor-pointer
      ${className}
      `}
      role="presentation"
      // @ts-ignore
      onClick={handleAction}
      //   @ts-ignore
      onKeyPress={handlePress}>
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold" fontSize="base">
          {data.code}
        </Heading>
        {data.status && (
          <Badge badgecolor={data.status.type} className="capitalize">
            {data.status.text}
          </Badge>
        )}
      </div>
      <div className="mt-6">
        <Heading fontSize="base" fontWeight="semibold">
          {data.title}
        </Heading>
        {data.subTitle && (
          <Heading fontSize="sm" className="pt-2" color="txt-secondary">
            {data.subTitle}
          </Heading>
        )}
        <p className="course-card-description py-4 text-txt-secondary text-sm">
          {data.description}
        </p>

        {/* footer */}
        <div>{children}</div>
      </div>
    </div>
  );
}
