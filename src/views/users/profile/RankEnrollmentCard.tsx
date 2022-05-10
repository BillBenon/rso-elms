import React from 'react';

import Badge from '../../../components/Atoms/custom/Badge';
import Heading from '../../../components/Atoms/Text/Heading';
import { UserInfo } from '../../../types/services/user.types';

function RankEnrollmentCard({ user }: { user: UserInfo }) {
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md max-h-80 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Rank Enrollment
      </Heading>
      {user.person?.current_rank ? (
        <div className="flex flex-col gap-3 w-full pb-9">
          <div className="flex text-sm">
            <p className="text-txt-secondary">Current rank</p>
            <p className="text-txt-primary px-2 font-semibold">
              {user.person.current_rank?.name || ''}
            </p>
          </div>
          <div className="flex text-sm">
            <p className="text-txt-secondary">Got rank from: </p>
            <p className="text-txt-primary px-2 font-semibold">
              {user.person.rank_depart || ''}
            </p>
          </div>
          <div className="flex text-sm">
            <p className="text-txt-secondary">On: </p>
            <p className="text-txt-primary px-2 font-semibold">
              {user.person.date_of_issue || ''}{' '}
            </p>
          </div>
        </div>
      ) : (
        <Badge
          fontWeight="medium"
          badgecolor="secondary"
          badgetxtcolor="txt-secondary"
          fontSize="sm"
          className="mx-2">
          Ranks are currently not specificied
        </Badge>
      )}
    </div>
  );
}

export default RankEnrollmentCard;
