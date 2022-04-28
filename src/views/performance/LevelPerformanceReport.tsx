import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

/* A function that takes in a tableID and a filename and exports the table to excel. */
import Permission from '../../components/Atoms/auth/Permission';
import Button from '../../components/Atoms/custom/Button';
import Icon from '../../components/Atoms/custom/Icon';
import TableHeader from '../../components/Molecules/table/TableHeader';
import academicperiodStore from '../../store/administration/academicperiod.store';
import { getLevelTermlyOverallReport } from '../../store/evaluation/school-report.store';
import { Privileges } from '../../types';
import { EvStudent, IOverallLevelPerformance } from '../../types/services/report.types';
import { calculateGrade, formatPercentage, isFailure } from '../../utils/school-report';
import { exportTableToExcel } from '../../utils/utils';

interface ParamType {
  levelId: string;
}

export default function LevelPerformanceReport() {
  const { levelId } = useParams<ParamType>();
  const history = useHistory();
  const { data: prds } = academicperiodStore.getPeriodsByIntakeLevelId(levelId);

  const [usedStudents, setUsedStudents] = useState<string[]>([]);
  const [studentRpt, setStudentRpt] = useState<
    {
      student: EvStudent;
      reports: IOverallLevelPerformance[] | undefined;
      position: number;
    }[]
  >([]);

  const [labels, setLabels] = useState<
    {
      colSpan: number;
      yearPeriod: string;
      name: string;
      subject: { title: string; total_marks: number }[];
    }[]
  >([]);

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

  const studentReports = (studentId: string) => {
    setUsedStudents([...usedStudents, studentId]);
    const reports = performance?.filter((prd) => prd.student.admin_id == studentId);

    return reports;
  };
  useEffect(() => {
    let terms: string[] = [];
    performance &&
      performance.forEach((prd) => {
        if (!terms.includes(prd.intake_academic_year_period.adminId)) {
          const term = prds?.data.data.find(
            (p) => p.id == prd.intake_academic_year_period.adminId,
          );

          let subjects: { title: string; total_marks: number }[] = [];
          prd.subject_marks.forEach((element) => {
            subjects.push({
              title: element.subject.title,
              total_marks: element.total_marks,
            });
          });
          setLabels((labels) => [
            ...labels,
            {
              colSpan: prd.subject_marks?.length || 0,
              yearPeriod: prd.intake_academic_year_period.adminId || '',
              name: term?.academic_period.name || '',
              subject: subjects,
            },
          ]);
          terms.push(prd.intake_academic_year_period.adminId);
        }

        if (!usedStudents.includes(prd.student.admin_id))
          setStudentRpt((rpt) => [
            ...rpt,
            {
              student: {
                admin_id: prd.student.admin_id,
                reg_number: prd.student.reg_number,
                since_on: prd.student.since_on,
                id: prd.student.id,
              },
              reports: studentReports(prd.student.admin_id),
              position: prd.position,
            },
          ]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performance, prds?.data.data]);

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
      <Button
        styleType={'text'}
        onClick={() => history.goBack()}
        icon
        className="flex items-center p-2 hover:underline">
        <Icon name="chevron-left" fill="primary" size={16} />
        Back
      </Button>
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
      <TableHeader title={'Overall Level Performance'} showBadge={false} />
      <div
        ref={report}
        className="px-10 py-10 bg-white max-w-7xl border border-gray-300 print:border-none overflow-x-auto">
        <table className="border border-gray-700 p-3 w-full" id="download-report">
          <thead className="border border-gray-700 p-3">
            <th colSpan={2} className="border-gray-700 p-3 border">
              Student Particulars
            </th>
            {labels.map((term, i) => {
              return (
                <>
                  {/* {currentterm ? ( */}
                  <th
                    colSpan={term.colSpan + 2}
                    className="border-gray-700 p-3 border border-x-2 uppercase"
                    key={i}>
                    {term.name}
                  </th>
                  {/* ) : null} */}
                  {labels.length - 1 === i && (
                    <th
                      colSpan={4}
                      className="border-gray-700 p-3 border border-r-2 uppercase">
                      G Remarks
                    </th>
                  )}
                </>
              );
            })}
          </thead>
          <thead className="border border-gray-700 p-3 font-bold text-left">
            <tr className="border border-gray-700 p-3">
              <th className="d-vertical border border-gray-700  p-3">Ser</th>
              <th className="d-vertical border border-gray-700  p-3 border-r-2">
                Reg No
              </th>
              {labels.map((subj) =>
                subj.subject.map((evaluation, i) => (
                  <>
                    <th className={`d-vertical w-10 border border-gray-700`}>
                      {evaluation.title} / {evaluation.total_marks}
                    </th>
                    {subj.subject.length - 1 === i ? (
                      <>
                        <th
                          className={`d-vertical w-10 border border-r-2 border-gray-700 bg-zinc-300`}>
                          Total / {subj.subject.reduce((a, b) => a + b.total_marks, 0)}
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
            {studentRpt?.map((stud, i) => (
              <React.Fragment key={i}>
                <tr className="border border-gray-700 p-3">
                  <td className="border-r border-gray-700 p-3">{i + 1}</td>
                  <td className="border-r-2 border-gray-700 p-3">
                    {stud.student.reg_number}
                  </td>
                  {stud.reports?.map((rpt) =>
                    rpt.subject_marks.map((subj, i) => (
                      <>
                        <td
                          className={`p-3 text-sm border border-gray-700 ${
                            isFailure(subj.obtained_marks, subj.total_marks)
                              ? 'text-error-500'
                              : ''
                          }`}>
                          {subj.obtained_marks}
                        </td>
                        {rpt.subject_marks.length - 1 === i ? (
                          <>
                            <td
                              className={`w-10 border border-gray-700 bg-zinc-300 ${
                                isFailure(subj.obtained_marks, subj.total_marks)
                                  ? 'text-error-500'
                                  : ''
                              }`}>
                              {rpt.obtained_marks}
                            </td>
                            <td
                              className={`w-10 border border-gray-700 border-r-2 bg-zinc-300 ${
                                isFailure(subj.obtained_marks, subj.total_marks)
                                  ? 'text-error-500'
                                  : ''
                              }`}>
                              {formatPercentage(rpt.obtained_marks, rpt.total_marks)}
                            </td>
                          </>
                        ) : null}
                      </>
                    )),
                  )}
                  {/* )),s */}
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
