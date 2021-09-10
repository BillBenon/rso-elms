import React, { useState } from 'react';

import { ValueType } from '../../../types';
import { validation } from '../../../utils/validations';
import Stepper from '../../Molecules/Stepper/Stepper';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails';
import NationalDocuments from './NationalDocument';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails';

const SignUpForm = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: 'male',
    dob: '',
    maritalStatus: 'married',
  });

  const personalValidate = {
    touched: false,
    completed: false,
    firstName: (name: string) => validation.nameValidation('First Name', name),
    lastName: (name: string) => validation.nameValidation('Last Name', name),
    email: validation.emailValidation,
    age: validation.dateValidation,
    phone: validation.phoneValidation,
    gender: 'male',
    dob: '',
    maritalStatus: 'married',
  };

  const [nationalDocument, setNationalDocument] = useState({
    nationality: '',
    national_id: '',
    passport: '',
    passport_expiry_date: '',
    language: '',
  });

  const documentValidate = {
    touched: false,
    completed: false,
    nationality: (name: string) => validation.nameValidation('Nationality', name),
    national_id: (name: string) =>
      validation.nameValidation('National Identitification Number', name),
    passport: (name: string) => validation.nameValidation('Passport Number', name),
    passport_expiry_date: validation.dateValidation,
    language: (name: string) => validation.nameValidation('Language', name),
  };

  const [educationDetails, setEducationDetails] = useState({
    school: '',
    level: '',
    section: '',
    start_date: '',
    end_date: '',
  });

  const educationValidate = {
    touched: false,
    completed: false,
    school: (name: string) => validation.nameValidation('School Name', name),
    level: (name: string) => validation.nameValidation('Education Level', name),
    section: (name: string) =>
      validation.nameValidation('Education section/ combination', name),
    start_date: validation.dateValidation,
    end_date: validation.dateValidation,
  };

  const [employmentDetails, setEmploymentDetails] = useState({
    currentRank: '',
    otherRank: '',
    RankDepart: 'Rwanda',
    EmpNo: '',
  });

  const employmentValidate = {
    touched: false,
    completed: false,
    currentRank: (name: string) => validation.nameValidation('The current rank', name),
    otherRank: (name: string) => validation.nameValidation('The other rank', name),
    RankDepart: (name: string) =>
      validation.nameValidation('Current rank department', name),
    EmpNo: (name: string) => validation.nameValidation('Employment number', name),
  };

  const [otherDetails, setOtherDetails] = useState({
    hobbies: [],
    chronicDiseases: '',
    diseaseDescription: '',
  });

  const othersValidate = {
    touched: false,
    completed: false,
    hobbies: (name: string) => validation.nameValidation('Hobbies', name),
    chronicDiseases: (name: string) => validation.nameValidation('Chronic disease', name),
    diseaseDescription: (name: string) =>
      validation.nameValidation('The disease description', name),
  };

  function handleChange(e: ValueType) {
    setNationalDocument((nationalDocument) => ({
      ...nationalDocument,
      [e.name]: e.value,
    }));

    //  setNationalDocument(nationalDocument =>{ ...nationalDocument, [e.name]: e.value})
    // console.log(nationalDocument);

    setNationalDocument((nationalDocument) => ({
      ...nationalDocument,
      [e.name]: e.value,
    }));
  }

  const stepperContent = [
    {
      label: 'Personal Details',
      content: (
        <PersonalDetails
          details={personalDetails}
          setDetails={setPersonalDetails}
          validate={personalValidate}
        />
      ),
      clicked: () => {},
      isError: personalValidate.touched,
      isComplete: personalValidate.completed,
    },
    {
      label: 'National Documents',
      content: (
        <NationalDocuments
          details={nationalDocument}
          setDetails={setNationalDocument}
          validate={documentValidate}
          handleChange={handleChange}
        />
      ),
      clicked: () => {},
      isError: documentValidate.touched,
      isComplete: documentValidate.completed,
    },
    {
      label: 'Education Details',
      content: (
        <EducationDetails
          details={educationDetails}
          setDetails={setEducationDetails}
          validate={educationValidate}
        />
      ),
      clicked: () => {},
      isError: educationValidate.touched,
      isComplete: educationValidate.completed,
    },
    {
      label: 'Employment Details',
      content: (
        <EmploymentDetails
          details={employmentDetails}
          setDetails={setEmploymentDetails}
          validate={employmentValidate}
        />
      ),
      clicked: () => {},
      isError: employmentValidate.touched,
      isComplete: employmentValidate.completed,
    },
    {
      label: 'Other Details',
      content: (
        <OtherDetails
          details={otherDetails}
          setDetails={otherDetails}
          validate={othersValidate}
        />
      ),
      clicked: () => {},
      isError: othersValidate.touched,
      isComplete: othersValidate.completed,
    },
  ];

  const submitStepper = () => {
    console.log('submitted');
  };

  return (
    <Stepper
      stepperContent={stepperContent}
      submitStepper={submitStepper}
      isVertical
      isInline={false}
    />
  );
};

export default SignUpForm;
