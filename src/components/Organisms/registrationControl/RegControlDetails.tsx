import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { intakeStore } from '../../../store/administration/intake.store';
import { CommonCardDataType, Link, ParamType } from '../../../types';
import { advancedTypeChecker } from '../../../utils/getOption';
import Button from '../../Atoms/custom/Button';
import Heading from '../../Atoms/Text/Heading';
import BreadCrumb from '../../Molecules/BreadCrumb';
import CommonCardMolecule from '../../Molecules/cards/CommonCardMolecule';

const list: Link[] = [
  { to: 'home', title: 'Institution Admin' },
  { to: 'registration-control', title: 'Registration control' },
  { to: 'intakes', title: 'Intakes' },
];

export default function RegControlDetails() {
  const [intakes, setIntakes] = useState<CommonCardDataType[]>([]);
  const { id } = useParams<ParamType>();
  const { url } = useRouteMatch();

  const { isSuccess, isError, data } = intakeStore.getIntakesByRegControl(id);
  const history = useHistory();

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

  return (
    <div>
      <BreadCrumb list={list} />
      <div className="flex gap-2 justify-between items-center py-3">
        <Heading className="capitalize" fontSize="2xl" fontWeight="bold">
          Registration control details
        </Heading>
        <Button onClick={() => history.push(`${url}/add-intake`)}>Add intake</Button>
      </div>

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
    </div>
  );
}
