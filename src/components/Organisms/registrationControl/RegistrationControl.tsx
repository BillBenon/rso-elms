import moment from 'moment';
import React from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import registrationControlStore from '../../../store/registrationControl.store';
import { GenericStatus, ValueType } from '../../../types';
import { IRegistrationControlInfo } from '../../../types/services/registrationControl.types';
import Button from '../../Atoms/custom/Button';
import Icon from '../../Atoms/custom/Icon';
import Loader from '../../Atoms/custom/Loader';
import Heading from '../../Atoms/Text/Heading';
import ILabel from '../../Atoms/Text/ILabel';
import PopupMolecule from '../../Molecules/Popup';
import Table from '../../Molecules/table/Table';
import TableHeader from '../../Molecules/table/TableHeader';
import NewRegistrationControl from '../forms/NewRegistrationControl';
import UpdateRegControl from '../forms/regcontrol/UpdateRegControl';

export default function RegistrationControl() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { data, isLoading, isSuccess } = registrationControlStore.fetchRegControl();

  function handleSearch(_e: ValueType) {}

  interface IRegistrationInfo {
    'start date': string;
    'end date': string;
    description: string;
    status: GenericStatus;
    id: string | number | undefined;
    'academy name': string;
  }

  let RegistrationControls: IRegistrationInfo[] = [];
  let RegInfo = data?.data.data;

  RegInfo?.map((obj: IRegistrationControlInfo) => {
    obj.expected_end_date = moment(obj.expected_end_date).format('MMM D YYYY');
    obj.expected_start_date = moment(obj.expected_start_date).format('MMM D YYYY');

    let {
      description,
      generic_status,
      id,
      academy: { name }, //destructure name inside academy obj
      expected_start_date,
      expected_end_date,
    } = obj;

    let registrationcontrol: IRegistrationInfo = {
      'start date': expected_start_date,
      'end date': expected_end_date,
      description,
      'academy name': name,
      status: generic_status,
      id: id,
    };
    RegistrationControls.push(registrationcontrol);
  });

  function handleClose() {
    history.goBack();
  }

  const controlActions = [
    {
      name: 'Edit control',
      handleAction: (id: string | number | undefined) => {
        history.push(`${path}/${id}/edit`); // go to edit reg control
      },
    },
    { name: 'View', handleAction: () => {} },
    {
      name: 'Manage Intakes',
      handleAction: (id: string | number | undefined) => {
        history.push(`/dashboard/intakes?regId=${id}`); // go to add new intake to this reg control
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-start items-center">
        <ILabel size="sm" color="gray" weight="medium">
          Institution Admin
        </ILabel>
        <Icon name="chevron-right" />

        <ILabel size="sm" color="gray" weight="medium">
          Academies
        </ILabel>
        <Icon name="chevron-right" fill="gray" />
        <Heading fontSize="sm" color="primary" fontWeight="medium">
          Registration control
        </Heading>
      </div>
      <TableHeader
        title="registration control"
        totalItems={RegistrationControls.length}
        handleSearch={handleSearch}>
        <Link to={`${url}/add`}>
          <Button>Add new reg control</Button>
        </Link>
      </TableHeader>

      <div className="mt-14">
        {isLoading && <Loader />}
        {isSuccess && RegistrationControls ? (
          <Table<IRegistrationInfo>
            statusColumn="status"
            data={RegistrationControls}
            actions={controlActions}
            uniqueCol={'id'}
            hide={['id']}
          />
        ) : (
          ''
        )}

        {!isLoading && RegistrationControls.length < 1 && <span>No data found</span>}
      </div>

      {/* add reg control popup */}
      <Switch>
        <Route
          exact
          path={`${path}/add`}
          render={() => {
            return (
              <PopupMolecule title="New Registration Control" open onClose={handleClose}>
                <NewRegistrationControl />
              </PopupMolecule>
            );
          }}
        />

        {/* modify reg control */}
        <Route
          exact
          path={`${path}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule title="Update Control" open onClose={handleClose}>
                <UpdateRegControl />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </div>
  );
}
