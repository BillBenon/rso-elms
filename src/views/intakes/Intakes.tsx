import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import TableHeader from '../../components/Molecules/table/TableHeader';
import Tooltip from '../../components/Molecules/Tooltip';
import NewIntake from '../../components/Organisms/intake/NewIntake';
import UpdateIntake from '../../components/Organisms/intake/UpdateIntake';
import { authenticatorStore } from '../../store';
import { intakeStore } from '../../store/intake.store';
import registrationControlStore from '../../store/registrationControl.store';
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
  const { data: userInfo } = authenticatorStore.authUser();

  const history = useHistory();
  const { url } = useRouteMatch();
  const { search } = useLocation();
  const registrationControlId = new URLSearchParams(search).get('regId');

  const {
    data: regControl,
    refetch,
    isLoading: regLoading,
    isSuccess: regSuccess,
  } = registrationControlStore.fetchRegControlById(registrationControlId!, false);

  if (registrationControlId && !regSuccess && !regLoading) refetch();

  const {
    isSuccess,
    isError,
    data,
    isLoading,
    refetch: refetchIntakes,
  } = intakeStore.getIntakesByAcademy(
    registrationControlId || userInfo?.data.data.academy.id.toString()!,
    !!registrationControlId,
  );

  useEffect(() => {
    if (isSuccess && data?.data) {
      let loadedIntakes: CommonCardDataType[] = [];
      data?.data.data.forEach((intake) => {
        let cardData: CommonCardDataType = {
          code: intake.code.toUpperCase(),
          description: intake.description,
          title: intake.title || `------`,
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

  function regControlName() {
    return `${moment(regControl?.data.data.expected_start_date).format(
      'MMM D YYYY',
    )} - ${moment(regControl?.data.data.expected_end_date).format('MMM D YYYY')}`;
  }

  function intakeCreated() {
    refetchIntakes();
    history.goBack();
  }

  return (
    <div>
      <BreadCrumb list={list} />
      <TableHeader
        title={`${registrationControlId ? regControlName() : 'Intakes'}`}
        totalItems={
          registrationControlId ? `${intakes.length} intakes` : `${intakes.length}`
        }
        handleSearch={handleSearch}>
        {registrationControlId && (
          <Link
            to={
              !registrationControlId
                ? `${url}/${registrationControlId}/add-intake`
                : `${url}/${registrationControlId}/add-intake?regId=${registrationControlId}`
            }>
            <Button>Add Intake</Button>
          </Link>
        )}
      </TableHeader>

      <section className="flex flex-wrap justify-start gap-4 mt-2">
        {intakes.map((intake, index) => (
          <div key={intake.code + Math.random() * 10} className="p-1 mt-3">
            <Tooltip
              key={intake.code + Math.random() * 10}
              trigger={
                <div className="p-1 mt-3">
                  <CommonCardMolecule data={intake} />
                </div>
              }
              open>
              <div className="w-96">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Heading color="txt-secondary" fontSize="sm">
                      Total Students Enroled
                    </Heading>
                    <Heading fontSize="sm" fontWeight="semibold">
                      {data?.data.data[index].total_num_students || 0}
                    </Heading>
                  </div>
                </div>

                <div>
                  <Link
                    className="outline-none"
                    to={`/dashboard/programs?intakeId=${data?.data.data[index].id}`}>
                    <Button styleType="text">View programs</Button>
                  </Link>
                </div>
                <div className="mt-4 space-x-4">
                  <Link
                    to={
                      !registrationControlId
                        ? `${url}/${data?.data.data[index].id}/edit`
                        : `${url}/${data?.data.data[index].id}/edit?regId=${registrationControlId}`
                    }>
                    <Button>Edit Intake</Button>
                  </Link>
                  <Button styleType="outline">Change Status</Button>
                </div>
              </div>
            </Tooltip>
          </div>
        ))}

        {isLoading && <Loader />}

        {!isLoading && intakes && intakes.length <= 0 && (
          <NoDataAvailable
            buttonLabel="Add new Intake"
            title={
              registrationControlId
                ? 'No intake available in this reg Control'
                : 'No intake available'
            }
            handleClick={() => {
              if (registrationControlId)
                history.push(
                  `${url}/${registrationControlId}/add-intake?regId=${registrationControlId}`,
                );
              else history.push(`${url}/${registrationControlId}/add-intake`);
            }}
            description="And the web just isn't the same without you. Lets get you back online!"
          />
        )}
      </section>

      <Switch>
        {/* add intake to reg control */}
        <Route
          exact
          path={`${url}/:id/add-intake`}
          render={() => {
            return (
              <PopupMolecule
                closeOnClickOutSide={false}
                title="New intake"
                open
                onClose={handleClose}>
                <NewIntake handleSuccess={intakeCreated} />
              </PopupMolecule>
            );
          }}
        />
        <Route
          exact
          path={`${url}/:id/edit`}
          render={() => {
            return (
              <PopupMolecule
                closeOnClickOutSide={false}
                title="Update intake"
                open
                onClose={handleClose}>
                <UpdateIntake handleSuccess={handleClose} />
              </PopupMolecule>
            );
          }}
        />
        ;
      </Switch>
    </div>
  );
}
