import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewIntake from '../../components/Organisms/intake/NewIntake';
import { intakeStore } from '../../store/intake.store';
import { CommonCardDataType, Link, ValueType } from '../../types';

const list: Link[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'faculty', title: 'Faculty' },
  { to: 'programs', title: 'Programs' },
  { to: 'intakes', title: 'Intakes' },
];

export default function Intakes() {
  const [modalOpen, setmodalOpen] = useState(false);
  const [intakes, setIntakes] = useState<CommonCardDataType[]>([]);
  console.log('intakes', intakes);

  const { isSuccess, isError, data } = intakeStore.getAll();

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log('here we go');
      let loadedIntakes: CommonCardDataType[] = [];
      data?.data.data.forEach((intake) => {
        let cardData: CommonCardDataType = {
          code: intake.code.toUpperCase(),
          description: intake.description,
          title: intake.title || `Intake ${intake.expected_start_date}`,
          status: {
            type: 'success',
            text: intake.intake_status.toString(),
          },
        };
        loadedIntakes.push(cardData);
      });

      setIntakes(loadedIntakes);
    } else if (isError) toast.error('error occurred when loading intakes');
    else console.log('intakes loading');
  }, [data]);

  function handleSearch(_e: ValueType) {}
  return (
    <div>
      <Cacumber list={list} />
      <TableHeader
        title="Intakes"
        totalItems={intakes.length}
        handleSearch={handleSearch}>
        <div className="flex gap-3">
          <Button onClick={() => setmodalOpen(true)}>Add intake</Button>
        </div>
      </TableHeader>
      <section className="flex flex-wrap justify-between mt-2">
        {intakes.map((course) => (
          <div key={course.code} className="p-1 mt-3">
            <CommonCardMolecule
              data={course}
              to={{ title: 'module', to: 'modules/id' }}
            />
          </div>
        ))}
      </section>
      <PopupMolecule
        closeOnClickOutSide={false}
        title="New intake"
        open={modalOpen}
        onClose={() => setmodalOpen(false)}>
        <NewIntake />
      </PopupMolecule>
    </div>
  );
}
