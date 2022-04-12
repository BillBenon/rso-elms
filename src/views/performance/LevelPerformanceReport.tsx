import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

/* A function that takes in a tableID and a filename and exports the table to excel. */
import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { getLevelTermlyOverallReport } from '../../store/evaluation/school-report.store';
import { Privileges } from '../../types';
import { calculateGrade, formatPercentage, isFailure } from '../../utils/school-report';
import { exportTableToExcel } from '../../utils/utils';

interface ParamType {
  levelId: string;
}

export default function LevelPerformanceReport() {
  const { levelId } = useParams<ParamType>();

  const { data: prds } = academicperiodStore.getPeriodsByIntakeLevelId(levelId);

  const prdIds = prds?.data.data.map((prd) => prd.id).join(',');

  const { data: dt } = getLevelTermlyOverallReport(prdIds || '');

  const performance = dt?.data.data;

  const report = useRef(null);
  const [isPrinting, setisPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => report.current,
    bodyClass: 'bg-white',
    documentTitle: `end of level report`,
    onBeforeGetContent: () => setisPrinting(true),
    onAfterPrint: () => setisPrinting(false),
  });

  const gtotalHpm =
    performance
      ?.map((ev) => ev.subject_marks.reduce((a, b) => a + b.total_marks, 0))
      .reduce((a, b) => a + b, 0) || 0;

  const gtotalObt =
    performance
      ?.map((ev) => ev.subject_marks.reduce((a, b) => a + b.obtained_marks, 0))
      .reduce((a, b) => a + b, 0) || 0;

  return (
    <div className="max-w-full">
      <div className="text-right mb-5">
        <Permission privilege={Privileges.CAN_DOWNLOAD_REPORTS}>
          {/* <ReactHTMLTableToExcel
            id="download-report"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"
          /> */}
          <Button
            disabled={isPrinting}
            onClick={() => exportTableToExcel('download-report', 'level-report')}>
            Download report
          </Button>
        </Permission>
      </div>
      <div
        ref={report}
        className="px-10 py-10 bg-white max-w-7xl border border-gray-300 print:border-none overflow-x-auto">
        <table className="border border-gray-700 p-3 w-full" id="download-report">
          <thead className="border border-gray-700 p-3">
            <th colSpan={2} className="border-gray-700 p-3 border">
              Student Particulars
            </th>
            {performance?.map((term, i) => (
              <>
                <th
                  colSpan={term.subject_marks.length + 2}
                  className="border-gray-700 p-3 border border-x-2 uppercase"
                  key={i}>
                  {
                    prds?.data.data.find(
                      (prd) => prd.id == term.intake_academic_year_period.adminId,
                    )?.academic_period.name
                  }
                </th>
                {performance?.length - 1 === i && (
                  <th
                    colSpan={4}
                    className="border-gray-700 p-3 border border-r-2 uppercase">
                    G Remarks
                  </th>
                )}
              </>
            ))}
          </thead>
          <thead className="border border-gray-700 p-3 font-bold text-left">
            <tr className="border border-gray-700 p-3">
              <th className="d-vertical border border-gray-700  p-3">Ser</th>
              <th className="d-vertical border border-gray-700  p-3 border-r-2">
                Reg No
              </th>
              {performance?.map((subj) =>
                subj.subject_marks.map((evaluation, i) => (
                  <>
                    <th className={`d-vertical w-10 border border-gray-700`}>
                      {evaluation.subject.title} / {evaluation.total_marks}
                    </th>
                    {subj.subject_marks.length - 1 === i ? (
                      <>
                        <th
                          className={`d-vertical w-10 border border-r-2 border-gray-700 bg-zinc-300`}>
                          Total /{' '}
                          {subj.subject_marks.reduce((a, b) => a + b.total_marks, 0)}
                        </th>
                        <th
                          className={`d-vertical w-10 border border-gray-700 border-r-2 bg-zinc-300`}>
                          Total / 100
                        </th>
                      </>
                    ) : null}
                  </>
                )),
              )}
              <th className={`d-vertical w-10 border border-gray-700 bg-zinc-300`}>
                General Total / {gtotalHpm}
              </th>
              <th className={`d-vertical w-10 border border-gray-700 bg-zinc-300`}>
                Percentage %
              </th>
              <th className={`d-vertical w-10 border border-gray-700`}>Grade</th>
              <th
                className={`d-vertical w-10 border border-gray-700 border-r-2 bg-zinc-300`}>
                Position
              </th>
            </tr>
          </thead>
          <tbody className="border border-gray-700 p-3">
            {performance?.map((stud, i) => (
              <React.Fragment key={stud.id}>
                <tr className="border border-gray-700 p-3">
                  <td className="border-r border-gray-700 p-3">{i + 1}</td>
                  <td className="border-r-2 border-gray-700 p-3">
                    {stud.student.reg_number}
                  </td>
                  {performance?.map((term) =>
                    term.subject_marks.map((evaluation, i) => (
                      <>
                        <td
                          className={`p-3 text-sm border border-gray-700 ${
                            isFailure(evaluation.obtained_marks, evaluation.total_marks)
                              ? 'text-error-500'
                              : ''
                          }`}>
                          {evaluation.obtained_marks}
                        </td>
                        {term.subject_marks.length - 1 === i ? (
                          <>
                            <td className={`w-10 border border-gray-700 bg-zinc-300`}>
                              {term.subject_marks.reduce((a, b) => a + b.total_marks, 0)}
                            </td>
                            <td
                              className={`w-10 border border-gray-700 border-r-2 bg-zinc-300`}>
                              {formatPercentage(
                                term.subject_marks.reduce((a, b) => a + b.total_marks, 0),
                                term.subject_marks.reduce((a, b) => a + b.total_marks, 0),
                              )}
                            </td>
                          </>
                        ) : null}
                      </>
                    )),
                  )}
                  <td
                    className={`w-10 border-r border-gray-700 bg-zinc-300 ${
                      isFailure(gtotalObt, gtotalHpm) ? 'text-error-500' : ''
                    }`}>
                    {gtotalObt}
                  </td>
                  <td
                    className={`w-10 border-r border-gray-700 bg-zinc-300 ${
                      isFailure(gtotalObt, gtotalHpm) ? 'text-error-500' : ''
                    }`}>
                    {formatPercentage(gtotalObt, gtotalHpm)}
                  </td>
                  <td className={`w-10 border border-gray-700`}>
                    {calculateGrade(gtotalObt, gtotalHpm)}
                  </td>
                  <td className={`w-10 border border-gray-700 border-r-2 bg-zinc-300`}>
                    {stud.position}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
