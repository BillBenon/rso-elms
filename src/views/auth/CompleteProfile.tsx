import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import CompleteProfileHeader from '../../components/Molecules/CompleteProfileHeader';
import Stepper from '../../components/Molecules/Stepper/Stepper';
import AccountDetails from '../../components/Organisms/forms/auth/signup/personal/AccountDetails';
import EmploymentDetails from '../../components/Organisms/forms/auth/signup/personal/EmploymentDetails';
import PersonalDetails from '../../components/Organisms/forms/auth/signup/personal/PersonalDetails';
import usersStore from '../../store/administration/users.store';
import {
  DocType,
  EducationLevel,
  GenderStatus,
  MaritalStatus,
  ProfileStatus,
  SendCommunicationMsg,
  UpdateUserInfo,
  UserInfo,
  UserType,
} from '../../types/services/user.types';
import {
  getLocalStorageData,
  removeLocalStorageData,
  setLocalStorageData,
} from '../../utils/getLocalStorageItem';
import SupAdminProfile from './SupAdminProfile';

function CompleteProfile() {
  const [personalInfo, setPersonalInfo] = useState<UpdateUserInfo>({
    place_of_residence: '',
    send_communication_msg: SendCommunicationMsg.EMAIL,
    person: '',
    academic_program_level_id: '',
    academy_id: '',
    // academy_name: '',
    birth_date: '',
    doc_type: DocType.NID,
    education_level: EducationLevel.BACHELOR,
    email: '',
    first_name: '',
    id: '',
    intake_program_id: '',
    last_name: '',
    marital_status: MaritalStatus.SINGLE,
    nid: '',
    // password: '',
    person_id: '',
    phone: '',
    sex: GenderStatus.MALE,
    user_type: UserType.STUDENT,
    username: '',
    profile_status: ProfileStatus.COMPLETD,
    // acdemic_year_id: '',
    activation_key: '',
    blood_group: '',
    current_rank_id: '',
    date_of_commission: '',
    date_of_issue: '',
    date_of_last_promotion: '',
    // deployed_on: '',
    // deployment_number: '',
    document_expire_on: '',
    emp_no: '',
    father_names: '',
    // institution_id: '',
    mother_names: '',
    other_rank: '',
    password_reset_period_in_days: 0,
    place_of_birth: '',
    place_of_birth_description: '',
    // place_of_birth_id: '',
    place_of_issue: '',
    rank_depart: '',
    reset_date: '',
    residence_location_id: null,
    spouse_name: '',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  let foundUser: UserInfo = getLocalStorageData('user');
  if (!foundUser.id) {
    history.push('/login/search');
    return <></>;
  }
  const user = usersStore.getUserById(foundUser.id.toString());
  useEffect(() => {
    const userInfo = user.data?.data.data;
    // const deployedUser = userInfo?.person.doc_type === null;

    userInfo &&
      setPersonalInfo({
        academic_program_level_id: '',
        academy_id: userInfo.academy?.id || '',
        activation_key: '',
        id: userInfo.id.toString(),
        intake_program_id: '',
        password_reset_period_in_days: userInfo.password_reset_period_in_days,
        person_id: userInfo.person.id.toString(),
        reset_date: userInfo.reset_date,
        profile_status:
          userInfo.profile_status == null
            ? ProfileStatus.INCOMPLETE
            : userInfo.profile_status,
        residence_location_id: null,
        user_type: userInfo.user_type,
        doc_type: userInfo.person ? userInfo.person.doc_type : DocType.NID,
        nid: userInfo.person ? userInfo.person.nid : '',
        phone: userInfo.person ? userInfo.person.phone_number : '',
        email: userInfo.email,
        place_of_residence: '',
        send_communication_msg:
          userInfo.send_communication_msg == null
            ? SendCommunicationMsg.SMS
            : userInfo.send_communication_msg,
        person: userInfo.person,
        // academy_name: userInfo.academy ? userInfo.academy.name : '',
        birth_date: userInfo.person.birth_date,
        education_level:
          userInfo.person.education_level == null
            ? EducationLevel.BACHELOR
            : userInfo.person.education_level,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        marital_status:
          userInfo.person.marital_status == null
            ? MaritalStatus.SINGLE
            : userInfo.person.marital_status,
        // password: userInfo.password,
        sex: userInfo.person == null ? GenderStatus.MALE : userInfo.person.sex,
        username: userInfo.username,
        // acdemic_year_id: userInfo.acdemic_year_id,
        blood_group: userInfo.person ? userInfo.person.blood_group : '',
        current_rank_id: userInfo.person ? userInfo.person.current_rank_id : '',
        date_of_commission: userInfo.person ? userInfo.person.date_of_commission : '',
        date_of_issue: userInfo.person ? userInfo.person.date_of_issue : '',
        date_of_last_promotion: userInfo.person
          ? userInfo.person.date_of_last_promotion
          : '',
        // deployed_on: userInfo.person ? userInfo.person.deployed_on : '',
        // deployment_number: userInfo.person ? userInfo.person.deployment_number : '',
        document_expire_on: userInfo.person ? userInfo.person.document_expire_on : '',
        emp_no: userInfo.person ? userInfo.person.empNo : '',
        father_names: userInfo.person ? userInfo.person.father_names : '',
        mother_names: userInfo.person ? userInfo.person.mother_names : '',
        other_rank: userInfo.person ? userInfo.person.other_rank : '',
        place_of_birth: userInfo.person ? userInfo.person.place_of_birth : '',
        place_of_birth_description: userInfo.person
          ? userInfo.person.place_of_birth_description
          : '',
        // place_of_birth_id: userInfo.person ? userInfo.person.place_of_birth_id : '',
        place_of_issue: userInfo.person ? userInfo.person.place_of_issue : '',
        rank_depart: userInfo.person ? userInfo.person.rank_depart : '',
        spouse_name: userInfo.person ? userInfo.person.spouse_name : '',
        // institution_id: userInfo.institution_id,
      });
  }, [user.data]);

  useEffect(() => {
    let data: UpdateUserInfo = getLocalStorageData('user');
    let person = { ...personalInfo };

    Object.keys(person).map((val) => {
      //@ts-ignore
      if (!person[val]) person[val] = '';
    });

    setLocalStorageData('user', { ...data, person });
  }, [personalInfo]);

  useEffect(() => {
    return () => {
      removeLocalStorageData('user');
    };
  }, []);

  const { mutateAsync } = usersStore.updateUser();

  async function saveInfo(isComplete: boolean) {
    let userFromLocalStorage: UpdateUserInfo = getLocalStorageData('user');

    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    if (personalInfo) {
      await mutateAsync(
        {
          ...userFromLocalStorage,
          profile_status: ProfileStatus.COMPLETD,
          doc_type: userFromLocalStorage.doc_type,
          nid: userFromLocalStorage.person.id,
          birth_date: personalInfo.birth_date,
        },
        {
          onSuccess() {
            toast.success(
              'personal information successfully updated. You need to login to continue',
              {
                duration: 1200,
              },
            );
            setTimeout(() => {
              localStorage.clear();
              history.push('/login');
            }, 900);
          },
          onError(error: any) {
            toast.error(error.response.data.message);
          },
        },
      );
    }
  }
  const nextStep = (isComplete: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="bg-main p-8 md:px-24 md:py-14">
      <CompleteProfileHeader />
      {foundUser.user_type === UserType.SUPER_ADMIN ? (
        <>
          <Stepper
            isDisabled={false}
            isVertical
            currentStep={currentStep}
            completeStep={completeStep}
            navigateToStepHandler={navigateToStepHandler}>
            <SupAdminProfile
              fetched_id={foundUser.id.toString()}
              display_label="Super Profile"
              isVertical
              nextStep={nextStep}
            />
            <PersonalDetails
              fetched_id={foundUser.id.toString()}
              display_label="Personal details"
              isVertical
              nextStep={nextStep}
            />
            <EmploymentDetails
              fetched_id={foundUser.id.toString()}
              display_label="Employment details"
              isVertical
              prevStep={prevStep}
              nextStep={nextStep}
            />
            <AccountDetails
              fetched_id={foundUser.id.toString()}
              display_label="Account details"
              isVertical
              prevStep={prevStep}
              nextStep={saveInfo}
            />
          </Stepper>
        </>
      ) : (
        <>
          <Stepper
            isDisabled={false}
            isVertical
            currentStep={currentStep}
            completeStep={completeStep}
            navigateToStepHandler={() => {}}>
            <PersonalDetails
              fetched_id={foundUser.id.toString()}
              display_label="Personal details"
              isVertical
              nextStep={nextStep}
            />
            <EmploymentDetails
              fetched_id={foundUser.id.toString()}
              display_label="Employment details"
              isVertical
              prevStep={prevStep}
              nextStep={nextStep}
            />
            <AccountDetails
              fetched_id={foundUser.id.toString()}
              display_label="Account details"
              isVertical
              prevStep={prevStep}
              nextStep={saveInfo}
            />
          </Stepper>
        </>
      )}
    </div>
  );
}

export default CompleteProfile;
