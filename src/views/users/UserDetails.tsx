import React from 'react';
import toast from 'react-hot-toast';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../components/Molecules/Popup';
import { Tab, Tabs } from '../../components/Molecules/tabs/tabs';
import ExperienceDetails from '../../components/Organisms/forms/auth/signup/experience/ExperienceDetails';
import UpdateExperience from '../../components/Organisms/forms/auth/signup/experience/UpdateExperience';
import MoreInfo from '../../components/Organisms/forms/auth/signup/more-details/MoreInfo';
import UpdateNextKin from '../../components/Organisms/forms/auth/signup/more-details/UpdateNextKin';
import NewPersonalDocument from '../../components/Organisms/forms/user/NewPersonalDocument';
import { queryClient } from '../../plugins/react-query';
import enrollmentStore from '../../store/administration/enrollment.store';
import usersStore from '../../store/administration/users.store';
import { ParamType } from '../../types';
import { ApproveStudents, StudentApproval } from '../../types/services/enrollment.types';
import UpdateCompleteProfile from '../auth/UpdateCompleteProfile';
import PersonalDocuments from './profile/PersonalDocuments';
import ProfileOverview from './profile/ProfileOverview';
import UpdatePhotoProfile from './profile/UpdatePhotoProfile';

export default function UserDetails() {
  const { id } = useParams<ParamType>();

  const { data: user, isLoading } = usersStore.getUserById(id);
  const { search } = useLocation();
  const intkStud = new URLSearchParams(search).get('intkStud');
  const stat = new URLSearchParams(search).get('stat');
  const { path } = useRouteMatch();

  const history = useHistory();

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
          history.goBack();
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
          history.goBack();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : user?.data.data ? (
        <>
          <div className="flex justify-between">
            <Heading className="py-3" fontWeight="bold" fontSize="2xl">
              {user?.data.data.person?.current_rank?.name || ''}{' '}
              {user?.data.data.first_name + ' ' + user?.data.data.last_name} Profile
            </Heading>
            {intkStud && stat && (
              <div className="flex gap-4">
                {stat === StudentApproval.PENDING ? (
                  <>
                    <Button onClick={() => approveStud([intkStud])}>Approve</Button>
                    <Button styleType="outline" onClick={() => rejectStud([intkStud])}>
                      Reject
                    </Button>
                  </>
                ) : stat === StudentApproval.APPROVED ? (
                  <Button styleType="outline" onClick={() => rejectStud([intkStud])}>
                    Reject
                  </Button>
                ) : (
                  <Button onClick={() => approveStud([intkStud])}>Approve</Button>
                )}
              </div>
            )}
          </div>
          <Switch>
            <Route
              exact
              path={`${path}`}
              render={() => (
                <Tabs>
                  <Tab label="Overview" className="pt-8">
                    <ProfileOverview user={user?.data.data} />
                  </Tab>
                  <Tab label="Performance" className="pt-8">
                    <NoDataAvailable
                      icon="academy"
                      fill={false}
                      showButton={false}
                      title={'User have no performance yet'}
                      description={
                        'This user does not currently have any performance to display'
                      }
                    />
                  </Tab>
                  <Tab label="Log" className="pt-8">
                    <NoDataAvailable
                      icon="academy"
                      fill={false}
                      showButton={false}
                      title={'User have no logs yet'}
                      description={"This user's logs are not currently being recorded"}
                    />
                  </Tab>
                  <Tab label="Personal Documents" className="pt-8">
                    <PersonalDocuments user={user?.data.data} />
                  </Tab>
                </Tabs>
              )}
            />
            <Route
              exact
              path={`${path}/new-personal-doc`}
              render={() => {
                return (
                  <PopupMolecule
                    title="New Personal Document"
                    open
                    onClose={history.goBack}>
                    <NewPersonalDocument personId={user.data.data.person.id + ''} />
                  </PopupMolecule>
                );
              }}
            />
            <Route path={`${path}/edit-compl-prof`} component={UpdateCompleteProfile} />
            <Route
              exact
              path={`${path}/new-experience`}
              render={() => <ExperienceDetails showHeader={false} />}
            />
            <Route
              exact
              path={`${path}/edit-experience/:expId`}
              render={() => <UpdateExperience />}
            />
            <Route
              exact
              path={`${path}/add-next-kin`}
              render={() => <MoreInfo showHeader={false} />}
            />
            <Route
              exact
              path={`${path}/edit-next-kin/:kinid`}
              render={() => <UpdateNextKin />}
            />
            <Route
              exact
              path={`${path}/edit-prof`}
              render={() => (
                <PopupMolecule
                  closeOnClickOutSide={false}
                  title="Upload new profile picture"
                  open={true}
                  onClose={history.goBack}>
                  <UpdatePhotoProfile user={user.data.data} />
                </PopupMolecule>
              )}
            />
          </Switch>
        </>
      ) : (
        <NoDataAvailable
          showButton={false}
          icon="user"
          title={'User not available'}
          description={'Sorry this user is currently not available in the system'}
        />
      )}
    </>
  );
}
