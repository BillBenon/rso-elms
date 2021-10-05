import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Cacumber from '../../components/Molecules/Cacumber';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import NewIntake from '../../components/Organisms/intake/NewIntake';
import { intakeStore } from '../../store/intake.store';
import { CommonCardDataType, Link as LinkType, ValueType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

const list: LinkType[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'faculty', title: 'Faculty' },
  { to: 'programs', title: 'Programs' },
  { to: 'intakes', title: 'Intakes' },
];

export default function Intakes() {
  const [intakes, setIntakes] = useState<CommonCardDataType[]>([]);
  const history = useHistory();
  const { url } = useRouteMatch();

  const { isSuccess, isError, data } = intakeStore.getAll();

  useEffect(() => {
    if (isSuccess && data?.data) {
      let loadedIntakes: CommonCardDataType[] = [];
      data?.data.data.forEach((intake) => {
        let cardData: CommonCardDataType = {
          code: intake.code.toUpperCase(),
          description: intake.description,
          title: intake.title || `Intake ${intake.expected_start_date}`,
          status: {
            type: advancedTypeChecker(intake.intake_status),
            text: intake.intake_status.toString(),
          },
        };
        loadedIntakes.push(cardData);
      });

      setIntakes(loadedIntakes);
    } else if (isError) toast.error('error occurred when loading intakes');
  }, [data]);

  function handleSearch(_e: ValueType) {}
  function handleClose() {
    history.goBack();
  }
  return (
    <div>
      <Cacumber list={list} />
      <TableHeader
        title="Intakes"
        totalItems={intakes.length}
        handleSearch={handleSearch}>
        <Link to={`${url}/:id/add-intake`}>
          {' '}
          <Button>Add Registration Control</Button>
        </Link>
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

      {/* add intake to reg control */}
      <Route
        exact
        path={`${url}/:id/add-intake`}
        render={() => {
          return (
            <PopupMolecule title="New intake" open onClose={handleClose}>
              <NewIntake handleSuccess={handleClose} />
            </PopupMolecule>
          );
        }}
      />
    </div>
  );
}
