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

export function getStudentFullReport(studentId?: string) {
  return useQuery(
    ['reports/full/', studentId],
    () => reportService.getStudentFullReport(studentId + ''),
    { enabled: !!studentId },
  );
}
