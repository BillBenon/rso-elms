import React, { useState } from 'react';

import { CourseModelDataType, Link, ValueType } from '../../../types';
import Button from '../../Atoms/custom/Button';
import Cacumber from '../../Molecules/Cacumber';
import CourseCardMolecule from '../../Molecules/cards/CourseCardMolecule';
import PopupMolecule from '../../Molecules/Popup';
import TableHeader from '../../Molecules/table/TableHeader';
import NewIntakeStepOne from './NewIntakeStep1';

const list: Link[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'faculty', title: 'Faculty' },
  { to: 'programs', title: 'Programs' },
  { to: 'intakes', title: 'Intakes' },
];

const data: CourseModelDataType[] = [
  {
    status: { type: 'error', text: 'Inactive' },
    code: 'Intake-2020',
    title: 'Cadette Program',
    subTitle: 'Short course',
    description:
      'Start Date:   17 Aug 2021 - 10 Sep 2021 Expected End Date:  17 Aug 2021 - 10 Sep 2021 View More',
  },
  {
    status: { type: 'success', text: 'On going' },
    code: 'Intake-2020',
    title: 'Cadette Program',
    subTitle: 'Short course',
    description:
      'Start Date:   17 Aug 2021 - 10 Sep 2021 Expected End Date:  17 Aug 2021 - 10 Sep 2021 View More',
  },
  {
    status: { type: 'success', text: 'On going' },
    code: 'Intake-2020',
    title: 'Cadette Program',
    subTitle: 'Short course',
    description:
      'Start Date:   17 Aug 2021 - 10 Sep 2021 Expected End Date:  17 Aug 2021 - 10 Sep 2021 View More',
  },
];

export default function Intakes() {
  const [modalOpen, setmodalOpen] = useState(true);
  const [step, setStep] = useState(0);

  function handleSearch(_e: ValueType) {}
  return (
    <div>
      <Cacumber list={list} />
      <TableHeader title="Intakes" totalItems={7} handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button>Add intake</Button>
        </div>
      </TableHeader>{' '}
      <section className="flex flex-wrap justify-between mt-2">
        {data.map((course) => (
          <div key={course.code} className="p-1 mt-3">
            <CourseCardMolecule
              data={course}
              to={{ title: 'module', to: 'modules/id' }}
            />
          </div>
        ))}
      </section>
      <PopupMolecule
        title="New intake"
        open={modalOpen && step === 0}
        onClose={() => setmodalOpen(false)}>
        <NewIntakeStepOne />
      </PopupMolecule>
    </div>
  );
}
