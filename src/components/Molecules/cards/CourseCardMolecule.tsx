import '../../../styles/components/molecules/cards/CourseCardMolecule.scss';

import React from 'react';

import Badge from '../../Atoms/custom/Badge';
import Heading from '../../Atoms/Text/Heading';

export default function CourseCardMolecule() {
  return (
    <div id="course-card-molecule" className="bg-main p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <Heading fontWeight="semibold">Ra01-430st</Heading>
        <Badge badgecolor="success">Active</Badge>
      </div>
      <div>
        <Heading fontWeight="semibold">
          The basics of Biomedics (Long course name this is it. Whoever was asking it
        </Heading>
        <Heading color="txt-secondary">Short Course</Heading>
        <p className="text-txt-secondary mt-4">
          This is a course description. It states briefy what this course is all about.
          Read More
        </p>
      </div>
    </div>
  );
}
