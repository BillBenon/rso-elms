import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SignupHeader from '../../components/Molecules/SignupHeader';
import Stepper, { StepperProp } from '../../components/Molecules/Stepper/Stepper';
import AccountDetails from '../../components/Organisms/forms/auth/signup/more-details/AccountDetails';
import EmploymentDetails from '../../components/Organisms/forms/auth/signup/personal/EmploymentDetails';
import FamilyDetails from '../../components/Organisms/forms/auth/signup/personal/FamilyDetails';
import NationalDocuments from '../../components/Organisms/forms/auth/signup/personal/NationalDocument';
import PersonalDetails from '../../components/Organisms/forms/auth/signup/personal/PersonalDetails';
import usersStore from '../../store/users.store';
import { Page, ValueType } from '../../types';
import {
  DocType,
  GenderStatus,
  MaritalStatus,
  PersonInfo,
  UserInfo,
} from '../../types/services/user.types';

interface PersonDetail
  extends Pick<
    PersonInfo,
    | 'first_name'
    | 'last_name'
    | 'phone_number'
    | 'sex'
    | 'place_of_birth'
    | 'place_of_birth_description'
    | 'birth_date'
    | 'religion'
    | 'blood_group'
  > {}

interface FamilyDetail
  extends Pick<
    PersonInfo,
    'father_names' | 'mother_names' | 'marital_status' | 'spouse_name'
  > {}

interface NationalDocument
  extends Pick<
    PersonInfo,
    | 'nationality'
    | 'doc_type'
    | 'nid'
    | 'residence_location_id'
    | 'place_of_residence'
    | 'document_expire_on'
    | 'languages'
  > {}

interface EmploymentDetail
  extends Pick<
    PersonInfo,
    | 'current_rank'
    | 'other_rank'
    | 'rank_depart'
    | 'date_of_commission'
    | 'date_of_last_promotion'
  > {}

interface AccountDetail extends Pick<UserInfo, 'username' | 'pin'> {
  confirm_password: string;
}

function Signup() {
  // const user = usersStore.getUserById(props.location.state.detail);

  // declare states for each state
  const [personalDetails, setPersonalDetails] = useState<PersonDetail>({
    first_name: '',
    last_name: '',
    phone_number: '',
    sex: GenderStatus.MALE,
    place_of_birth: '',
    place_of_birth_description: '',
    birth_date: '',
    religion: '',
    blood_group: '',
  });

  const [familyDetails, setFamilyDetails] = useState<FamilyDetail>({
    father_names: '',
    mother_names: '',
    marital_status: MaritalStatus.MARRIED,
    spouse_name: '',
  });

  const [nationalDocuments, setNationalDocuments] = useState<NationalDocument>({
    nationality: 'rw',
    doc_type: DocType.NID,
    nid: '',
    residence_location_id: 0,
    place_of_residence: '',
    document_expire_on: '',
    languages: '',
  });

  const [employmentDetails, setEmploymentDetails] = useState<EmploymentDetail>({
    current_rank: '',
    other_rank: '',
    rank_depart: 'Rwanda',
    // emp_no: '',
    date_of_commission: '',
    date_of_last_promotion: '',
  });

  const [accountDetails, setAccountDetails] = useState<AccountDetail>({
    username: '',
    pin: '',
    confirm_password: '',
  });

  // let person_detail: Partial<PersonDetail>

  // useEffect(() => {
  //   user.data && user.data.data.data && (
  //     person_detail = pick<PersonDetail>(user.data.data.data.person, [
  //       'first_name',
  //       'last_name',
  //       'phone_number',
  //       'sex',
  //       'place_of_birth',
  //       'place_of_birth_description',
  //       'birth_date',
  //       'religion',
  //       'blood_group',
  //     ])

  //     setPersonalDetails({ ...person_detail })
  //   )
  // }, [user]);

  //handle change
  const handleChange = (e: ValueType, page: Page) => {
    page === 'personalDetails'
      ? setPersonalDetails({ ...personalDetails, [e.name]: e.value })
      : page === 'familyDetails'
      ? setFamilyDetails({ ...familyDetails, [e.name]: e.value })
      : page === 'nationalDocuments'
      ? setNationalDocuments({ ...nationalDocuments, [e.name]: e.value })
      : page === 'employmentDetails'
      ? setEmploymentDetails({ ...employmentDetails, [e.name]: e.value })
      : page === 'accountDetails'
      ? setAccountDetails({ ...accountDetails, [e.name]: e.value })
      : '';
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let newStepper = {
      ...stepperContent,
      currentStep: currentStep,
    };

    setStepperContent(newStepper);
  }, [currentStep]);

  useEffect(() => {
    let newStepper = {
      ...stepperContent,
      currentStep: completeStep,
      completeStep: completeStep,
    };

    setStepperContent(newStepper);
  }, [completeStep]);

  const nextStep = (isComplete: boolean) => {
    setCurrentStep((currentStep) => currentStep + 1);
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
  };

  const saveInfo = (isComplete: boolean) => {
    if (isComplete) setCompleteStep((completeStep) => completeStep + 1);
    // save contact info
    history.push('/register/experience');
  };

  const prevStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const navigateToStepHandler = (index: number) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  const initialData: StepperProp = {
    currentStep: 0,
    completeStep: 0,
    content: [
      {
        label: 'Personal details',
        content: (
          <PersonalDetails
            isVertical
            details={personalDetails}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'Family details',
        content: (
          <FamilyDetails
            isVertical
            details={familyDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'National documents',
        content: (
          <NationalDocuments
            isVertical
            details={nationalDocuments}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      {
        label: 'Employment details',
        content: (
          <EmploymentDetails
            isVertical
            details={employmentDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        ),
      },
      // {
      //   label: 'Other details',
      //   content: (
      //     <OtherDetails
      //       isVertical
      //       details={otherDetails}
      //       handleChange={handleChange}
      //       prevStep={prevStep}
      //       nextStep={saveInfo}
      //     />
      //   ),
      // },
      {
        label: 'Account details',
        content: (
          <AccountDetails
            isVertical
            details={accountDetails}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={saveInfo}
          />
        ),
      },
    ],
  };
  const [stepperContent, setStepperContent] = useState<StepperProp>(initialData);

  return (
    <div className="bg-main p-8 md:px-20 md:py-14">
      <SignupHeader />
      <Stepper
        stepperContent={stepperContent}
        isVertical
        navigateToStepHandler={navigateToStepHandler}
      />
    </div>
  );
}

export default Signup;
