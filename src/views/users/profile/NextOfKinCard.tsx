import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Avatar from '../../../components/Atoms/custom/Avatar';
import Badge from '../../../components/Atoms/custom/Badge';
import Button from '../../../components/Atoms/custom/Button';
import Heading from '../../../components/Atoms/Text/Heading';
import ILabel from '../../../components/Atoms/Text/ILabel';
import usernextkinStore from '../../../store/administration/usernextkin.store';
import { UserInfo } from '../../../types/services/user.types';

function NextOfKinCard({ user }: { user: UserInfo }) {
  const { url } = useRouteMatch();
  const { data: nextOfKin } = usernextkinStore.getHisNextKinById(user.id + '');

  return (
    <div className="max-w-sm py-4 px-6 bg-main rounded-md max-h-80 overflow-auto">
      <Heading fontWeight="semibold" fontSize="base" className="pt-6 pb-7">
        Next of Kin
      </Heading>
      <div className="flex flex-col items-end -mt-16 mb-6">
        <Link to={`${url}/add-next-kin`}>
          <Button>Add Next of Kin</Button>
        </Link>
      </div>
      {nextOfKin?.data.data.length === 0 ? (
        <Badge
          fontWeight="medium"
          badgecolor="secondary"
          badgetxtcolor="txt-secondary"
          fontSize="sm"
          className="mx-2">
          The next of kins for this user are currently not specificied
        </Badge>
      ) : (
        nextOfKin?.data.data.map((kin) => (
          <div key={kin.id} className="flex justify-evenly h-16 w-full items-center mb-6">
            <Avatar src="/images/default-pic.png" alt="person logo" size="48" />
            <div>
              <p>
                <ILabel size="sm" weight="semibold" color="primary">
                  {kin.nextOfKin.first_name + ' ' + kin.nextOfKin.last_name}
                </ILabel>
              </p>
              <p className="text-txt-secondary text-sm py">{kin.nextOfKin.email}</p>
              <p className="text-txt-secondary text-sm py">
                {kin.nextOfKin.place_of_residence}
              </p>
            </div>
            <div>
              <p>
                <ILabel size="sm" weight="medium" color="primary">
                  {kin.nextOfKin.relationship}
                </ILabel>
              </p>
              <p className="text-txt-primary font-semibold py-2 text-sm">
                {kin.nextOfKin.phone_number}
              </p>
            </div>
            <div className="flex flex-col items-end mt-2">
              <Link to={`${url}/edit-next-kin/${kin.id}`}>
                <Button styleType="outline">Edit</Button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NextOfKinCard;
