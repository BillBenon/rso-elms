import React from 'react';
import { Link as BrowserLink } from 'react-router-dom';

import { authenticatorStore } from '../../../../store/administration';
import { CommonCardDataType } from '../../../../types';
import { UserType } from '../../../../types/services/user.types';
import Button from '../../../Atoms/custom/Button';
import Heading from '../../../Atoms/Text/Heading';
import Tooltip from '../../Tooltip';
import CommonCardMolecule from '../CommonCardMolecule';

interface IProps {
  course: CommonCardDataType;
}

export default function ModuleCard({ course }: IProps) {
  const authUser = authenticatorStore.authUser().data?.data.data;

  return (
    <div className="p-2 mt-3">
      <Tooltip
        open
        trigger={
          <CommonCardMolecule
            data={course}
            to={{ title: 'module', to: `/dashboard/modules/${course.id}/subject` }}>
            <p className="pt-3">
              Total subjects:
              <span className="px-1 text-primary-500">{'None'}</span>
            </p>
          </CommonCardMolecule>
        }>
        <div className="w-96 p-4">
          <Heading fontWeight="semibold">{course.title}</Heading>
          <p className="pt-4 pb-2 text-txt-secondary text-sm mt-4">
            {course.description}
          </p>
          {authUser?.user_type === UserType.STUDENT ? (
            <BrowserLink
              className="outline-none"
              to={`/dashboard/modules/${course.id}/subject`}>
              <Button styleType="outline">Start module</Button>
            </BrowserLink>
          ) : authUser?.user_type === UserType.ADMIN ? (
            <div className="py-2 flex justify-around gap-2">
              <BrowserLink
                className="outline-none"
                to={`/dashboard/modules/${course.id}/add-subject`}>
                <Button>Add subject</Button>
              </BrowserLink>
              <BrowserLink
                className="outline-none"
                to={`/dashboard/modules/${course.id}/edit`}>
                <Button styleType="outline">Edit</Button>
              </BrowserLink>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Tooltip>
    </div>
  );
}
