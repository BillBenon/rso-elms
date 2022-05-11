import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import PopupMolecule from '../../components/Molecules/Popup';
import Table from '../../components/Molecules/table/Table';
import TableHeader from '../../components/Molecules/table/TableHeader';
import AssignRole from '../../components/Organisms/forms/roles/AssignRole';
import ImportUsers from '../../components/Organisms/user/ImportUsers';
import useAuthenticator from '../../hooks/useAuthenticator';
import { enrollmentService } from '../../services/administration/enrollments.service';
import { authenticatorStore } from '../../store/administration';
import academyStore from '../../store/administration/academy.store';
import usersStore from '../../store/administration/users.store';
import { Privileges, SortedContent, ValueType } from '../../types';
import { ActionsType } from '../../types/services/table.types';
import { Student, StudentTypes, UserType } from '../../types/services/user.types';
import { formatStudentTable, formatUserTable } from '../../utils/array';
import { getDropDownOptions } from '../../utils/getOption';
import DeployInstructors from '../DeployInstructors';
import EnrollStudents from '../EnrollStudents';
import ViewUserRole from '../roles/ViewUserRole';

export default function StudentsView() {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { mutateAsync } = authenticatorStore.resetPassword();
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const { user, picked_role } = useAuthenticator();
  const [academyUsers, setAcademyUsers] = useState<SortedContent<Student[]>>();
  const [institutionUsers, setInstitutionUsers] = useState<SortedContent<Student[]>>();
  const [isLoading, setIsLoading] = useState(true);

  const academies = academyStore.getAcademiesByInstitution(
    user?.institution.id.toString() || '',
  );

  const [currentPage, setcurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [selectedAcademy, setSelectedAcademy] = useState('');

  useEffect(() => {
    let users = enrollmentService.getStudentsByAcademyOrderedByRank(selectedAcademy, {
      page: currentPage,
      pageSize,
    });

    users.then((res) => {
      setInstitutionUsers(res.data.data), setIsLoading(false);
    });
  }, [currentPage, pageSize, selectedAcademy]);

  useEffect(() => {
    if (picked_role?.academy_id) {
      let users = enrollmentService.getStudentsByAcademyOrderedByRank(
        picked_role?.academy_id.toString() || '',
        {
          page: currentPage,
          pageSize,
        },
      );

      users.then((res) => {
        setAcademyUsers(res.data.data), setIsLoading(false);
      });
    }
  }, [currentPage, pageSize, picked_role?.academy_id]);

  const [users, setUsers] = useState<StudentTypes[]>([]);

  useEffect(() => {
    setUsers(
      formatStudentTable(academyUsers?.content || institutionUsers?.content || []),
    );
    setTotalElements(academyUsers?.totalElements || 0);
    setTotalPages(academyUsers?.totalPages || 0);
  }, [
    academyUsers?.content,
    academyUsers?.totalElements,
    academyUsers?.totalPages,
    institutionUsers?.content,
  ]);

  let actions: ActionsType<StudentTypes>[] = [];
  actions?.push({
    name: 'View ' + t('Students'),
    handleAction: (id: string | number | undefined) => {
      history.push(`/dashboard/user/${id}/profile`); // go to view user profile
    },
    privilege: Privileges.CAN_ACCESS_USERS,
  });

  actions?.push({
    name: 'Edit ' + t('Students'),
    handleAction: (id: string | number | undefined) => {
      history.push(`/dashboard/users/${id}/edit`); // go to edit user
    },
    privilege: Privileges.CAN_MODIFY_USER,
  });
  actions?.push({
    name: 'Deploy ' + t('Instructor'),
    handleAction: (id: string | number | undefined) => {
      history.push(`${url}/${id}/deploy`); // go to assign role
    },
    privilege: Privileges.CAN_CREATE_USER,
  });

  actions?.push({
    name: 'Enroll ' + t('Students'),
    handleAction: (id: string | number | undefined) => {
      history.push(`${url}/${id}/enroll`); // go to assign role
    },
    privilege: Privileges.CAN_CREATE_USER,
  });
  actions?.push({
    name: 'View Role',
    handleAction: (id: string | number | undefined) => {
      history.push(`${url}/${id}/view-role`); // go to assign role
    },
    privilege: Privileges.CAN_ACCESS_USERS_ROLES,
  });
  actions?.push({
    name: 'Assign Role',
    handleAction: (id: string | number | undefined) => {
      history.push(`${url}/${id}/assign-role`); // go to assign role
    },
    privilege: Privileges.CAN_ASSIGN_ROLE,
  });

  actions?.push({
    name: 'Reset Password',
    handleAction: (id: string | number | undefined) => {
      //call a reset password api
      mutateAsync(id?.toString() || '', {
        onSuccess: () => {
          toast.success('Password reset successfully', { duration: 5000 });
        },
        onError: (error: any) => {
          toast.error(error + '');
        },
      });
    },
    privilege: Privileges.CAN_RESET_USER_PASSWORD,
  });

  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  function handleSearch(_e: ValueType) {
    const value = _e.value + '';
    if (value.length === 0) {
      setUsers(
        formatStudentTable(institutionUsers?.content || academyUsers?.content || []),
      );
      setTotalElements(
        institutionUsers?.totalElements || academyUsers?.totalElements || 0,
      );
      setTotalPages(institutionUsers?.totalPages || academyUsers?.totalPages || 0);
      setValue('');
      return;
    }
    setValue(value);
  }
  const [filter, setFilter] = useState(false);

  const handleClick = () => {
    setFilter(!filter);
  };

  const { data: search } = usersStore.getAllBySearch(value, filter);

  useEffect(() => {
    if (filter && search && search.data.data.content.length > 0) {
      setUsers(formatUserTable(search.data.data.content || []));
      setTotalElements(search.data.data.totalElements || 0);
      setTotalPages(search.data.data.totalPages || 0);
      setFilter(false);
    }
  }, [filter, search]);

  return (
    <div>
      {user?.user_type === UserType.SUPER_ADMIN && (
        <div className="flex items-center gap-4">
          <SelectMolecule
            width="80"
            className=""
            placeholder="Please select academy"
            loading={academies.isLoading}
            value={selectedAcademy}
            handleChange={(e) => {
              setSelectedAcademy(e.value.toString());
            }}
            name={'academy'}
            options={getDropDownOptions({ inputs: academies.data?.data.data || [] })}>
            Academy
          </SelectMolecule>
        </div>
      )}
      <TableHeader
        title={t('Students')}
        totalItems={totalElements}
        handleSearch={handleSearch}
        handleClick={handleClick}>
        <Permission privilege={Privileges.CAN_CREATE_USER}>
          <div className="flex gap-3">
            <Link to={`${url}/import`}>
              <Button styleType="outline">Import {t('Students')}</Button>
            </Link>
            <Link to={`${url}/add/${UserType.STUDENT}`}>
              <Button>New {t('Students')}</Button>
            </Link>
          </div>
        </Permission>
      </TableHeader>

      {!selectedAcademy && user?.user_type === UserType.SUPER_ADMIN ? (
        <NoDataAvailable
          icon="user"
          showButton={false}
          buttonLabel={'Add new student'}
          title={'No ' + t('Students') + ' available'}
          handleClick={() => history.push(`/dashboard/users/add/STUDENT`)}
          description={`There are no ${t(
            'Students',
          )}! Make sure you select a specific academy`}
          privilege={Privileges.CAN_CREATE_USER}
        />
      ) : isLoading ? (
        <Loader />
      ) : users.length <= 0 ? (
        <NoDataAvailable
          icon="user"
          buttonLabel={'Add new student'}
          title={'No ' + t('Students') + ' available'}
          handleClick={() => history.push(`/dashboard/users/add/STUDENT`)}
          description={`There are no ${t('Students')} added into the system yet`}
          privilege={Privileges.CAN_CREATE_USER}
        />
      ) : (
        <Table<StudentTypes>
          statusColumn="status"
          data={users}
          actions={actions}
          statusActions={[]}
          hide={['id', 'user_type', 'ID Card']}
          selectorActions={[]}
          uniqueCol="id"
          rowsPerPage={pageSize}
          totalPages={totalPages}
          currentPage={currentPage}
          onPaginate={(page) => setcurrentPage(page)}
          onChangePageSize={(size) => {
            setcurrentPage(currentPage);
            setPageSize(size);
          }}
        />
      )}

      <Switch>
        <Route
          exact
          path={`${url}/import`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Import students"
              open={true}
              onClose={history.goBack}>
              <ImportUsers userType={UserType.STUDENT} />
            </PopupMolecule>
          )}
        />
        <Route
          exact
          path={`${path}/:id/assign-role`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Assign role"
              open={true}
              onClose={history.goBack}>
              <AssignRole />
            </PopupMolecule>
          )}
        />
        <Route
          exact
          path={`${path}/:id/deploy`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Deploy as an instructor"
              open={true}
              onClose={history.goBack}>
              <DeployInstructors />
            </PopupMolecule>
          )}
        />
        <Route
          exact
          path={`${path}/:id/enroll`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Enroll as a student"
              open={true}
              onClose={history.goBack}>
              <EnrollStudents />
            </PopupMolecule>
          )}
        />
        <Route
          exact
          path={`${path}/:id/view-role`}
          render={() => (
            <PopupMolecule
              closeOnClickOutSide={false}
              title="Roles"
              open={true}
              onClose={history.goBack}>
              <ViewUserRole />
            </PopupMolecule>
          )}
        />
      </Switch>
    </div>
  );
}
