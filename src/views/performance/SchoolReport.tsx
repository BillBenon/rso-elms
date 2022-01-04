import React from 'react';
import { useParams } from 'react-router-dom';

import Heading from '../../components/Atoms/Text/Heading';
import { authenticatorStore } from '../../store/administration';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { getStudentReportInTerm } from '../../store/evaluation/school-report.store';

interface IParamType {
  levelId: string;
  classId: string;
  studentId: string;
  periodId: string;
}

interface IReportTable {
  moduleId: string;
  moduleName: string;
  catObtained: number;
  catMax: number;
  examObtained: number;
  examMax: number;
}

export default function SchoolReport() {
  const authUser = authenticatorStore.authUser().data?.data.data;

  //path params
  const { classId, studentId, periodId } = useParams<IParamType>();

  const { data: classInfo } = classStore.getClassById(classId);
  const { data: studentInfo } = intakeProgramStore.getStudentById(studentId);
  const { data: reportData } = getStudentReportInTerm(studentId, periodId);

  const marks: IReportTable[] = (reportData?.data.data.subject_marks || []).map((sm) => ({
    moduleId: sm.id,
    moduleName: sm.subject.title,
    catObtained: sm.quiz_obtained_marks,
    catMax: sm.quiz_marks,
    examObtained: sm.exam_obtained_marks,
    examMax: sm.exam_marks,
  }));

  return (
    <div className="px-16 py-10 bg-white mx-auto max-w-5xl mt-10">
      <div className="w-20 bg-gray-300 rounded-full">
        <img
          src="/images/nisslogo.png"
          alt="Institution logo"
          className="block w-full h-full rounded-full"
        />
      </div>
      <div className="mt-16 flex justify-between">
        <div className="provider">
          <h2 className="text-lg font-bold">{authUser?.academy.institution.name}</h2>
          <h2 className="text-base font-medium py-2 uppercase">
            {authUser?.academy.name}
          </h2>
          <h3 className="text-base font-medium pb-2">Mail: {authUser?.academy.email}</h3>
          <h3 className="text-base font-medium">Tel: {authUser?.academy.phone_number}</h3>
        </div>
        <div className="student">
          <h2 className="text-base font-bold uppercase">{`${studentInfo?.data.data.user.first_name} ${studentInfo?.data.data.user.last_name}`}</h2>
          <h2 className="text-base font-semibold py-2">
            {studentInfo?.data.data.reg_number}
          </h2>
          <h2 className="text-base font-medium">{`${classInfo?.data.data.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.data.data.academic_year_program_intake_level.academic_program_level.program.name}`}</h2>
          <h2 className="text-base font-medium py-2">
            {`Class: ${classInfo?.data.data.class_name}`}
          </h2>
          <h2 className="text-base font-medium py-2">
            {classInfo?.data.data.academic_year_program_intake_level.academic_year.name}
          </h2>
        </div>
      </div>
      <h1 className="text-center font-bold underline my-10 text-lg">SCHOOL REPORT</h1>
      <div className="grid grid-cols-6">
        <div className="col-span-2" />
        <div className="col-span-4">
          <Heading
            fontSize="base"
            fontWeight="semibold"
            className="p-4 border border-black text-center">
            TERM ONE
          </Heading>
          <div className="grid grid-cols-2">
            <Heading
              fontSize="base"
              fontWeight="semibold"
              className="p-3 border border-black text-center">
              Cat
            </Heading>
            <Heading
              fontSize="base"
              fontWeight="semibold"
              className="p-3 border border-black text-center">
              Exam
            </Heading>
          </div>
        </div>
      </div>
      {/* module and obtained marks title */}
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <Heading
            fontSize="base"
            fontWeight="semibold"
            className="p-4 border border-black text-center">
            Module name
          </Heading>
        </div>
        <div className="col-span-4 grid grid-cols-4">
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="p-3 border border-black text-center">
            Obt.
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="p-3 border border-black text-center">
            Max.
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="p-3 border border-black text-center">
            Obt.
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="p-3 border border-black text-center">
            Max.
          </Heading>
        </div>
      </div>
      {/* modules map */}
      {marks.map((m) => (
        <div key={m.moduleId} className="grid grid-cols-6">
          <div className="col-span-2">
            <Heading
              fontSize="sm"
              fontWeight="normal"
              className="p-3 border border-black">
              {m.moduleName}
            </Heading>
          </div>
          <Heading
            fontSize="sm"
            fontWeight="normal"
            className="p-3 border border-black text-center">
            {m.catObtained}
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="normal"
            className="p-3 border border-black text-center">
            {m.catMax}
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="normal"
            className="p-3 border border-black text-center">
            {m.examObtained}
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="normal"
            className="p-3 border border-black text-center">
            {m.examMax}
          </Heading>
        </div>
      ))}
      {/* totals row */}
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <Heading fontSize="sm" fontWeight="normal" className="p-3 border border-black">
            Total
          </Heading>
        </div>

        <Heading
          fontSize="sm"
          fontWeight="normal"
          className="p-3 border border-black text-center">
          {reportData?.data.data.quiz_obtained_marks}
        </Heading>
        <Heading
          fontSize="sm"
          fontWeight="normal"
          className="p-3 border border-black text-center">
          {reportData?.data.data.quiz_marks}
        </Heading>
        <Heading
          fontSize="sm"
          fontWeight="normal"
          className="p-3 border border-black text-center">
          {reportData?.data.data.exam_obtained_marks}
        </Heading>
        <Heading
          fontSize="sm"
          fontWeight="normal"
          className="p-3 border border-black text-center">
          {reportData?.data.data.exam_marks}
        </Heading>
      </div>
      {/* percentage */}
      <div className="grid grid-cols-6">
        <Heading
          fontSize="sm"
          fontWeight="semibold"
          className="p-3 col-span-2 border border-black">
          Percentage
        </Heading>
        <Heading
          fontSize="sm"
          fontWeight="normal"
          className="col-span-4 py-3 px-6 border border-black text-right">
          {reportData?.data.data
            ? (reportData?.data.data.exam_obtained_marks +
                reportData?.data.data.quiz_obtained_marks) /
              (reportData.data.data.exam_marks + reportData.data.data.quiz_marks)
            : 0}
          %
        </Heading>
      </div>
      {/* Student position */}
      <div className="grid grid-cols-6">
        <Heading
          fontSize="sm"
          fontWeight="semibold"
          className="p-3 col-span-2 border border-black">
          Position
        </Heading>
        <Heading
          fontSize="sm"
          fontWeight="normal"
          className="col-span-4 py-3 px-6 border border-black text-right">
          {reportData?.data.data.position}
        </Heading>
      </div>
      {/* Digital signature */}
      <div className="pt-14">
        <Heading fontSize="lg" fontWeight="semibold">
          Reviewed by {`${authUser?.first_name} ${authUser?.last_name}`}
        </Heading>
      </div>
    </div>
  );
}
