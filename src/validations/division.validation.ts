import * as yup from 'yup';

export const departSchema = yup.object().shape({
  name: yup.string().required('Department name is required'),
  description: yup.string().required('Department description is required'),
  faculty: yup.string().when('has_faculty', {
    is: (has_faculty: any) => has_faculty === true,
    then: yup.string().required('Faculty is required'),
    otherwise: yup.string(),
  }),
  has_faculty: yup.boolean(),
});

export const facultySchema = yup.object().shape({
  name: yup.string().required('Department name is required'),
  description: yup.string().required('Department description is required'),
});
