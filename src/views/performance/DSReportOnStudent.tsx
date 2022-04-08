import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import Tiptap from '../../components/Molecules/editor/Tiptap';
import usePickedRole from '../../hooks/usePickedRole';
import academyStore from '../../store/administration/academy.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { Privileges } from '../../types';

interface DSRParamType {
  studentId: string;
}

const areaAssess = [
  {
    area: 'Preparation and Organization',
    hpm: 2.5,
    ob: 1.5,
  },
  {
    area: 'Foresight and Planning Ability',
    hpm: 2.5,
    ob: 1.5,
  },
  {
    area: 'Participation and Contribution',
    hpm: 5,
    ob: 4,
  },
  {
    area: 'Understanding of the Concepts',
    hpm: 10,
    ob: 7,
  },
  {
    area: 'Expression and Confidence',
    hpm: 5,
    ob: 3,
  },
  {
    area: 'Application of theory to prac situation',
    hpm: 10,
    ob: 8,
  },
  {
    area: 'Will/Determination/Zeal/Eagerness to learn (Is the student willing to learn, did he/she put in as much effort as possible, is the student eager to acquire as much as he/she can or is just passing time etc……)',
    hpm: 5,
    ob: 5,
  },
];

export default function DSReportOnStudent() {
  const [isPrinting, setisPrinting] = useState(false);
  const report = useRef(null);

  const picked_role = usePickedRole();
  const { data: role_academy } = academyStore.getAcademyById(
    picked_role?.academy_id + '',
  );
  let elements = document.getElementsByClassName('reportHide');
  const handlePrint = useReactToPrint({
    content: () => report.current,
    bodyClass: 'bg-white',
    documentTitle: 'student-end-term-report',
    onBeforeGetContent: () => setisPrinting(true),
    onAfterPrint: () => setisPrinting(false),
  });
  const { studentId } = useParams<DSRParamType>();
  const { data: studentInfo } = intakeProgramStore.getStudentById(studentId);

  return (
    <div className="max-w-4xl">
      <div className="text-right mb-5">
        <Permission privilege={Privileges.CAN_DOWNLOAD_REPORTS}>
          <Button
            disabled={isPrinting}
            onClick={() => {
              for (const el of elements) {
                el.classList.add('hidden');
              }

              handlePrint();

              for (const el of elements) {
                el.classList.remove('hidden');
              }
            }}>
            Download form
          </Button>
        </Permission>
      </div>
      <div
        ref={report}
        className="px-10 py-10 bg-white mx-auto max-w-4xl border border-gray-300 print:border-none">
        <div className="provider">
          <Heading
            fontWeight="semibold"
            fontSize="lg"
            className="text-center underline uppercase">
            {role_academy?.data.data.name}
          </Heading>
          <Heading
            fontWeight="semibold"
            fontSize="lg"
            className="text-center underline uppercase pt-2">
            EX KAZA IBIRINDIRO
          </Heading>
        </div>
        <Heading
          fontWeight="semibold"
          fontSize="base"
          className="text-center underline my-8">
          REPORT ON STUDENT OFFICERS
        </Heading>
        {/* Student particulars */}
        <div className="part-one">
          <Heading fontSize="base" fontWeight="semibold">
            1. <span className="pl-8">Students Particulars</span>
          </Heading>
          <div className="grid grid-cols-3 py-8">
            <div className="border border-black py-1 px-2">CODE No</div>
            <div className="border border-black py-1 px-2 uppercase">Rank</div>
            <div className="border border-black py-1 px-2 uppercase">Names</div>
            <div className="border border-black py-1 px-2">
              {studentInfo?.data.data.reg_number || ''}
            </div>
            <div className="border border-black py-1 px-2">
              {studentInfo?.data.data.user.person.current_rank.name || ''}
            </div>
            <div className="border border-black py-1 px-2 capitalize">
              {studentInfo?.data.data.user.last_name || ''}{' '}
              {studentInfo?.data.data.user.first_name || ''}
            </div>
          </div>
        </div>
        {/* areas to assess */}
        <div className="part-two">
          <Heading fontSize="base" fontWeight="semibold">
            2. <span className="pl-8">Areas to Assess</span>
          </Heading>
          <div className="grid grid-cols-8 py-8">
            <div className="border border-black py-1 px-2 uppercase font-semibold">
              SER
            </div>
            <div className="border border-black py-1 px-2 uppercase col-span-5 font-semibold">
              Area of assessment
            </div>
            <div className="border border-black py-1 px-2 uppercase font-semibold">
              Highest score
            </div>
            <div className="border border-black py-1 px-2 uppercase font-semibold">
              Awarded marks
            </div>
            {areaAssess.map((item, i) => (
              <>
                <div className="border border-black py-1 px-2">
                  {(i + 1 + 9).toString(36).toLowerCase()}
                </div>
                <div className="border border-black py-1 px-2 col-span-5">
                  {item.area}
                </div>
                <div className="border border-black py-1 px-2">{item.hpm}</div>
                <div className="border border-black py-1 px-2">{item.ob}</div>
              </>
            ))}
            {/* total */}
            <div className="px-4 py-2 text-sm border border-black uppercase col-span-6 font-bold">
              Total
            </div>
            <div className="px-4 py-2 text-sm border border-black">
              {areaAssess.reduce((acc, curr) => acc + curr.hpm, 0)}
            </div>
            <div className="px-4 py-2 text-sm border border-black">
              {areaAssess.reduce((acc, curr) => acc + curr.ob, 0)}
            </div>
          </div>
        </div>
        {/* pen picture */}
        <div className="part-three">
          <Heading fontSize="base" fontWeight="semibold">
            3. <span className="underline pl-8">Pen picture.</span>
          </Heading>
          <Tiptap
            editable={false}
            viewMenu={false}
            handleChange={() => {}}
            showBorder={false}
            content={`The officer exhibited an excellent attitude during the Ex; his level of
            preparation and organization was good. He was one of the key participants
            during the discussions and he confidently presented his solutions. His
            contributions and participation was educative and beneficial to his fellow
            students within the syndicate, however, he was found wanting in terms of
            employment of cbt sp arms. Etc etc. Give specific examples where a student was
            strong or weak when possible. Pen picture should be detailed and it should
            reflect the marks awarded above. DS may as well include (in the pen picture)
            any other area of concern that is not in the table above.`}
          />
        </div>
        <div className="grid grid-cols-3">
          <p className="text-sm">
            <span className="font-semibold">Rank and Names:</span>{' '}
            {studentInfo?.data.data.user.person.current_rank.name}{' '}
            {studentInfo?.data.data.user.first_name}{' '}
            {studentInfo?.data.data.user.last_name}
          </p>
          <div className="h-12 px-4 col-span-2 flex gap-8">
            <p className="text-sm font-semibold">Signature: </p>
            <img
              src="https://i.stack.imgur.com/eUcfI.gif"
              alt="signature"
              className="block max-w-full max-h-12"
            />
            <p className="text-sm">
              <span className="font-semibold">Date: </span>
              {new Date().toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
