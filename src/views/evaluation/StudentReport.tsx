import React from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import { evaluationStore } from '../../store/evaluation/evaluation.store';

export default function StudentReport() {

  interface IParamType {
    levelId: string;
    classId: string;
    studentId: string;
    periodId: string;
  }

  
  const { classId, studentId, periodId } = useParams<IParamType>();

  const { data: studentReport, isLoading } = evaluationStore.getStudentReport(studentId);
  console.log(studentReport);
  return (
    <>
      {isLoading && <Loader />}
      <div>Student Report</div>
    </>
  );
}
