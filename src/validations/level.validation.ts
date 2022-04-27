import * as yup from 'yup';

export const levelSchema = yup.object().shape({
  name: yup.string().required('level name is required'),
  description: yup.string().required('level description is required'),
  flow: yup.number().required('level flow is required').min(1),
});

export const programLevelSchema = yup.object().shape({
  incharge_id: yup.string().required('Incharge is required'),
  academic_year_id: yup.string().required('Academic year is required'),
  planed_start_on: yup.string().required('Planed start on is required'),
  planed_end_on: yup.string().required('Planed end on is required'),
});

export const periodSchema = yup.object().shape({
  planed_start_on: yup.string().required('Planned start date is required'),
  planed_end_on: yup.string().required('Planned end date is required'),
  status: yup.string().required('status is required'),
});

export const classSchema = yup.object().shape({
  class_group_type: yup.string().required('class group type is required'),
  class_name: yup.string().required('class name is required'),
  instructor_class_in_charge_id: yup
    .string()
    .required('an instructor in charge is required'),
  instructor_class_in_charge_two_id: yup
    .string()
    .required('an instructor in charge backup 1 is required'),
  class_representative_one_id: yup
    .string()
    .required('a class representative is required'),
});
