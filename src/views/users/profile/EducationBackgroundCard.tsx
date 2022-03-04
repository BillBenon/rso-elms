import moment from 'moment';
import React from 'react';

import Badge from '../../../components/Atoms/custom/Badge';
import Icon from '../../../components/Atoms/custom/Icon';
import Heading from '../../../components/Atoms/Text/Heading';
import { experienceStore } from '../../../store/administration/experience.store';
import { PersonInfo } from '../../../types/services/user.types';
import { titleCase } from '../../../utils/getOption';

function EducationBackgroundCard({ person }: { person: PersonInfo }) {
  const experience =
    experienceStore.getPersonExperiences(person.id + '').data?.data.data || [];
  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md max-h-96 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Experiences
      </Heading>
      {experience.length === 0 ? (
        <Badge
          fontWeight="medium"
          badgecolor="secondary"
          badgetxtcolor="txt-secondary"
          fontSize="sm"
          className="mx-2">
          Experiences are currently not specificied
        </Badge>
      ) : (
        experience.map((exp) => (
          <div key={exp.id} className="flex flex-col gap-3 w-full">
            <Badge
              badgecolor="secondary"
              badgetxtcolor="txt-secondary"
              fontSize="sm"
              className="flex items-center">
              <Icon name="chevron-right" /> {titleCase(exp.type.replaceAll('_', ' '))}
            </Badge>
            <div className="flex text-sm">
              <p className="text-txt-secondary pr-2">Level: </p>
              <p className="text-txt-primary px-2">{exp.level}</p>
            </div>
            <div className="flex text-sm">
              <p className="text-txt-secondary pr-1">Occupation: </p>
              <p className="text-txt-primary px-2">{exp.occupation}g</p>
            </div>
            <div className="flex text-xs">
              <p className="text-txt-secondary pr-2">From: </p>
              <p className="text-txt-primary px-2">
                {moment(exp.start_date).format('ddd, YYYY-MM-DD')}
              </p>
              <p className="text-txt-secondary pr-1">To: </p>
              <p className="text-txt-primary px-2">
                {moment(exp.end_date).format('ddd, YYYY-MM-DD')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EducationBackgroundCard;
