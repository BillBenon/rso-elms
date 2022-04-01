import * as yup from 'yup';

import { BloodGroup, SendCommunicationMsg } from '../types/services/user.types';

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const personalDetailsSchema = yup.object().shape({
  first_name: yup.string().required('first name is required'),
  last_name: yup.string().required('last name is required'),
  // phone_number: yup.string().matches(phoneRegExp, 'Invalid phone number'),
  // sex: yup.string().required('gender is required').oneOf(Object.values(GenderStatus)),
  place_of_birth: yup.string(),
  place_of_birth_description: yup.string(),
  // birth_date: yup
  //   .string()
  //   .required('Date of birth is required')
  //   .test(
  //     'date of birth',
  //     'shows that you are not elligible to use the system',
  //     (value) => {
  //       return moment().diff(moment(value), 'years') >= 18;
  //     },
  //   ),
  religion: yup.string(),
  blood_group: yup.string().oneOf(Object.values(BloodGroup)),
  father_names: yup.string().required('names of father/legal guardian are required'),
  mother_names: yup.string().required('names of mother/legal guardian are required'),
  // marital_status: yup.string().oneOf(Object.values(MaritalStatus)),
  spouse_name: yup.string(),
  residence_location_id: yup.string().nullable(),
  place_of_residence: yup.string(),
  // doc_type: yup.string().oneOf(Object.values(DocType)),
  nationality: yup.string(),
});

export const employmentDetailsSchema = yup.object().shape({
  // current_rank_id: yup.string().required('Rank is required'),
  current_rank_id: yup.string(),
  other_rank: yup.string(),
  rank_depart: yup.string(),
  empNo: yup.string().required('Service/Employment number is required'),
  date_of_commission: yup.string(),
  date_of_last_promotion: yup.string(),
  place_of_issue: yup.string(),
  date_of_issue: yup.string(),
});

export const accountDetailsSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  // pin: yup.number(),
  send_communication_msg: yup.string().oneOf(Object.values(SendCommunicationMsg)),
});
