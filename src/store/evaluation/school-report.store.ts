import { useMutation, useQuery } from 'react-query';

import { reportService } from '../../services/evaluation/school-report.service';

class SchoolReportStore {
  createSubjective() {
    return useMutation(reportService.createSubjective);
  }
  addTewt() {
    return useMutation(reportService.addTewt);
  }
  editSubjective() {
    return useMutation(reportService.editSubjective);
  }
}
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

export function getStudentInformativeReport(
  studentID: string,
  academicYearPeriodId: string,
  enabled = true,
) {
  return useQuery(
    ['reports/student/term/informative', studentID, academicYearPeriodId],
    () => reportService.getStudentInformativeReport(studentID, academicYearPeriodId),
    { enabled },
  );
}

export function getTewtReport(studentId: string, term: string, enabled = true) {
  return useQuery(
    ['reports/student/term/tewt', studentId, term],
    () => reportService.getTewtReport(studentId, term),
    { enabled },
  );
}

// export function getTewtReport(studentId: string, term: string, enabled = true) {
//   return useQuery(
//     ['reports/student/term/tewt', studentId, term],
//     () => reportService.getTewtReport(studentId, term),
//     { enabled },
//   );
// }}

export function getStudentFullReport(studentId?: string) {
  return useQuery(
    ['reports/full/', studentId],
    () => reportService.getStudentFullReport(studentId + ''),
    { enabled: !!studentId },
  );
}

export function getEvaluationPerformance(evaluationId?: string) {
  return useQuery(
    ['evaluation/performance/', evaluationId],
    () => reportService.getEvaluationPerformance(evaluationId || ''),
    { enabled: !!evaluationId },
  );
}

export function getModuleTermPerformance(moduleId?: string, termId?: string) {
  return useQuery(
    ['evaluation/module-performance/', moduleId],
    () => reportService.getModuleTermPerformance(moduleId || '', termId || ''),
    { enabled: !!moduleId && !!termId },
  );
}

export const reportStore = new SchoolReportStore();
