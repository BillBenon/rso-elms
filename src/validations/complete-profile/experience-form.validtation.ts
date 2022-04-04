import * as yup from 'yup';

export const experienceFormSchema = yup.object().shape({
  start_date: yup.string().required('start date is required'),
  end_date: yup.string().required('end date is required'),
  location: yup.string().required('location is required'),
  occupation: yup.string().required('occupation is required'),
  proof: yup.string(),
});
