import * as yup from 'yup';

export const intakeInfoSchema = yup.object().shape({
  title: yup.string().required('Intake title is required'),
  total_num_students: yup.number().min(1),
});

export const intakeStatusSchema = yup.object().shape({
  expected_start_date: yup.string().required('Intake expected start date is required'),
  expected_end_date: yup.string().required('Intake expected end date is required'),
  period_type: yup.string().required('Intake period type must be specified'),
  intake_status: yup.string().required('intake status must be specified'),
});
