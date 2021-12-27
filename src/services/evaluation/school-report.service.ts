import { AxiosResponse } from 'axios';

import { evaluationAxios } from '../../plugins/axios';
import { Response } from '../../types';
import { IOverallStudentPerformance } from '../../types/services/report.types';

class SchoolReportService {
  public async getClassTermlyOverallReport(
    classId: string,
    academicYearPeriodId: string,
  ): Promise<AxiosResponse<Response<IOverallStudentPerformance[]>>> {
    return await evaluationAxios.get(
      `/reports/overall-report/class/${classId}/academic-year-period/${academicYearPeriodId}`,
    );
  }
}

export const reportService = new SchoolReportService();