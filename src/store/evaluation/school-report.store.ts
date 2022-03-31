import { useQuery } from 'react-query';

import { reportService } from '../../services/evaluation/school-report.service';

export function getClassTermlyOverallReport(
  classId: string,
  periodId: string,
  enabled = true,
) {
  return useQuery(
    ['reports/overal/class/period', classId, periodId],
    () => reportService.getClassTermlyOverallReport(classId, periodId),
    { enabled },
  );
}

export function getStudentReportInTerm(
  studentID: string,
  academicYearPeriodId: string,
  enabled = true,
) {
  return useQuery(
    ['reports/student/term', studentID, academicYearPeriodId],
    () => reportService.getStudentReportInTerm(studentID, academicYearPeriodId),
    { enabled },
  );
}

export function getStudentFullReport(studentId?: string) {
  return useQuery(
    ['reports/full/', studentId],
    () => reportService.getStudentFullReport(studentId + ''),
    { enabled: !!studentId },
  );
}

export function getEvaluationPerformance(evaluationId: string) {
  return useQuery(['evaluation/performance/', evaluationId], () =>
    reportService.getEvaluationPerformance(evaluationId),
  );
}
