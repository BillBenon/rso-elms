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

  const totals = {
    quizObtained: marks.reduce((partial_sum, a) => partial_sum + a.catObtained, 0),
    quizMax: marks.reduce((partial_sum, a) => partial_sum + a.catMax, 0),

    examObtained: marks.reduce((partial_sum, a) => partial_sum + a.examObtained, 0),
    examMax: marks.reduce((partial_sum, a) => partial_sum + a.examMax, 0),
  };

  return (
    <div className="px-10 py-10 bg-white mx-auto max-w-4xl mt-10 border border-gray-300">
      <div className="flex justify-between">
        <div className="provider">
          <div className="w-20 bg-gray-300 rounded-full mb-5">
            <img
              src="/images/nisslogo.png"
              alt="Institution logo"
              className=" w-20 h-20 object-cover block rounded-full"
            />
          </div>
          <h2 className="text-lg font-bold">{authUser?.academy.institution.name}</h2>
          <h2 className="text-base font-medium py-2 uppercase">
            {authUser?.academy.name}
          </h2>
          <h3 className="text-base font-medium pb-2">Mail: {authUser?.academy.email}</h3>
          <h3 className="text-base font-medium">Tel: {authUser?.academy.phone_number}</h3>
        </div>
        <div className="student">
          <div className=" w-20 mb-5">
            <img
              src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt="Student profile"
              className="block w-20 h-20 object-cover rounded-full"
            />
          </div>
          <h2 className="text-base font-bold ">
            Name:
            <span className="uppercase">
              {`${studentInfo?.data.data.user.first_name} ${studentInfo?.data.data.user.last_name}`}
            </span>
          </h2>
          <h2 className="text-base font-semibold py-2">
            Reg No:{studentInfo?.data.data.reg_number}
          </h2>
          <h2 className="text-base font-medium">{`${classInfo?.data.data.academic_year_program_intake_level.academic_program_level.level.name} - ${classInfo?.data.data.academic_year_program_intake_level.academic_program_level.program.name}`}</h2>
          <h2 className="text-base font-medium py-2">
            {`Class: ${classInfo?.data.data.class_name}`}
          </h2>
          <h2 className="text-base font-medium">
            {classInfo?.data.data.academic_year_program_intake_level.academic_year.name}
          </h2>
        </div>
      </div>
      <h1 className="text-center font-bold underline my-10 text-lg">SCHOOL REPORT</h1>

      {/* new grid */}
      <div className="grid grid-cols-6">
        <div className="col-span-2 border border-black px-3 flex items-center">
          <Heading fontSize="base" fontWeight="semibold">
            Courses
          </Heading>
        </div>
        <div className="col-span-4">
          <Heading
            fontSize="base"
            fontWeight="semibold"
            className="p-3 border border-black text-center">
            TERM ONE
          </Heading>

          <div className="grid grid-cols-3">
            <Heading
              fontSize="base"
              fontWeight="semibold"
              className="p-2 border border-black text-center">
              Cat
            </Heading>
            <Heading
              fontSize="base"
              fontWeight="semibold"
              className="p-2 border border-black text-center">
              Exam
            </Heading>
            <Heading
              fontSize="base"
              fontWeight="semibold"
              className="p-2 border border-black text-center">
              Tot
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
            className="py-2 px-3 border border-black">
            Marks
          </Heading>
        </div>
        <div className="col-span-4 grid grid-cols-6">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <Heading
                fontSize="sm"
                fontWeight="semibold"
                className="p-1 border border-black text-center">
                Obt.
              </Heading>
              <Heading
                fontSize="sm"
                fontWeight="semibold"
                className="p-1 border border-black text-center">
                Max.
              </Heading>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* modules map */}
      {marks.map((m) => (
        <div key={m.moduleId} className="grid grid-cols-3">
          <p className="p-3 text-sm border border-black">{m.moduleName}</p>
          <div className="grid-cols-6 col-span-2 grid">
            <p className="p-3 text-sm border border-black">{m.catObtained}</p>
            <p className="p-3 text-sm border border-black">{m.catMax}</p>
            <p className="p-3 text-sm border border-black">{m.examObtained}</p>
            <p className="p-3 text-sm border border-black">{m.examMax}</p>
            <p className="p-3 text-sm border border-black">
              {m.catObtained + m.examObtained}
            </p>
            <p className="p-3 text-sm border border-black">{m.examMax + m.catMax}</p>
          </div>
        </div>
      ))}
      {/* totals row */}
      <div className="grid grid-cols-3">
        <div>
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="p-3 border border-black">
            Total
          </Heading>
        </div>

        <div className="grid-cols-6 col-span-2 grid">
          <p className="p-3 text-sm border border-black">{totals.quizObtained}</p>
          <p className="p-3 text-sm border border-black">{totals.quizMax}</p>
          <p className="p-3 text-sm border border-black">{totals.examObtained}</p>
          <p className="p-3 text-sm border border-black">{totals.examMax}</p>
          <p className="p-3 text-sm border border-black">
            {totals.quizObtained + totals.examObtained}
          </p>
          <p className="p-3 text-sm border border-black">
            {totals.quizMax + totals.examMax}
          </p>
        </div>
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
          fontWeight="semibold"
          className="col-span-4 py-3 px-6 border border-black text-right">
          {`${
            ((totals.quizObtained + totals.examObtained) /
              (totals.quizMax + totals.examMax) || 0) * 100
          } %`}
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
      <div className="pt-8">
        <div className="grid grid-cols-3 py-6">
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="px-3 py-2 border border-black">
            COMMANDANT
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="px-3 py-2 border border-black">
            CHIEF INSTRUCTOR
          </Heading>
          <Heading
            fontSize="sm"
            fontWeight="semibold"
            className="px-3 py-2 border border-black">
            SENIOR INSTRUCTOR
          </Heading>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 border border-black">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Signature_of_Ann_Miller.svg/800px-Signature_of_Ann_Miller.svg.png"
                alt="signature"
                className="block max-w-full max-h-12"
              />
            </div>
          ))}
        </div>
        <Heading fontSize="sm" fontWeight="semibold">
          Printed by {`${authUser?.first_name} ${authUser?.last_name}`}
        </Heading>
        <div className="text-xs py-2 text-right font-medium">
          {new Date().toDateString()}
        </div>
      </div>
    </div>
  );
}
