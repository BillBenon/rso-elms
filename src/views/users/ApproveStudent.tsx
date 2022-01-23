import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Table from '../../components/Molecules/table/Table';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import useAuthenticator from '../../hooks/useAuthenticator';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { Privileges } from '../../types';
import { ApproveStudents, StudentApproval } from '../../types/services/enrollment.types';
import { IntakeProgParam } from '../../types/services/intake-program.types';
import { AcademyUserType } from '../../types/services/user.types';
import { titleCase } from '../../utils/getOption';

interface AcademyUser extends AcademyUserType {
  user_id: string;
}

function ApproveStudent() {
  const history = useHistory();
  const { intakeProg } = useParams<IntakeProgParam>();
  const [unselectAll, setUnselectAll] = useState(false);
  const { data: studentProg, isLoading } =
    intakeProgramStore.getStudentsByIntakeProgram(intakeProg);
  const [students, setStudents] = useState<AcademyUser[]>([]);
  const { user } = useAuthenticator();
  const [privileges, setPrivileges] = useState<string[]>();
  useEffect(() => {
    const _privileges = user?.user_roles
      ?.filter((role) => role.id === 1)[0]
      .role_privileges?.map((privilege) => privilege.name);
    if (_privileges) setPrivileges(_privileges);
  }, [user]);
  useEffect(() => {
    let pushedStud: AcademyUser[] = [];
    studentProg?.data.data?.map((stud) => {
      let { id, username, first_name, last_name, email, person, user_type } =
        stud.student.user;
      let student: AcademyUser = {
        id: stud.id,
        user_id: id + '',
        username: username,
        'full name': first_name + ' ' + last_name,
        email: email,
        'ID Card': person && person.nid,
        user_type: user_type,
        status: stud.enrolment_status,
      };
      pushedStud.push(student);
    });

    setStudents(pushedStud);
  }, [studentProg?.data.data]);

  let pendingStud = students.filter((user) => user.status == StudentApproval.PENDING);
  let approvedStud = students.filter((user) => user.status == StudentApproval.APPROVED);
  let rejectedStud = students.filter((user) => user.status == StudentApproval.REJECTED);

  const { mutateAsync } = enrollmentStore.approveStudent();

  function approveStud(data?: string[]) {
    data?.map((st_id) => {
      let newStudent: ApproveStudents = {
        intake_program_student_id: parseInt(st_id),
        status: StudentApproval.APPROVED,
      };

      mutateAsync(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramId']);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    });
  }

  function rejectStud(data?: string[]) {
    data?.map((st_id) => {
      let newStudent: ApproveStudents = {
        intake_program_student_id: parseInt(st_id),
        status: StudentApproval.REJECTED,
      };

      mutateAsync(newStudent, {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries(['students/intakeProgramId']);
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    });
  }

  // const studentActions = [
  //   {
  //     name: 'View Student',
  //     handleAction: (id: string | number | undefined) => {
  //       history.push(`/dashboard/users/${id}/profile`); // go to view user profile
  //     },
  //   },
  // ];

  return (
    <>
      <Tabs onTabChange={() => setUnselectAll(true)}>
        {Object.keys(StudentApproval).map((stud) => (
          <Tab key={stud} className="py-3" label={titleCase(stud)}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="pt-2">
                {(stud === StudentApproval.PENDING
                  ? pendingStud.length
                  : stud === StudentApproval.APPROVED
                  ? approvedStud.length
                  : rejectedStud.length) <= 0 ? (
                  <NoDataAvailable
                    icon="user"
                    buttonLabel="Add new student"
                    showButton={false}
                    title={'No students available'}
                    handleClick={() => history.push(`/dashboard/users/add`)}
                    description="And the web just isnt the same without you. Lets get you back online!"
                  />
                ) : (
                  <Table<AcademyUser>
                    statusColumn="status"
                    data={
                      stud === StudentApproval.PENDING
                        ? pendingStud
                        : stud === StudentApproval.APPROVED
                        ? approvedStud
                        : rejectedStud
                    }
                    actions={
                      privileges?.includes(Privileges.CAN_ACCESS_PROFILE)
                        ? [
                            {
                              name: 'View Profile',
                              handleAction: (id: string | number | undefined) => {
                                stud === StudentApproval.PENDING
                                  ? history.push({
                                      pathname: `/dashboard/users/${
                                        pendingStud.find((st) => st.id === id)?.user_id
                                      }/profile`,
                                      search: `?intkStud=${id}&stat=${StudentApproval.PENDING}`,
                                    })
                                  : stud === StudentApproval.APPROVED
                                  ? history.push({
                                      pathname: `/dashboard/users/${
                                        approvedStud.find((st) => st.id === id)?.user_id
                                      }/profile`,
                                      search: `?intkStud=${id}&stat=${StudentApproval.APPROVED}`,
                                    })
                                  : history.push({
                                      pathname: `/dashboard/users/${
                                        rejectedStud.find((st) => st.id === id)?.user_id
                                      }/profile`,
                                      search: `?intkStud=${id}&stat=${StudentApproval.REJECTED}`,
                                    });
                              },
                            },
                          ]
                        : undefined
                    }
                    selectorActions={
                      privileges?.includes(Privileges.CAN_MODIFY_STUDENT_APPROVAL)
                        ? stud === StudentApproval.PENDING
                          ? [
                              { name: 'Approve Students', handleAction: approveStud },
                              { name: 'Reject', handleAction: rejectStud },
                            ]
                          : stud === StudentApproval.APPROVED
                          ? [{ name: 'Reject', handleAction: rejectStud }]
                          : [{ name: 'Approve Students', handleAction: approveStud }]
                        : undefined
                    }
                    // actions={studentActions}
                    hide={['id', 'user_type', 'user_id']}
                    uniqueCol="id"
                    unselectAll={unselectAll}
                  />
                )}
              </div>
            )}
          </Tab>
        ))}
      </Tabs>
    </>
  );
}

export default ApproveStudent;
